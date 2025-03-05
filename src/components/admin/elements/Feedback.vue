<template>
  <div :id="elKey" class="feedback" :style="[style.outline.borderColor]">
    <div
      class="feedback-rate-btns"
      :style="{
        padding: grid.wdth > respWidth.md ? '0px 10%' : '0px 5px',
      }"
    >
      <div class="feedback-rate-btns-title-container">Rate our services:</div>
      <div class="feedback-rate-btns-container">
        <div class="feedback-rate-btn" v-for="(btn, btnIndx) in [1, 0, 2, 0, 3, 0, 4, 0, 5]" style="text-align: center">
          <div v-if="(btnIndx + 1) % 2">{{ btn }}</div>
          <div v-else></div>
        </div>
        <div class="feedback-rate-btn" v-for="btn in 9" style="text-align: center">
          <div v-if="btn % 2"><input type="radio" name="rate" value="button" /></div>
          <div v-else></div>
        </div>
      </div>
    </div>
    <p></p>
    <div
      class="feedback-written-feedback"
      :style="{
        padding: grid.wdth > respWidth.md ? '0px 10%' : '5px',
      }"
    >
      <div class="feedback-written-feedback-title">Give us some feedback:</div>
      <textarea rows="7"></textarea>
    </div>

    <p></p>

    <div
      style="width: 100%"
      :style="{
        padding: grid.wdth > respWidth.md ? '0px calc(10% + 7.5px)' : '10px',
      }"
    >
      <div
        :style="{
          width: grid.wdth > respWidth.md ? 'calc(25% + 50px)' : '50%',
        }"
      >
        <img :src="endPts.captchaURL + msgDate + '.jpg'" ref="cntctUsCaptcha" style="width: 100%" />
        <input type="text" style="height: 4vh; width: calc(100% - 30px)" placeholder="Verify captcha..." />
        <button style="width: 30px; height: 4vh">
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>

    <p></p>

    <div
      class="feedback-submit"
      :style="{
        padding: grid.wdth > respWidth.md ? '0px 10%' : '5px',
      }"
    >
      <button style="padding: 5px">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'feedback',

  inject: ['endPts', 'grid', 'respWidth', 'site', 'slctd', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      msgDate: server_datetime_YmdHis,
    };
  },
};
</script>

<style>
.feedback {
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.feedback img {
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
.feedback-rate-btns-title-container {
  padding-left: 5px;
  font-weight: bold;
}
.feedback-rate-btns-container {
  display: grid;
  grid-template-columns: repeat(4, 5% 18.75%) 5%;
  overflow: visible;
}
.feedback-written-feedback-title {
  padding-left: 5px;
  font-weight: bold;
}
.feedback-written-feedback textarea {
  width: calc(100% - 10px);
  margin-left: 5px;
  resize: none;
}
.feedback-submit {
  margin-left: 5px;
}
@media only screen and (min-width: 650px) {
  .feedback img {
    height: 4.5vw;
  }
}
</style>
