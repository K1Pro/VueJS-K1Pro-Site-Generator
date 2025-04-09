<template>
  <div class="subscribe">
    <p><input type="text" placeholder="Full name" ref="fullname" v-model="name" /></p>
    <p><input type="number" placeholder="Phone number" ref="phonenumber" v-model="number" /></p>
    <p><input type="radio" name="agree" ref="subscribeyes" checked /> I agree to receive promotional text messages</p>
    <p><input type="radio" name="agree" ref="subscribeno" /> Remove me from all promotional phone lists</p>

    <div
      :style="{
        width: wndw.wdth > respWidth.md ? '50%' : '100%',
      }"
    >
      <div
        :style="{
          width: wndw.wdth > respWidth.md ? 'calc(25% + 50px)' : '50%',
        }"
      >
        <img :src="endPts.captchaURL + captchaDate + '.jpg'" style="width: 100%" />
        <input
          type="text"
          style="height: 4vh; width: calc(100% - 30px)"
          placeholder="Verify captcha..."
          v-model="captcha"
        />
        <button style="width: 30px; height: 4vh" @click="updateCaptcha">
          <i :class="{ spin: spinUpdateCaptcha }" class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
    <p><input type="submit" v-model="submitText" @click.prevent="subcribeSubmit" /></p>
  </div>
</template>

<script>
export default {
  name: 'Subscribe',

  inject: ['endPts', 'wndw', 'respWidth'],

  data() {
    return {
      name: '',
      number: null,
      submitText: 'Submit',
      captcha: '',
      captchaDate: server_datetime_YmdHis,
      spinUpdateCaptcha: false,
    };
  },

  methods: {
    subcribeSubmit() {
      if (this.name.length < 2) {
        this.$refs.fullname.classList.add('subscribe-red');
        this.submitText = 'Submit';
      } else {
        this.$refs.fullname.classList.remove('subscribe-red');
        this.submitText = 'Submit';
      }
      if (this.$refs.phonenumber.value.length < 3) {
        this.$refs.phonenumber.classList.add('subscribe-red');
        this.submitText = 'Submit';
      } else {
        this.$refs.phonenumber.classList.remove('subscribe-red');
        this.submitText = 'Submit';
      }

      if (this.name.length >= 2 && this.$refs.phonenumber.value.length >= 3 && this.$refs.subscribeyes.checked) {
        this.$refs.subscribeyes.checked = false;
        this.submitText = 'Thank you for subscribing';
        this.name = '';
        this.number = null;
        this.captcha = '';
        this.updateCaptcha();
      }
      if (this.name.length >= 2 && this.$refs.phonenumber.value.length >= 3 && this.$refs.subscribeno.checked) {
        this.$refs.subscribeno.checked = false;
        this.submitText = 'Thank you for unsubscribing';
        this.name = '';
        this.number = null;
        this.captcha = '';
        this.updateCaptcha();
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
.subscribe {
  position: relative;
  padding: 0px 10px;
}
.subscribe img {
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
.subscribe input[type='text'],
.subscribe input[type='number'] {
  height: 4vh;
  width: 350px;
}
.subscribe input[type='submit'] {
  padding: 5px;
}
.subscribe-red {
  outline-color: red;
  outline-style: solid;
}
@media only screen and (min-width: 650px) {
  .subscribe {
    position: relative;
    padding: 0px 10%;
  }
  .subscribe img {
    height: 4.5vw;
  }
}
</style>
