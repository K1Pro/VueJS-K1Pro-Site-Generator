<template>
  <form class="subscribe" ref="subscribeForm">
    <template v-if="elValue.inputs.includes('nameInput')">
      <input
        required
        type="text"
        placeholder="Full name"
        v-model="emailBody.name"
        @click="submitBtnTxt = 'Submit'"
        @invalid="$event.target.classList.add('invalid')"
        @input="emailBody.name ? $event.target.classList.remove('invalid') : false"
      />
      <br />
      <br />
    </template>

    <template v-if="elValue.inputs.includes('phoneInput')">
      <input
        type="number"
        placeholder="Phone number"
        v-model.number="emailBody.phone"
        @invalid="$event.target.classList.add('invalid')"
        @input="emailBody.phone ? $event.target.classList.remove('invalid') : false"
      />
      <br />
      <br />
    </template>

    <template v-if="elValue.inputs.includes('emailInput')">
      <input
        type="email"
        placeholder="Email"
        v-model="emailBody.email"
        @invalid="$event.target.classList.add('invalid')"
        @input="emailBody.email ? $event.target.classList.remove('invalid') : false"
      />
      <br />
      <br />
    </template>

    <template v-if="elValue.inputs.includes('faxInput')">
      <input
        type="number"
        placeholder="Fax"
        v-model="emailBody.fax"
        @invalid="$event.target.classList.add('invalid')"
        @input="emailBody.fax ? $event.target.classList.remove('invalid') : false"
      />
      <br />
      <br />
    </template>

    <template v-if="elValue.inputs.includes('phoneCheck')">
      <input type="checkbox" v-model="emailBody.textSubscribe" /> I agree to receive text messages
      <br />
      <br />
    </template>

    <template v-if="elValue.inputs.includes('emailCheck')">
      <input type="checkbox" v-model="emailBody.emailSubscribe" /> I agree to receive email messages
      <br />
      <br />
    </template>

    <template v-if="elValue.inputs.includes('faxCheck')">
      <input type="checkbox" v-model="emailBody.faxSubscribe" /> I agree to receive fax messages
      <br />
      <br />
    </template>

    <div class="subscribe-captcha-container">
      <div class="subscribe-captcha-inputs">
        <img class="subscribe-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" />
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
          class="subscribe-captcha-btn"
          @click.prevent="
            updateCaptcha();
            submitBtnTxt = 'Submit';
          "
        >
          <i :class="{ spin: captchaSpin }" class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
    <br />

    <button type="submit" @click.prevent="sendEmail" :disabled="submitBtnTxt == 'Subscription updated'">
      <i v-if="submitting" class="spin fa-solid fa-arrows-rotate"></i>
      <template v-else>{{ submitBtnTxt }}</template>
    </button>
  </form>
</template>

<script>
export default {
  name: 'Subscribe',

  inject: ['emailReq', 'endPts', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      captcha: '',
      captchaDate: server_datetime_YmdHis,
      captchaSpin: false,
      submitting: false,
      submitBtnTxt: 'Submit',
      emailBody: {
        type: 'Subscribe',
        name: '',
        phone: '',
        email: '',
        fax: '',
        textSubscribe: false,
        emailSubscribe: false,
        faxSubscribe: false,
      },
    };
  },

  methods: {
    async sendEmail() {
      this.submitBtnTxt = 'Submit';
      if (this.$refs.subscribeForm.checkValidity()) {
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

  watch: {
    'emailBody.phone'(newPhone, oldPhone) {
      console.log(newPhone);
      console.log(oldPhone);
      // this.emailBody.phone = newPhone.replaceAll('-', ' ');
    },
  },

  created() {
    if (!this.site.htmlElmnts[this.elKey].inputs) this.site.htmlElmnts[this.elKey].inputs = [];
  },
};
</script>

<style>
.subscribe {
  position: relative;
  padding: 0px 10px;
}
.subscribe input[type='text'],
.subscribe input[type='number'],
.subscribe input[type='email'] {
  height: 4vh;
  width: 100%;
}
.subscribe button[type='submit'] {
  padding: 5px;
  width: 20%;
}
.subscribe-captcha-container {
  width: 100%;
}
.subscribe-captcha-inputs {
  width: 50%;
}
.subscribe-captcha-img {
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
.subscribe-captcha-btn {
  width: 30px;
  height: 4vh;
}
@media only screen and (min-width: 650px) {
  .subscribe {
    padding: 0px calc(10% + 10px);
  }
  .subscribe input[type='text'],
  .subscribe input[type='number'],
  .subscribe input[type='email'] {
    width: 50%;
  }
  .subscribe-captcha-img {
    height: 4.5vw;
  }
  .subscribe-captcha-inputs {
    width: calc(25% + 50px);
  }
}
</style>
