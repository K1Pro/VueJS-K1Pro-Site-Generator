<template>
  <form class="contact" ref="contactForm">
    <div class="contact-form" :style="[contactUsForm]">
      <h2 v-if="!elValue.messageText">Contact</h2>
      <input
        required
        type="text"
        name="Name"
        placeholder="Name"
        v-model="emailBody.name"
        @click="submitBtnTxt = 'Submit'"
        @invalid="$event.target.classList.add('invalid')"
        @input="emailBody.name ? $event.target.classList.remove('invalid') : false"
      />

      <input
        required
        type="text"
        name="Email"
        placeholder="Email"
        v-model="emailBody.email"
        @click="submitBtnTxt = 'Submit'"
        @invalid="$event.target.classList.add('invalid')"
        @input="emailBody.email ? $event.target.classList.remove('invalid') : false"
      />

      <textarea
        required
        rows="3"
        name="Message"
        :placeholder="elValue.messageText ? elValue.messageText : 'Message'"
        v-model="emailBody.message"
        @click="submitBtnTxt = 'Submit'"
        @invalid="$event.target.classList.add('invalid')"
        @input="emailBody.message ? $event.target.classList.remove('invalid') : false"
      ></textarea>

      <div class="contact-captcha-container">
        <div class="contact-captcha-inputs">
          <img class="contact-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" />
          <input
            required
            type="text"
            placeholder="Verify captcha"
            style="height: 4vh; width: calc(100% - 30px)"
            v-model="captcha"
            @invalid="$event.target.classList.add('invalid')"
            @input="captcha ? $event.target.classList.remove('invalid') : false"
            @click="submitBtnTxt = 'Submit'"
          />
          <button
            class="contact-captcha-btn"
            @click.prevent="
              updateCaptcha();
              submitBtnTxt = 'Submit';
            "
          >
            <i :class="{ spin: captchaSpin }" class="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
      </div>

      <button type="submit" style="margin-bottom: 1vh; height: 4vh" @click.prevent="sendEmail">
        <i v-if="submitting" class="spin fa-sharp fa-solid fa-circle-notch"></i>
        <span v-else>{{ !footKey ? elValue.buttonText : 'Send' }}</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Contact Us',

  inject: ['emailReq', 'endPts'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],

  computed: {
    contactUsForm() {
      return {
        width: !this.footKey ? '300px' : false,
        marginLeft: !this.footKey ? 'calc(50% - 150px)' : false,
        padding: !this.footKey ? '1.5vh' : false,
      };
    },
  },

  data() {
    return {
      captcha: '',
      captchaDate: server_datetime_YmdHis,
      captchaSpin: false,
      submitting: false,
      submitBtnTxt: 'Submit',
      emailBody: {
        type: 'Contact',
        name: '',
        email: '',
        message: '',
      },
    };
  },

  methods: {
    async sendEmail() {
      this.submitBtnTxt = 'Submit';
      if (this.$refs.contactForm.checkValidity()) {
        this.submitting = true;
        this.emailReq('POST', this.captchaDate, this.captcha, this.emailBody).then((resJSON) => {
          if (resJSON.success) {
            Object.assign(this.$data, this.$options.data.apply(this));
            this.submitBtnTxt = 'Submitted';
            this.updateCaptcha();
          } else {
            this.submitting = false;
          }
        });
      }
    },

    async updateCaptcha() {
      this.captchaSpin = true;
      try {
        const response = await fetch(api_path.time);
        const resJSON = await response.json();
        this.captchaDate = resJSON.data.server_Time_YmdHis;
        this.captchaSpin = false;
      } catch (error) {
        console.log(error.toString());
        this.captchaSpin = false;
      }
    },
  },
};
</script>

<style>
.contact {
  position: relative;
}
.contact-form {
  backdrop-filter: blur(20px);
}
.contact-form textarea {
  height: 8vh;
}
.contact-form input[type='text'] {
  height: 4vh;
}
.contact-form input[type='text'],
.contact-form textarea {
  width: 100%;
  padding: 0.5vh;
  margin-bottom: 1.5vh;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
}
.contact-form button[type='submit'] {
  width: 100%;
}
.contact-captcha-container {
  width: 100%;
}
.contact-captcha-inputs {
  width: 100%;
}
.contact-captcha-img {
  width: 100%;
  max-height: 5vh;
  min-height: 3vh;
  height: 15vw;
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
.contact-captcha-btn {
  width: 30px;
  height: 4vh;
}
@media only screen and (min-width: 650px) {
  .contact-captcha-img {
    height: 4.5vw;
  }
}
</style>
