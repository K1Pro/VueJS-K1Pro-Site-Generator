<template>
  <div class="contact-us">
    <h2>Contact Us</h2>
    <div class="footer-contact-container">
      <input type="text" class="cntctInpts" placeholder="Name" disabled />
      <input type="text" class="cntctInpts" placeholder="Email" disabled />
      <textarea rows="3" class="cntctInpts" placeholder="Message" style="border-width: 1px" disabled></textarea>
      <img :src="endPts.captchaURL + msgDate + '.jpg'" :style="{ opacity: 0.5 }" />
      <input type="text" class="cntctInpts" style="width: calc(100% - 30px)" placeholder="Verify captcha..." disabled />
      <button style="width: 30px; height: 30px" disabled>
        <i class="fa-solid fa-arrows-rotate"></i>
      </button>
      <button style="margin-bottom: 10px" disabled>
        <span>Send</span>
      </button>
      <div style="margin-bottom: 25px; padding: 0px" class="validation-message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact Us',

  inject: ['endPts'],

  data() {
    return {
      msgDate: server_datetime_YmdHis,
    };
  },
};
</script>

<style>
.footer-contact-container input[type='text'],
.footer-contact-container textarea {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  resize: vertical;
}
.footer-contact-container button {
  padding: 5px;
  width: 100%;
}
.footer-contact-container img {
  max-height: 50px;
  min-height: 30px;
  height: 15vw;
  width: 100%;
  margin: 0px;
  padding: 0px;
  object-fit: cover;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  margin-top: -5px;
  margin-bottom: -5px;
}

@media only screen and (min-width: 650px) {
  .footer-contact-container img {
    height: 4.5vw;
  }
}
</style>
