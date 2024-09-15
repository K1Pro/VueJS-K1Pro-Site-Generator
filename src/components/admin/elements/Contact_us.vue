<template>
  <div class="contact-us" :style="[contactUs, style.outline.borderColor]">
    <div class="contact-us-form" :style="[contactUsForm]">
      <h2 v-if="!elKey" :style="[h2]">Contact Us</h2>
      <input type="text" class="cntctInpts" placeholder="Name" />
      <input type="text" class="cntctInpts" placeholder="Email" />
      <textarea rows="3" class="cntctInpts" :placeholder="elKey ? elValue.messageText : 'Message'"></textarea>
      <img :src="endPts.captchaURL + msgDate + '.jpg'" />
      <input type="text" class="cntctInpts" style="width: calc(100% - 30px)" placeholder="Verify captcha..." />
      <button style="width: 30px; height: 4vh">
        <i class="fa-solid fa-arrows-rotate"></i>
      </button>
      <button style="margin-bottom: 1vh; height: 4vh">
        <span>{{ elKey ? elValue.buttonText : 'Send' }}</span>
      </button>
      <div style="margin-bottom: 2.5vh; padding: 0px" class="validation-message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact Us',

  inject: ['endPts', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    contactUs() {
      return {
        borderWidth: this.elIndex == 0 ? '3px 3px 3px 3px' : '0px 3px 3px 3px',
        borderStyle: this.elKey ? 'dashed' : 'none',
      };
    },
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
      msgDate: server_datetime_YmdHis,
    };
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
