<template>
  <div class="contact-us" :style="[contactUs, style.outline.borderColor, { marginBottom: cntctUsCaptchaMrgn + 'vh' }]">
    <div class="contact-us-form" :style="[contactUsForm]">
      <input type="text" class="cntctInpts" placeholder="Name" />
      <input type="text" class="cntctInpts" placeholder="Email" />
      <textarea rows="3" class="cntctInpts" :placeholder="!footKey ? elValue.messageText : 'Message'"></textarea>
      <img :src="endPts.captchaURL + msgDate + '.jpg'" ref="cntctUsCaptcha" />
      <input type="text" class="cntctInpts" style="width: calc(100% - 30px)" placeholder="Verify captcha..." />
      <button style="width: 30px; height: 4vh">
        <i class="fa-solid fa-arrows-rotate"></i>
      </button>
      <button style="margin-bottom: 1vh; height: 4vh">
        <span>{{ !footKey ? elValue.buttonText : 'Send' }}</span>
      </button>
      <div style="height: 3vh"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact Us',

  inject: ['grid', 'endPts', 'style'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],

  computed: {
    contactUs() {
      return {
        outlineStyle: !this.footKey ? 'dashed' : 'none',
      };
    },
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
      msgDate: server_datetime_YmdHis,
      cntctUsCaptchaMrgn: 0,
    };
  },
  watch: {
    'grid.wdth'() {
      this.cntctUsCaptchaMrgn = 5 - (this.$refs.cntctUsCaptcha.getBoundingClientRect().height / this.grid.hght) * 100;
    },
  },
};
</script>

<style>
.contact-us {
  position: relative;
  outline-width: 2px;
  outline-offset: -2px;
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
  /* padding: 1vh; */
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

@media only screen and (min-width: 650px) {
  .contact-us-form img {
    height: 4.5vw;
  }
}
</style>
