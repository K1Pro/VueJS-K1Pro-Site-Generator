<template>
  <div class="contact" :style="[style.outline.borderColor]">
    <div class="contact-form" :style="[contactUsForm]">
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Email" />
      <textarea rows="3" :placeholder="elValue.messageText"></textarea>
      <div class="contact-captcha-container">
        <div class="contact-captcha-inputs">
          <img class="contact-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" ref="cntctUsCaptcha" />
          <input type="text" style="width: calc(100% - 30px)" placeholder="Verify captcha" />
          <button class="contact-captcha-btn">
            <i class="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
      </div>
      <button type="submit" style="margin-bottom: 1vh; height: 4vh">
        <span>{{ elValue.buttonText }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact Us',

  inject: ['grid', 'endPts', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    contactUsForm() {
      return {};
    },
  },

  data() {
    return {
      captchaDate: server_datetime_YmdHis,
    };
  },
};
</script>

<style>
.contact {
  position: relative;
  outline-width: 2px;
  outline-offset: -2px;
  outline-style: dashed;
}
.contact-form {
  backdrop-filter: blur(20px);
  width: 300px;
  margin-left: calc(50% - 150px);
  padding: 1.5vh;
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
