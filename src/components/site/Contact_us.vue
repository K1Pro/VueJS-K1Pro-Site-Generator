<template>
  <div class="contact-us">
    <div class="contact-us-form" :style="[contactUsForm]">
      <h2 v-if="!elKey" :style="[h2]">Contact Us</h2>
      <input
        type="text"
        name="Name"
        :class="'cntctInpts_' + elKey"
        placeholder="Name"
        v-model="msgName"
        @keyup="removeInvalidContactUsFn"
      />

      <input
        type="text"
        name="Email"
        :class="'cntctInpts_' + elKey"
        placeholder="Email"
        v-model="msgEmail"
        @keyup="removeInvalidContactUsFn"
      />

      <textarea
        rows="3"
        name="Message"
        :class="'cntctInpts_' + elKey"
        :placeholder="elKey ? elValue.messageText : 'Message'"
        v-model="msgMessage"
        @keyup="removeInvalidContactUsFn"
      ></textarea>

      <img :src="endPts.captchaURL + msgDate + '.jpg'" :style="{ opacity: 1 }" />

      <input
        type="text"
        name="Captcha"
        :class="[
          'cntctInpts_' + elKey,
          {
            invalid: msg_captcha == 'Refresh captcha' || msg_captcha == 'Incorrect captcha',
          },
        ]"
        style="width: calc(100% - 30px)"
        placeholder="Verify captcha..."
        v-model="msgCaptcha"
        @keyup="removeInvalidContactUsFn"
      />

      <button style="width: 30px; height: 4vh" @click="updateCaptcha">
        <i :class="{ spin: spinUpdateCaptcha }" class="fa-solid fa-arrows-rotate"></i>
      </button>

      <button style="margin-bottom: 1vh; height: 4vh" @click.prevent="postMsg">
        <i v-if="spinContactUsSend" class="spin fa-sharp fa-solid fa-circle-notch"></i>
        <span v-else>{{ elKey ? elValue.buttonText : 'Send' }}</span>
      </button>

      <div
        :style="{
          'margin-bottom': msg_captcha ? '0vh' : '2.5vh',
          padding: msg_captcha ? '0.5vh' : '0vh',
        }"
        class="validation-message"
      >
        {{ msg_captcha ? msg_captcha : '' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact Us',

  inject: ['showMsg', 'site', 'endPts'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    contactUsForm() {
      return {
        width: this.elKey ? '300px' : false,
        marginLeft: this.elKey ? 'calc(50% - 150px)' : false,
        padding: this.elKey ? '1.5vh' : false,
      };
    },
    h2() {
      return {
        backgroundColor: this.elKey ? 'white' : '#00000000',
        padding: this.elKey ? '0.5vh' : false,
        margin: this.elKey ? '0vh 0vh 2vh 0vh' : false,
        fontSize: this.elKey ? '3vh' : false,
      };
    },
  },

  data() {
    return {
      msgName: '',
      msgEmail: '',
      msgMessage: '',
      msgCaptcha: '',
      msgDate: server_datetime_YmdHis,
      spinContactUsSend: false,
      spinUpdateCaptcha: false,
      msg_captcha: '',
    };
  },

  methods: {
    async postMsg() {
      if (this.msgName != '' && this.msgEmail != '' && this.msgMessage != '' && this.msgCaptcha != '') {
        this.spinContactUsSend = true;
        try {
          const response = await fetch(this.endPts.siteURL + this.endPts.messages, {
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
              Referer: add_auth,
            }),
          });
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
          this.showMsg(postMsgResJSON.messages[0]);
          this.msg_captcha = postMsgResJSON.messages[0];
          this.spinContactUsSend = false;
        } catch (error) {
          console.log(error.toString());
          this.showMsg(error.toString());
          this.msg_captcha = error.toString();
          this.spinContactUsSend = false;
        }
      } else {
        let firstEl = 0;
        for (let cntctInpt of document.getElementsByClassName('cntctInpts_' + this.elKey)) {
          cntctInpt.classList.remove('invalid');
          if (cntctInpt.value == '') {
            if (firstEl == 0) {
              this.showMsg(cntctInpt.name + ' cannot be blank');
              this.msg_captcha = cntctInpt.name + ' cannot be blank';
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
      // if (event.target.name == 'Captcha') {
      //   this.msg_captcha = '';
      // }
    },

    async updateCaptcha() {
      this.spinUpdateCaptcha = true;
      try {
        const response = await fetch(time_url, {
          method: 'GET',
        });
        const getServerTimeJSON = await response.json();
        this.msgDate = getServerTimeJSON.data.server_Time_YmdHis;
        this.spinUpdateCaptcha = false;
      } catch (error) {
        console.log(error.toString());
        this.showMsg('Captcha error - refresh page');
        this.spinUpdateCaptcha = false;
      }
    },
  },
};
</script>

<style>
.contact-us {
  position: relative;
}
.contact-us-form {
  backdrop-filter: blur(20px);
}
.contact-us-form textarea {
  height: 8vh;
}
.contact-us-form input[type='text'] {
  height: 4vh;
}
.contact-us-form input[type='text'],
.contact-us-form textarea {
  width: 100%;
  padding: 0.5vh;
  margin-bottom: 1.5vh;
  resize: none;
  font-size: 2vh;
  font-family: Arial, Helvetica, sans-serif;
}
.contact-us-form button {
  /* padding: 5px; */
  width: 100%;
}
.contact-us-form img {
  max-height: 5vh;
  min-height: 3vh;
  height: 15vw;
  width: 100%;
  margin: 0px;
  padding: 0px;
  object-fit: cover;
  border-width: 0.1vh 0.1vh 0vh 0.1vh;
  border-style: solid;
  border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  margin-top: -0.5vh;
  margin-bottom: -0.5vh;
}

@media only screen and (min-width: 650px) {
  .contact-us-form img {
    height: 4.5vw;
  }
}
</style>
