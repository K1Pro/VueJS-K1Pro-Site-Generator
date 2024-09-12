<template>
  <div
    class="contact-us"
    :style="[
      {
        borderWidth: elIndex == 0 ? '3px 3px 3px 3px' : '0px 3px 3px 3px',
        borderStyle: 'dashed',
      },
      style.outline.borderColor,
    ]"
  >
    <div class="contact-us-container">
      <h2>Contact Us</h2>
      <input type="text" class="cntctInpts" placeholder="Name" />
      <input type="text" class="cntctInpts" placeholder="Email" />
      <textarea rows="3" class="cntctInpts" placeholder="Message" style="border-width: 1px"></textarea>
      <img :src="endPts.captchaURL + msgDate + '.jpg'" />
      <input type="text" class="cntctInpts" style="width: calc(100% - 30px)" placeholder="Verify captcha..." />
      <button style="width: 30px; height: 30px">
        <i class="fa-solid fa-arrows-rotate"></i>
      </button>
      <button style="margin-bottom: 10px">
        <span>Send</span>
      </button>
      <div style="margin-bottom: 25px; padding: 0px" class="validation-message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact Us',

  inject: ['endPts', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      msgDate: server_datetime_YmdHis,
    };
  },

  mounted() {
    console.log(this.elKey);
    console.log(this.elValue);
    console.log(this.elIndex);
  },
};
</script>

<style>
.contact-us {
  position: relative;
}
.contact-us-container {
  width: 300px;
  margin-left: calc(50% - 150px);
}
.contact-us-container input[type='text'],
.contact-us-container textarea {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  resize: vertical;
}
.contact-us-container button {
  padding: 5px;
  width: 100%;
}
.contact-us-container img {
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
  .contact-us-container img {
    height: 4.5vw;
  }
}
</style>
