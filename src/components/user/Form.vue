<template>
  <form class="forms" ref="formsForm">
    <template v-for="(input, inputIndx) in elValue.form">
      <div
        style="display: grid; grid-gap: 5px"
        :style="{
          gridTemplateColumns:
            'repeat(' +
            input.length +
            ', calc(' +
            100 / input.length +
            '% - ' +
            (5 * (input.length - 1)) / input.length +
            'px))',
        }"
      >
        <template
          v-for="(subInput, subInputIndx) in input"
          v-if="!input[0].child || (input[0].child && conditionals.includes(input[0].child))"
        >
          <label v-if="subInput.type == 'label'" style="margin: 5px 0px">{{ subInput.label }}</label>
          <br v-else-if="subInput.type == 'break'" />
          <hr v-else-if="subInput.type == 'horizontal_rule'" style="width: 100%" />
          <span
            v-else-if="subInput.type == 'checkbox'"
            style="margin: 5px 0px; white-space: nowrap; overflow: hidden; text-overflow: clip"
          >
            <!-- finished 7/10 check if checkbox input name needs to be the same as radio input name -->
            <input
              title="test"
              style="width: 13px; margin: 3px 3px 3px 4px"
              :id="'input_' + inputIndx + '_' + subInputIndx"
              :type="subInput.type"
              :name="subInput.name"
              :required="subInput.required"
              :checked="subInput.checked"
              v-model="subInput.value"
              @change="subInput.parent ? conditional($event.target.checked, subInput.parent) : false"
            />
            <label
              :for="'input_' + inputIndx + '_' + subInputIndx"
              @change="subInput.parent ? conditional($event.target.checked, subInput.parent) : false"
              >{{ subInput.label }}</label
            >
          </span>
          <span
            v-else-if="subInput.type == 'radio'"
            style="margin: 5px 0px; white-space: nowrap; overflow: hidden; text-overflow: clip"
          >
            <input
              style="width: 13px; margin: 3px 3px 3px 4px"
              :id="'input_' + inputIndx + '_' + subInputIndx"
              :type="subInput.type"
              :name="subInput.name"
              :required="subInput.required"
              :checked="subInput.checked"
              v-model="subInput.value"
              @change="subInput.parent ? conditional($event.target.checked, subInput.parent) : false"
            />
            <label
              :for="'input_' + inputIndx + '_' + subInputIndx"
              @change="subInput.parent ? conditional($event.target.checked, subInput.parent) : false"
              >{{ subInput.label }}</label
            >
          </span>
          <textarea
            v-else-if="subInput.type == 'textarea'"
            style="margin: 5px 0px; resize: none"
            :rows="subInput.rowsPlaceholder ? subInput.rowsPlaceholder.split('|')[0] : 3"
            :placeholder="subInput.rowsPlaceholder ? subInput.rowsPlaceholder.split('|')[1] : 'Enter text here'"
          ></textarea>
          <span v-else-if="subInput.type == 'row_increaser'" style="margin: 5px 0px">
            <button
              style="width: 30px; height: 28px"
              @click.prevent="rowIncrease(inputIndx, subInputIndx, subInput.id)"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            <button
              style="width: 30px; height: 28px"
              :disabled="subInput.count === 1"
              @click.prevent="rowDecrease(inputIndx, subInputIndx, subInput.id)"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <label>{{ subInput.label }}</label>
          </span>
          <input
            v-else
            :type="subInput.type"
            :name="subInput.name"
            :placeholder="subInput.placeholder"
            :required="subInput.required"
            :min="subInput.min"
            :max="subInput.max"
            :step="subInput.step"
            :pattern="subInput.pattern"
            style="margin: 5px 0px"
            v-model="subInput.value"
          />
        </template>
      </div>
    </template>

    <div class="forms-captcha-container">
      <div class="forms-captcha-inputs">
        <img class="forms-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" />
        <input
          required
          type="text"
          placeholder="Verify captcha"
          style="height: 4vh; width: calc(100% - 30px)"
          v-model="captcha"
          @invalid="$event.target.classList.add('invalid')"
          @input="captcha ? $event.target.classList.remove('invalid') : false"
          @click="submitBtnTxt = 'Submit'"
        />
        <button
          class="forms-captcha-btn"
          @click.prevent="
            updateCaptcha();
            submitBtnTxt = 'Submit';
          "
        >
          <i :class="{ spin: captchaSpin }" class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
    <br />

    <button type="submit" @click.prevent="sendEmail" :disabled="submitBtnTxt == 'Subscription updated'">
      <i v-if="submitting" class="spin fa-solid fa-arrows-rotate"></i>
      <template v-else>{{ submitBtnTxt }}</template>
    </button>
  </form>
</template>

<script>
export default {
  name: 'Form',

  inject: ['emailReq', 'endPts', 'site', 'slctd'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      captcha: '',
      captchaDate: server_datetime_YmdHis,
      captchaSpin: false,
      submitting: false,
      submitBtnTxt: 'Submit',
      conditionals: [],
      emailBody: {},
      increasers: {},
    };
  },

  methods: {
    conditional(event, parent) {
      if (event) {
        this.conditionals.push(parent);
      } else {
        const conditionalIndx = this.conditionals.indexOf(parent);
        if (conditionalIndx > -1) this.conditionals.splice(conditionalIndx, 1);
      }
    },
    rowIncrease(inputIndx, subInputIndx, subInputID) {
      this.elValue.form[inputIndx][subInputIndx].count++;
      let tempIncreasers = JSON.parse(JSON.stringify(this.increasers[subInputID]));
      console.log(tempIncreasers);
      tempIncreasers.forEach((row, rowIndx) => {
        tempIncreasers[rowIndx].forEach((col, colIndx) => {
          tempIncreasers[rowIndx][colIndx].count = this.elValue.form[inputIndx][subInputIndx].count;
        });
      });
      this.elValue.form.splice(inputIndx, 0, ...tempIncreasers);
    },
    rowDecrease(inputIndx, subInputIndx, subInputID) {
      this.elValue.form[inputIndx][subInputIndx].count--;
      this.elValue.form.splice(inputIndx - this.increasers[subInputID].length, this.increasers[subInputID].length);
    },
    async sendEmail() {
      this.submitBtnTxt = 'Submit';
      this.elValue.form.forEach((row, rowIndx) => {
        Object.values(row).forEach((inpt, inptIndx) => {
          if (inpt.value && inpt.type) {
            // console.log(inpt);
            const emailBodyKeyCount = inpt.count ? '_' + inpt.count : '';
            if (['checkbox'].includes(inpt.type)) {
              if (this.emailBody[inpt.name]) {
                this.emailBody[inpt.name + emailBodyKeyCount] += inpt.label ? inpt.label + ', ' : inpt.value + ', ';
              } else {
                this.emailBody[inpt.name + emailBodyKeyCount] = inpt.label ? inpt.label + ', ' : inpt.value + ', ';
              }
            } else {
              this.emailBody[inpt.name + emailBodyKeyCount] = inpt.label ? inpt.label : inpt.value;
            }
          }
        });
      });
      console.log();
      if (this.$refs.formsForm.checkValidity()) {
        // this.submitting = true;
        // this.emailReq('POST', this.captchaDate, this.captcha, this.emailBody).then((resJSON) => {
        //   if (resJSON.success) {
        //     Object.assign(this.$data, this.$options.data.apply(this));
        //     this.submitBtnTxt = 'Submitted';
        //     this.updateCaptcha();
        //   } else {
        //     this.submitting = false;
        //   }
        // });
      }
    },
    async updateCaptcha() {
      this.captchaSpin = true;
      try {
        const response = await fetch(api_path.time);
        const resJSON = await response.json();
        this.captchaDate = resJSON.data.server_Time_YmdHis;
        this.captchaSpin = false;
      } catch (error) {
        console.log(error.toString());
        this.captchaSpin = false;
      }
    },
  },
  created() {
    this.elValue.form.forEach((row, rowIndx) => {
      row.forEach((inpt, inptIndx) => {
        if (inpt.type == 'row_increaser') {
          inpt.id = new Date().getTime();
          inpt.count = 1;
          if (!this.increasers[inpt.id]) this.increasers[inpt.id] = [];
          for (let i = inpt.rows; i > 0; i--) {
            this.increasers[inpt.id].push(JSON.parse(JSON.stringify(this.elValue.form[rowIndx - i])));
            for (let x = 0; x < this.elValue.form[rowIndx - i].length; x++) {
              this.elValue.form[rowIndx - i][x].count = 1;
            }
          }
        }
        if (
          !['row_increaser', 'horizontal_rule', 'break', 'label'].includes(this.elValue.form[rowIndx][inptIndx].type)
        ) {
          this.elValue.form[rowIndx][inptIndx].row = rowIndx;
          this.elValue.form[rowIndx][inptIndx].col = inptIndx;
          let htmlInpt = this.elValue.form[rowIndx][inptIndx];
          this.elValue.form[rowIndx][inptIndx].name = htmlInpt.name
            ? htmlInpt.name.replaceAll(' ', '_')
            : htmlInpt.type == 'checkbox'
            ? 'checkbox_group_' + rowIndx
            : htmlInpt.label
            ? htmlInpt.label.replaceAll(' ', '_') + '_' + rowIndx + '_' + inptIndx
            : htmlInpt.placeholder
            ? htmlInpt.placeholder.replaceAll(' ', '_') + '_' + rowIndx + '_' + inptIndx
            : htmlInpt.type.replaceAll(' ', '_') + '_input_' + rowIndx + '_' + inptIndx;
          console.log(this.elValue.form[rowIndx][inptIndx].name);
        }
      });
    });
  },
};
</script>

<style>
.forms {
  position: relative;
  padding: 0px 5px;
}
.forms input:not([type='checkbox']):not([type='radio']) {
  padding: 5px;
  height: 28px;
}
.forms button[type='submit'] {
  padding: 5px;
  width: 20%;
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
  margin-top: -0.5vh;
  margin-bottom: -0.5vh;
}
.forms-captcha-btn {
  width: 30px;
  height: 4vh;
}
@media only screen and (min-width: 650px) {
  .forms {
    padding: 0px 10%;
  }
  .forms-captcha-img {
    height: 4.5vw;
  }
  .forms-captcha-inputs {
    width: calc(25% + 50px);
  }
}
</style>
