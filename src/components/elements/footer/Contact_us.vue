<template>
  <div class="contact-us">
    <h2 v-if="!loggedIn">Contact Us</h2>
    <div class="footer-contact-container">
      <input
        type="text"
        name="Name"
        class="cntctInpts"
        placeholder="Name"
        :disabled="loggedIn"
        v-model="msgName"
        @keyup="removeInvalidContactUsFn"
      />

      <input
        type="text"
        name="Email"
        class="cntctInpts"
        placeholder="Email"
        :disabled="loggedIn"
        v-model="msgEmail"
        @keyup="removeInvalidContactUsFn"
      />

      <textarea
        rows="3"
        name="Message"
        class="cntctInpts"
        placeholder="Message"
        :disabled="loggedIn"
        v-model="msgMessage"
        @keyup="removeInvalidContactUsFn"
      ></textarea>

      <img :src="endPts.captchaURL + msgDate + '.jpg'" />

      <input
        type="text"
        name="Captcha"
        :disabled="loggedIn"
        :class="{
          invalid:
            msg_captcha == 'Refresh captcha' ||
            msg_captcha == 'Incorrect captcha',
        }"
        class="cntctInpts"
        style="width: calc(100% - 30px)"
        placeholder="Verify captcha..."
        v-model="msgCaptcha"
        @keyup="removeInvalidContactUsFn"
      />

      <button
        style="width: 30px; height: 30px"
        :disabled="loggedIn"
        @click="updateCaptcha"
      >
        <i
          :class="{ spin: spinUpdateCaptcha }"
          class="fa-solid fa-arrows-rotate"
        ></i>
      </button>

      <button :disabled="loggedIn" @click.prevent="postMsg">
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
      msgDate: captcha_time,
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
      console.log(event);
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
.footer-contact-container button {
  padding: 5px;
  width: 100%;
}
.footer-contact-container img {
  max-height: 50px;
  min-height: 30px;
  height: 15vw;
  width: 100%;
  margin: 0px;
  padding: 0px;
  object-fit: cover;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  margin-bottom: -5px;
}

@media only screen and (min-width: 650px) {
  .footer-contact-container img {
    height: 4.5vw;
  }
}
</style>
