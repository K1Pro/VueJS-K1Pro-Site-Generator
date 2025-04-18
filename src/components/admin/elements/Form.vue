<template>
  <div class="forms">
    <select @change="addInput">
      <option disabled selected>Select input type</option>
      <option value="break">Break</option>
      <option value="checkbox">Check boxes</option>
      <option value="color">Color input</option>
      <option value="date">Date input</option>
      <option value="datetime-local">Datetime-local input</option>
      <option value="email">Email input</option>
      <option value="label">Label</option>
      <option value="month">Month input</option>
      <option value="number">Number input</option>
      <option value="group">Radio group</option>
      <option value="radio">Radio inputs</option>
      <option value="range">Range input</option>
      <option value="select">Select input</option>
      <option value="tel">Telephone input</option>
      <option value="text">Text input</option>
      <option value="time">Time input</option>
      <option value="url">Url input</option>
      <option value="week">Week input</option>
    </select>
    <br />
    <br />

    <template v-for="(input, inputIndx) in elValue.form">
      <input
        v-if="input.type == 'label'"
        style="background: transparent; border: 1px dashed black"
        type="text"
        v-model="input.text"
      />
      <input v-else-if="input.type == 'text'" type="text" v-model="input.placeholder" />
      <select v-else-if="input.type == 'select'"></select>
      <template v-else-if="input.type == 'break'">
        <span style="display: inline-block; width: calc(100% - 30px)"></span>
        <button style="width: 30px; height: 28px" @click="deleteInput(inputIndx)">
          <i class="fa-solid fa-trash"></i>
        </button>
        <br />
      </template>
      <template v-else-if="input.type == 'group'">Radio group</template>
      <span
        v-else-if="input.type == 'radio' || input.type == 'checkbox'"
        style="display: inline-block; width: calc(100% - 30px)"
      >
        <template v-for="(subInput, subInputIndx) in input.subInputs">
          <input :type="input.type" />
          <input
            style="background: transparent; border: 1px dashed black; width: 50px"
            type="text"
            v-model="subInput.label"
          />
          <button style="width: 30px; height: 28px" @click="addSubInput(inputIndx)">
            <i class="fa-solid fa-circle-plus"></i>
          </button>
          <button style="width: 30px; height: 28px" @click="deleteSubInput(inputIndx, subInputIndx)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </template>
      </span>
      <input v-else :type="input.type" />
      <button v-if="input.type != 'break'" style="width: 30px; height: 28px" @click="deleteInput(inputIndx)">
        <i class="fa-solid fa-trash"></i>
      </button>
      <br v-if="input.type != 'break'" />
    </template>

    <div class="forms-captcha-container">
      <div class="forms-captcha-inputs">
        <img class="forms-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" />
        <input type="text" placeholder="Verify captcha" style="height: 4vh; width: calc(100% - 30px)" />
        <button class="forms-captcha-btn">
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
    <br />

    <button type="submit">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'Form',

  inject: ['grid', 'endPts', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      captchaDate: server_datetime_YmdHis,
    };
  },
  methods: {
    addInput(event) {
      console.log(event.target.value);
      this.site.htmlElmnts[this.elKey].form.push({ type: event.target.value });
      if (event.target.value == 'checkbox' || event.target.value == 'radio') {
        this.site.htmlElmnts[this.elKey].form[this.site.htmlElmnts[this.elKey].form.length - 1].subInputs = [
          { label: '' },
        ];
      }
      setTimeout(() => {
        event.srcElement.selectedIndex = 0;
      }, 500);
    },
    deleteInput(inputIndx) {
      this.site.htmlElmnts[this.elKey].form.splice(inputIndx, 1);
    },
    addSubInput(inputIndx) {
      this.site.htmlElmnts[this.elKey].form[inputIndx].subInputs.push({ label: '' });
    },
    deleteSubInput(inputIndx, subInputIndx) {
      this.site.htmlElmnts[this.elKey].form[inputIndx].subInputs.splice(subInputIndx, 1);
    },
  },

  mounted() {
    if (!this.site.htmlElmnts[this.elKey].form) this.site.htmlElmnts[this.elKey].form = [];
  },
};
</script>

<style>
.forms {
  position: relative;
  padding: 0px 10px;
}
.forms-captcha-container {
  width: 100%;
}
.forms-captcha-inputs {
  width: 50%;
}
.forms-captcha-img {
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
  /* margin-top: -0.5vh; */
  margin-bottom: -0.5vh;
}
.forms-captcha-btn {
  width: 30px;
  height: 4vh;
}
/* .forms input[type='text'] {
  color: grey;
} */
.forms input:not([type='checkbox']):not([type='radio']) {
  padding: 5px;
  width: calc(100% - 30px);
  height: 28px;
}
.forms select {
  padding: 5px;
}
.forms button[type='submit'] {
  padding: 5px;
}
@media only screen and (min-width: 650px) {
  .forms {
    padding: 0px calc(10% + 10px);
  }
  .forms-captcha-img {
    height: 4.5vw;
  }
  .forms-captcha-inputs {
    width: calc(25% + 50px);
  }
}
</style>
