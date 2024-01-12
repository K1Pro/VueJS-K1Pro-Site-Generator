<template>
  <div class="contact-us">
    <h2>Contact Us</h2>
    <div class="footer-contact-container">
      <input type="text" placeholder="Name" v-model="msgName" />
      <input type="text" placeholder="Email" v-model="msgEmail" />
      <textarea rows="3" placeholder="Message" v-model="msgMessage"></textarea>
      <div class="footer-captcha">
        <img :src="endPts.captchaURL + msgDate + '.jpg'" />
        <button @click="updateCaptcha">
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>
        <input type="text" placeholder="Verify captcha..." v-model="msgCaptcha" />
      </div>
      <button @click="postMsg">Send</button>
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
      spinContactUs: false,
      allInputsError: 'All inputs required',
      contactUsNameErr: 'Name cannot be blank',
      contactUsEmailErr: 'Email cannot be blank',
      contactUsMessageErr: 'Message cannot be blank',
      contactUsCaptchaErr: 'Captcha cannot be blank',
    };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'msg', 'pathname', 'endPts']),
  },

  methods: {
    async postMsg() {
      try {
        const response = await fetch(this.endPts.servrURL + this.endPts.messages, {
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
            Referer: this.pathname,
          }),
        });
        const postMsgResJSON = await response.json();
        if (postMsgResJSON.success) {
        }
        console.log(postMsgResJSON);
        this.msg.snackBar = postMsgResJSON.messages[0];
      } catch (error) {
        console.log(error.toString());
        this.msg.snackBar = error.toString();
      }
    },
    async updateCaptcha() {
      try {
        const response = await fetch(this.endPts.servertimeURL, {
          method: 'GET',
        });
        const getServerTimeJSON = await response.json();
        this.msgDate = getServerTimeJSON.YmdHis;
      } catch (error) {
        console.log(error.toString());
        this.msg.snackBar = 'Captcha error - refresh page';
      }
    },
  },
};
</script>

<style>
.footer-contact-container {
  box-sizing: border-box;
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

.footer-contact-container {
  /* border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px; */
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
