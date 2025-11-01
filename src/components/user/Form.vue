<template>
  <form class="forms" ref="formsForm">
    <template v-for="(input, inputIndx) in elValue.form">
      <div
        style="display: grid; grid-gap: 5px"
        :style="{
          gridTemplateColumns:
            'repeat(' +
            (site.htmlElmnts[elKey].responsive && input.length > 1 && wndw.wdth <= respWidth.xs
              ? input.filter((el) => el.type != 'break').length
              : input.length) +
            ', calc(' +
            100 /
              (site.htmlElmnts[elKey].responsive && input.length > 1 && wndw.wdth <= respWidth.xs
                ? input.filter((el) => el.type != 'break').length
                : input.length) +
            '% - ' +
            (5 *
              ((site.htmlElmnts[elKey].responsive && input.length > 1 && wndw.wdth <= respWidth.xs
                ? input.filter((el) => el.type != 'break').length
                : input.length) -
                1)) /
              (site.htmlElmnts[elKey].responsive && input.length > 1 && wndw.wdth <= respWidth.xs
                ? input.filter((el) => el.type != 'break').length
                : input.length) +
            'px))',
        }"
      >
        <template
          v-for="(subInput, subInputIndx) in input"
          v-if="
            !input[0].child ||
            (input[0].child &&
              (conditionals.includes(input[0].child) || conditionals.includes(input[0].child + '_' + input[0].count)))
          "
        >
          <template
            v-if="
              wndw.wdth > respWidth.xs ||
              subInput.type != 'break' ||
              input.length === 1 ||
              (subInput.type == 'break' && wndw.wdth <= respWidth.xs && !site.htmlElmnts[elKey].responsive)
            "
          >
            <span
              v-if="subInput.type == 'label'"
              style="margin: 5px 0px"
              :style="{ fontWeight: subInput.bold == 'true' ? 'bold' : 'normal' }"
              >{{ subInput.label }}</span
            >
            <br v-else-if="input[0].type == 'break' && input.length === 1" />
            <span v-else-if="subInput.type == 'break'" />
            <hr v-else-if="subInput.type == 'horizontal_rule'" style="width: 100%" />
            <span
              v-else-if="subInput.type == 'checkbox' || subInput.type == 'radio'"
              style="margin: 5px 0px; white-space: nowrap; overflow: hidden; text-overflow: clip"
            >
              <input
                :type="subInput.type"
                :checked="subInput.checked"
                :required="subInput.required"
                :disabled="submitBtnTxt == 'Submitted'"
                style="width: 13px; margin: 3px 3px 3px 4px"
                :id="subInput.type + '_' + inputIndx + '_' + subInputIndx"
                :name="
                  (subInput.name
                    ? subInput.name
                    : subInput.placeholder
                    ? subInput.placeholder + '_' + inputIndx + '_' + subInputIndx
                    : subInput.type + inputIndx + '_' + subInputIndx) + (subInput.count ? ' ' + subInput.count : '')
                "
                @invalid="$event.target.classList.add('invalid')"
                @change="
                  $event.target.classList.remove('invalid');
                  conditional($event, inputIndx, subInputIndx, subInput.parent, subInput.count);
                  subInput.required ? required($event, inputIndx, subInputIndx) : false;
                "
              />
              <label
                :for="subInput.type + '_' + inputIndx + '_' + subInputIndx"
                @change="conditional($event, inputIndx, subInputIndx, subInput.parent, subInput.count)"
                >{{ subInput.label }}</label
              >
            </span>
            <textarea
              v-else-if="subInput.type == 'textarea'"
              v-model="subInput.value"
              style="margin: 5px 0px; resize: none"
              :disabled="submitBtnTxt == 'Submitted'"
              :rows="subInput.rows ? subInput.rows : 1"
              :name="
                (subInput.name
                  ? subInput.name
                  : subInput.placeholder
                  ? subInput.placeholder + '_' + inputIndx + '_' + subInputIndx
                  : subInput.type + inputIndx + '_' + subInputIndx) + (subInput.count ? ' ' + subInput.count : '')
              "
              :placeholder="subInput.placeholder ? subInput.placeholder : 'Enter text here'"
            ></textarea>
            <span v-else-if="subInput.type == 'row_increaser'" style="margin: 5px 0px">
              <button
                style="width: 30px; height: 28px"
                :disabled="submitBtnTxt == 'Submitted'"
                @click.prevent="rowIncrease(inputIndx, subInputIndx, subInput.id)"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <button
                style="width: 30px; height: 28px"
                :disabled="subInput.count === 1 || submitBtnTxt == 'Submitted'"
                @click.prevent="rowDecrease(inputIndx, subInputIndx, subInput.id)"
              >
                <i class="fa-solid fa-minus"></i>
              </button>
              <label>{{ subInput.label }}</label>
            </span>
            <input
              v-else
              :min="subInput.min"
              :max="subInput.max"
              :step="subInput.step"
              :type="subInput.type"
              style="margin: 5px 0px"
              v-model="subInput.value"
              :pattern="subInput.pattern"
              :required="subInput.required"
              :disabled="submitBtnTxt == 'Submitted'"
              :name="
                (subInput.name
                  ? subInput.name
                  : subInput.placeholder
                  ? subInput.placeholder + '_' + inputIndx + '_' + subInputIndx
                  : subInput.type + inputIndx + '_' + subInputIndx) + (subInput.count ? ' ' + subInput.count : '')
              "
              :placeholder="
                (subInput.placeholder ? subInput.placeholder : '') +
                (subInput.count > 1 ? ' ' + subInput.count : '') +
                (subInput.required ? '*' : '')
              "
              :title="subInput.name ? subInput.name : subInput.required ? 'Please fill out this field.' : ''"
              @invalid="$event.target.classList.add('invalid')"
              @input="$event.target.classList.remove('invalid')"
            />
          </template>
        </template>
      </div>
    </template>

    <div class="forms-captcha-container">
      <div class="forms-captcha-inputs">
        <img class="forms-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" />
        <input
          required
          type="text"
          v-model="captcha"
          placeholder="Verify captcha"
          style="height: 4vh; width: calc(100% - 30px)"
          :disabled="submitBtnTxt == 'Submitted'"
          @invalid="$event.target.classList.add('invalid')"
          @input="captcha ? $event.target.classList.remove('invalid') : false"
        />
        <button class="forms-captcha-btn" @click.prevent="updateCaptcha()" :disabled="submitBtnTxt == 'Submitted'">
          <i :class="{ spin: captchaSpin }" class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
    <br />

    <button
      type="submit"
      @click.prevent="sendEmail"
      :disabled="submitBtnTxt == 'Submitted' || submitBtnTxt == 'Subscription updated'"
    >
      <template v-if="submitBtnTxt == 'Submitted' || submitBtnTxt == site.htmlElmnts[elKey].button">
        {{ submitBtnTxt }}
      </template>
      <i v-else class="spin fa-solid fa-arrows-rotate"></i>
    </button>
  </form>
</template>

<script>
export default {
  name: 'Form',

  inject: ['emailReq', 'endPts', 'respWidth', 'site', 'slctd', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      captcha: '',
      captchaDate: server_datetime_YmdHis,
      captchaSpin: false,
      submitBtnTxt: this.site.htmlElmnts[this.elKey].button,
      conditionals: [],
      emailBody: {},
      increasers: {},
    };
  },

  methods: {
    conditional(event, inputIndx, subInputIndx, parent, count) {
      if (event.target.checked) {
        this.elValue.form[inputIndx][subInputIndx].checked = true;
        if (event.target.type == 'radio') {
          this.elValue.form[inputIndx].forEach((row, rowIndx) => {
            if (parent !== undefined && row.parent == parent) {
              this.conditionals.push(parent + (count ? '_' + count : ''));
            } else if (row.parent !== undefined) {
              const conditionalIndx = this.conditionals.indexOf(row.parent + (count ? '_' + count : ''));

              if (conditionalIndx > -1) this.conditionals.splice(conditionalIndx, 1);
            }
          });
        } else if (parent) {
          this.conditionals.push(parent + (count ? '_' + count : ''));
        }
      } else {
        this.elValue.form[inputIndx][subInputIndx].checked = false;
        if (parent) {
          const conditionalIndx = this.conditionals.indexOf(parent);
          if (conditionalIndx > -1) this.conditionals.splice(conditionalIndx, 1);
        }
      }
    },
    required(event, inputIndx, subInputIndx) {
      this.elValue.form[inputIndx].forEach((subInput, subInputIndex) => {
        if (
          this.elValue.form[inputIndx][subInputIndex].type == this.elValue.form[inputIndx][subInputIndx].type &&
          subInputIndex !== subInputIndx
        )
          event.target.checked
            ? delete this.elValue.form[inputIndx][subInputIndex].required
            : (this.elValue.form[inputIndx][subInputIndex].required = 'true');
      });
      Array.from(this.$refs.formsForm).forEach((input) => {
        if (input.id.split('_')[1] == inputIndx) input.classList.remove('invalid');
      });
    },
    rowIncrease(inputIndx, subInputIndx, subInputID) {
      this.elValue.form[inputIndx][subInputIndx].count++;
      let tempIncreasers = JSON.parse(JSON.stringify(this.increasers[subInputID]));
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
      this.emailBody = {};
      if (this.$refs.formsForm.checkValidity()) {
        Array.from(this.$refs.formsForm).forEach((input) => {
          if (input.name && (input.checked || input.value)) {
            if (input.type == 'checkbox' || input.type == 'radio') {
              if (input.checked) {
                this.emailBody[input.name]
                  ? (this.emailBody[input.name] = this.emailBody[input.name] + ', ' + input.nextSibling.innerHTML)
                  : (this.emailBody[input.name] = input.nextSibling.innerHTML);
              }
            } else {
              this.emailBody[input.name] = this.emailBody[input.name]
                ? this.emailBody[input.name] + ' ' + input.value
                : input.value;
            }
          }
        });
        this.submitBtnTxt = null;
        this.emailReq('POST', this.captchaDate, this.captcha, this.emailBody).then((resJSON) => {
          this.submitBtnTxt = resJSON.success ? 'Submitted' : this.site.htmlElmnts[this.elKey].button;
        });
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
          let increaserRows = inpt.rows;
          let increaserRowIndx = rowIndx - 1;
          while (increaserRowIndx >= 0 && increaserRows > 0) {
            if (this.elValue.form[increaserRowIndx][0].child == inpt.child) {
              // this adds the row that matches a child value to the increasers computed object
              increaserRows--;
            }
            this.increasers[inpt.id].push(JSON.parse(JSON.stringify(this.elValue.form[increaserRowIndx])));
            // this adds a counter to each row defined within the row_increaser row count
            for (let x = 0; x < this.elValue.form[increaserRowIndx].length; x++) {
              this.elValue.form[increaserRowIndx][x].count = 1;
            }
            increaserRowIndx--;
          }
          this.increasers[inpt.id].reverse();
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
  width: 100%;
}
.forms button[type='submit'] {
  padding: 5px;
  width: 50%;
}
.forms button[type='submit']:disabled {
  color: rgb(16, 184, 16);
  font-weight: bolder;
  cursor: not-allowed;
  background-color: #efefef;
  border: 1px solid #767676;
  border-radius: 2px;
  height: 30px;
}
.forms-captcha-container {
  width: 100%;
}
.forms-captcha-inputs {
  width: 75%;
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
@media only screen and (min-width: 400px) {
  .forms button[type='submit'] {
    width: calc(50px + 20%);
  }
  .forms-captcha-inputs {
    width: 50%;
  }
}
@media only screen and (min-width: 650px) {
  .forms {
    padding: 0px 10%;
  }
  .forms button[type='submit'] {
    width: calc(50px + 15%);
  }
  .forms-captcha-img {
    height: 4.5vw;
  }
  .forms-captcha-inputs {
    width: calc(25% + 50px);
  }
}
</style>
