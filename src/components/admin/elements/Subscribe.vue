<template>
  <form class="subscribe" ref="subscribeForm">
    <input type="checkbox" value="nameInput" @change="changeInput" />
    | <input type="text" placeholder="Full name" />
    <br />
    <br />

    <input type="checkbox" value="phoneInput" @change="changeInput" />
    | <input type="number" placeholder="Phone number" />
    <br />
    <br />

    <input type="checkbox" value="emailInput" @change="changeInput" />
    | <input type="email" placeholder="Email" />
    <br />
    <br />

    <input type="checkbox" value="faxInput" @change="changeInput" />
    | <input type="number" placeholder="Fax" />
    <br />
    <br />

    <input type="checkbox" value="phoneCheck" @change="changeInput" />
    | <input type="checkbox" /> I agree to receive text messages
    <br />
    <br />

    <input type="checkbox" value="emailCheck" @change="changeInput" />
    | <input type="checkbox" /> I agree to receive email messages
    <br />
    <br />

    <input type="checkbox" value="faxCheck" @change="changeInput" />
    | <input type="checkbox" /> I agree to receive fax messages
    <br />
    <br />

    <div class="subscribe-captcha-container">
      <div class="subscribe-captcha-inputs">
        <img class="subscribe-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" />
        <input type="text" placeholder="Verify captcha" style="height: 4vh; width: calc(100% - 30px)" />
        <button class="subscribe-captcha-btn">
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
    <br />

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'Subscribe',

  inject: ['grid', 'endPts', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {
    changeInput(event) {
      if (event.target.checked) {
        this.site.htmlElmnts[this.elKey].inputs.push(event.target.value);
      } else {
        const filteredInputs = this.site.htmlElmnts[this.elKey].inputs.filter((e) => e != event.target.value);
        this.site.htmlElmnts[this.elKey].inputs = filteredInputs;
      }
    },
  },

  data() {
    return {
      captchaDate: server_datetime_YmdHis,
    };
  },
  
  mounted() {
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
