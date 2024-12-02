<template>
  <div class="contact-us" :style="{ marginBottom: cntctUsCaptchaMrgn + 'vh' }">
    <div class="contact-us-form" :style="[contactUsForm]">
      <h2 v-if="footKey" :style="[h2]">Contact</h2>
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
        :placeholder="!footKey ? elValue.messageText : 'Message'"
        v-model="msgMessage"
        @keyup="removeInvalidContactUsFn"
      ></textarea>

      <img :src="endPts.captchaURL + msgDate + '.jpg'" :style="{ opacity: 1 }" ref="cntctUsCaptcha" />

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
        <span v-else>{{ !footKey ? elValue.buttonText : 'Send' }}</span>
      </button>

      <div :style="{ backgroundColor: msg_captcha ? 'white' : 'transparent' }" class="validation-message">
        {{ msg_captcha ? msg_captcha : '' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact Us',

  inject: ['endPts', 'wndw', 'site'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],

  computed: {
    contactUsForm() {
      return {
        width: !this.footKey ? '300px' : false,
        marginLeft: !this.footKey ? 'calc(50% - 150px)' : false,
        padding: !this.footKey ? '1.5vh' : false,
      };
    },
    h2() {
      return {
        backgroundColor: !this.footKey ? 'white' : '#00000000',
        padding: !this.footKey ? '0.5vh' : false,
        margin: !this.footKey ? '0vh 0vh 2vh 0vh' : false,
        fontSize: !this.footKey ? '3vh' : false,
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
      cntctUsCaptchaMrgn: 0,
    };
  },

  methods: {
    async postMsg() {
      if (this.msgName != '' && this.msgEmail != '' && this.msgMessage != '' && this.msgCaptcha != '') {
        this.spinContactUsSend = true;
        try {
          const response = await fetch(this.endPts.appApiUrl + this.endPts.messages, {
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
          // this.showMsg(postMsgResJSON.messages[0]);
          this.msg_captcha = postMsgResJSON.messages[0];
          this.spinContactUsSend = false;
        } catch (error) {
          console.log(error.toString());
          // this.showMsg(error.toString());
          this.msg_captcha = error.toString();
          this.spinContactUsSend = false;
        }
      } else {
        let firstEl = 0;
        for (let cntctInpt of document.getElementsByClassName('cntctInpts_' + this.elKey)) {
          cntctInpt.classList.remove('invalid');
          if (cntctInpt.value == '') {
            if (firstEl == 0) {
              // this.showMsg(cntctInpt.name + ' cannot be blank');
              this.msg_captcha = cntctInpt.name + ' cannot be blank';
            }
            firstEl++;
            cntctInpt.classList.add('invalid');
          }
        }
      }
    },

    removeInvalidContactUsFn(event) {
      if (event.target.value.length < 1 && event.key != 'Tab' && event.key != 'Shift') {
        event.target.classList.add('invalid');
      } else {
        event.target.classList.remove('invalid');
      }
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
        // this.showMsg('Captcha error - refresh page');
        this.spinUpdateCaptcha = false;
      }
    },
  },
  watch: {
    'wndw.wdth'() {
      this.cntctUsCaptchaMrgn = 5 - (this.$refs.cntctUsCaptcha.getBoundingClientRect().height / this.wndw.hght) * 100;
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
  /* font-size: 2vh; */
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
  outline-width: 0.1vh;
  outline-offset: 0.1vh;
  outline-style: solid;
  outline-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  margin-top: -0.5vh;
  margin-bottom: -0.5vh;
}

/* .validation-message {
  height: 3vh;
  line-height: 3vh;
  font-size: 2vh;
  padding-left: 5px;
} */

@media only screen and (min-width: 650px) {
  .contact-us-form img {
    height: 4.5vw;
  }
}
</style>
