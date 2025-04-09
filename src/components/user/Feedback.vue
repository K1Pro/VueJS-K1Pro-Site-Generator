<template>
  <form class="feedback" ref="feedbackForm">
    <div><b>Give us some feedback:</b></div>
    <textarea
      required
      rows="7"
      placeholder="Feedback"
      v-model="emailBody.feedback"
      @click="submitBtnTxt = 'Submit'"
      @invalid="$event.target.classList.add('invalid')"
      @input="emailBody.feedback ? $event.target.classList.remove('invalid') : false"
    ></textarea>

    <br />
    <br />

    <div><b>Rate:</b> {{ ['Very bad', 'Bad', 'Average', 'Good', 'Very good'][emailBody.rating] }}</div>
    <input type="range" min="0" max="4" step="1" v-model="emailBody.rating" />

    <br />
    <br />

    <div><b>Your name:</b> (optional)</div>
    <input type="text" placeholder="Name" v-model="emailBody.name" @click="submitBtnTxt = 'Submit'" />

    <br />
    <br />

    <div class="feedback-captcha-container">
      <div class="feedback-captcha-inputs">
        <img class="feedback-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" />
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
          class="feedback-captcha-btn"
          @click.prevent="
            updateCaptcha();
            submitBtnTxt = 'Submit';
          "
        >
          <i :class="{ spin: spinUpdateCaptcha }" class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>

    <br />

    <button type="submit" @click.prevent="sendEmail" :disabled="submitBtnTxt == 'Feedback submitted'">
      <i v-if="submitting" class="spin fa-solid fa-arrows-rotate"></i>
      <template v-else>{{ submitBtnTxt }}</template>
    </button>
  </form>
</template>

<script>
export default {
  name: 'Feedback',

  inject: ['endPts', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      captcha: '',
      captchaDate: server_datetime_YmdHis,
      spinUpdateCaptcha: false,
      submitting: false,
      emailBody: {
        type: 'Feedback',
        feedback: '',
        rating: 2,
        name: '',
      },
      submitBtnTxt: 'Submit',
    };
  },

  methods: {
    async sendEmail() {
      this.submitBtnTxt = 'Submit';
      if (this.$refs.feedbackForm.checkValidity()) {
        this.submitting = true;
        try {
          const response = await fetch(this.endPts.email + this.captchaDate + '/' + this.captcha, {
            method: 'POST',
            headers: {
              Authorization: btoa(site.email),
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
            },
            body: JSON.stringify(this.emailBody),
          });
          const resJSON = await response.json();
          if (resJSON.success) {
            this.submitting = false;
            this.captcha = '';
            this.emailBody.name = '';
            this.emailBody.rating = 2;
            this.emailBody.feedback = '';
            this.submitBtnTxt = 'Submitted';
            this.updateCaptcha();
          } else {
            this.submitting = false;
          }
        } catch (error) {
          this.submitting = false;
          console.log(error.toString());
        }
      }
    },

    async updateCaptcha() {
      this.spinUpdateCaptcha = true;
      try {
        const response = await fetch(api_path.time);
        const resJSON = await response.json();
        this.captchaDate = resJSON.data.server_Time_YmdHis;
        this.spinUpdateCaptcha = false;
      } catch (error) {
        console.log(error.toString());
        this.spinUpdateCaptcha = false;
      }
    },
  },
};
</script>

<style>
.feedback {
  position: relative;
  padding: 0px 5px;
}
.feedback textarea {
  font-family: Arial, Helvetica, sans-serif;
  padding: 5px;
  width: 100%;
  resize: none;
}
.feedback input[type='range'],
.feedback-captcha-container {
  width: 100%;
}
.feedback input[type='text'] {
  padding: 5px;
  height: 4vh;
  width: 100%;
}
.feedback button[type='submit'] {
  padding: 5px;
  width: 20%;
}
.feedback-captcha-inputs {
  width: 50%;
}
.feedback-captcha-img {
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
.feedback-captcha-btn {
  width: 30px;
  height: 4vh;
}
@media only screen and (min-width: 650px) {
  .feedback {
    padding: 0px calc(10% + 5px);
  }
  .feedback-captcha-img {
    height: 4.5vw;
  }
  .feedback-captcha-inputs,
  .feedback input[type='text'] {
    width: calc(25% + 50px);
  }
}
</style>
