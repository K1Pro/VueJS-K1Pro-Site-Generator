<template>
  <div
    class="feedback"
    :style="[
      style.outline.borderColor,
      {
        padding: grid.wdth > respWidth.md ? '0px calc(10% + 5px)' : '0px 5px',
      },
    ]"
  >
    <div><b>Give us some feedback:</b></div>
    <textarea rows="7" placeholder="Feedback"></textarea>

    <br />
    <br />

    <div><b>Rate:</b></div>
    <input type="range" min="0" max="4" step="1" value="2" />

    <br />
    <br />

    <div><b>Your name:</b> (optional)</div>
    <input type="text" placeholder="Name" />

    <br />
    <br />

    <div class="feedback-captcha-container">
      <div class="feedback-captcha-inputs">
        <img class="feedback-captcha-img" :src="endPts.captchaURL + msgDate + '.jpg'" />
        <input type="text" style="height: 4vh; width: calc(100% - 30px)" placeholder="Verify captcha" />
        <button class="feedback-captcha-btn">
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>

    <p></p>

    <button type="submit">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'feedback',

  inject: ['endPts', 'grid', 'respWidth', 'style'],

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
  .feedback-captcha-img {
    height: 4.5vw;
  }
  .feedback-captcha-inputs,
  .feedback input[type='text'] {
    width: calc(25% + 50px);
  }
}
</style>
