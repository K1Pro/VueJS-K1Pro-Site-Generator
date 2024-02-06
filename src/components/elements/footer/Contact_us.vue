<template>
  <div class="contact-us">
    <h2 v-if="!loggedIn">Contact Us</h2>
    <div class="footer-contact-container">
      <input
        type="text"
        name="Name"
        class="cntctInpts"
        placeholder="Name"
        v-model="msgName"
        @keyup="removeInvalidContactUsFn"
      />
      <input
        type="text"
        name="Email"
        class="cntctInpts"
        placeholder="Email"
        v-model="msgEmail"
        @keyup="removeInvalidContactUsFn"
      />
      <textarea
        rows="3"
        name="Message"
        class="cntctInpts"
        placeholder="Message"
        v-model="msgMessage"
        @keyup="removeInvalidContactUsFn"
      ></textarea>
      <div class="footer-captcha">
        <img :src="endPts.captchaURL + msgDate + '.jpg'" />
        <button @click="updateCaptcha">
          <i
            :class="{ spin: spinUpdateCaptcha }"
            class="fa-solid fa-arrows-rotate"
          ></i>
        </button>
        <input
          type="text"
          name="Captcha"
          :class="{
            invalid:
              msg_captcha == 'Refresh captcha' ||
              msg_captcha == 'Incorrect captcha',
          }"
          class="cntctInpts"
          placeholder="Verify captcha..."
          v-model="msgCaptcha"
          @keyup="removeInvalidContactUsFn"
        />
      </div>
      <button @click.prevent="postMsg">
        <i
          v-if="spinContactUsSend"
          class="spin fa-sharp fa-solid fa-circle-notch"
        ></i>
        <span v-else>Send</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact Us',

  data() {
    return {
      msgName: '',
      msgEmail: '',
      msgMessage: '',
      msgCaptcha: '',
      msgDate: now,
      spinContactUsSend: false,
      spinUpdateCaptcha: false,
      msg_captcha: '',
    };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'msg',
      'site',
      'endPts',
    ]),
  },

  methods: {
    async postMsg() {
      if (
        this.msgName != '' &&
        this.msgEmail != '' &&
        this.msgMessage != '' &&
        this.msgCaptcha != ''
      ) {
        this.spinContactUsSend = true;
        try {
          const response = await fetch(
            this.endPts.siteURL + this.endPts.messages,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
              },
              body: JSON.stringify({
                Name: this.msgName,
                Email: this.msgEmail,
                Message: this.msgMessage,
                Captcha: this.msgCaptcha,
                Date: this.msgDate,
                Referer: this.site.folderPath,
              }),
            }
          );
          const postMsgResJSON = await response.json();
          if (postMsgResJSON.success) {
            this.msgName = '';
            this.msgEmail = '';
            this.msgMessage = '';
            this.msgCaptcha = '';
            this.msg_captcha = '';
            this.updateCaptcha();
          }
          console.log(postMsgResJSON);
          this.msg.snackBar = postMsgResJSON.messages[0];
          this.msg_captcha = postMsgResJSON.messages[0];
          this.spinContactUsSend = false;
        } catch (error) {
          console.log(error.toString());
          this.msg.snackBar = error.toString();
          this.msg_captcha = error.toString();
          this.spinContactUsSend = false;
        }
      } else {
        let firstEl = 0;
        for (let cntctInpt of document.getElementsByClassName('cntctInpts')) {
          cntctInpt.classList.remove('invalid');
          if (cntctInpt.value == '') {
            if (firstEl == 0) {
              this.msg.snackBar = cntctInpt.name + ' cannot be blank';
            }
            firstEl++;
            cntctInpt.classList.add('invalid');
          }
        }
      }
    },
    removeInvalidContactUsFn(event) {
      if (event.target.value.length < 1) {
        event.target.classList.add('invalid');
      } else {
        event.target.classList.remove('invalid');
      }
      if (event.target.name == 'Captcha') {
        this.msg_captcha = '';
      }
    },
    async updateCaptcha() {
      this.spinUpdateCaptcha = true;
      try {
        const response = await fetch(this.endPts.servertimeURL, {
          method: 'GET',
        });
        const getServerTimeJSON = await response.json();
        this.msgDate = getServerTimeJSON.YmdHis;
        this.spinUpdateCaptcha = false;
      } catch (error) {
        console.log(error.toString());
        this.msg.snackBar = 'Captcha error - refresh page';
        this.spinUpdateCaptcha = false;
      }
    },
  },
};
</script>

<style>
.footer-contact-container {
  box-sizing: border-box;
  /* border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px; */
}

.footer-contact-container button {
  /* background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer; */
  padding: 3px;
  width: 60px;
}

.footer-captcha {
  width: 50%;
  position: relative;
  padding: 0px 1.25px;
}

.footer-captcha img {
  margin: 0px;
  width: 100%;
}

.footer-captcha button {
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
}

.footer-captcha input[type='text'] {
  margin-top: -5px;
}

@media only screen and (min-width: 650px) {
  .footer-captcha {
    width: 75%;
    position: relative;
  }
}
</style>
