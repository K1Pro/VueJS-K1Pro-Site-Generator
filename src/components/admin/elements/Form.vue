<template>
  <div class="forms">
    <template v-for="(input, inputIndx) in elValue.form" :key="'row_' + inputIndx">
      <div
        style="display: grid; grid-gap: 5px"
        :style="{
          gridTemplateColumns:
            'repeat(' +
            input.length +
            ', calc(' +
            100 / input.length +
            '% - ' +
            (5 * (input.length - 1) + 90) / input.length +
            'px)) 60px 30px',
        }"
      >
        <template v-for="(subInput, subInputIndx) in input" :key="'column_' + inputIndx + '_' + subInputIndx">
          <span
            :title="
              JSON.stringify(Object.entries(subInput))
                .replaceAll('&quot;', '')
                .replace('[mod,' + subInput.mod + '],', '')
                .replace('[mod,' + subInput.mod + ']]', '')
                .replace('[[', '')
                .replace(']]', '')
                .replaceAll('],[', '__________')
                .replaceAll('],', '')
                .replaceAll(',', ': ')
                .replaceAll('__________', ' --- ')
            "
            :style="{
              borderTop:
                elValue.form?.[inputIndx - 1] &&
                subInput.child &&
                subInput.child !== elValue.form[inputIndx - 1]?.[0]?.child
                  ? '3px solid #' + subInput.child
                  : '0px solid #00000000',
              borderRight:
                subInput.child && subInputIndx === input.length - 1
                  ? '3px solid #' + subInput.child
                  : '0px solid #00000000',
              borderBottom:
                elValue.form?.[inputIndx + 1] &&
                subInput.child &&
                subInput.child !== elValue.form[inputIndx + 1]?.[0]?.child
                  ? '3px solid #' + subInput.child
                  : '0px solid #00000000',
              borderLeft: subInput.child && subInputIndx === 0 ? '3px solid #' + subInput.child : '0px solid #00000000',
              backgroundImage:
                subInput.parent && subInput.conditional == 'true'
                  ? 'linear-gradient(90deg, #' + subInput.parent + ' 0 20px, #ffffff00 20px 100%)'
                  : 'linear-gradient(90deg, #00000000 0 20px, #00000000 20px 100%)',
            }"
          >
            <!-- Attributes select -->
            <select
              v-if="!['row_increaser', 'horizontal_rule', 'break', 'label'].includes(subInput.type)"
              style="width: 100%; margin-right: -100%; background: transparent; border: none"
              @change="slctAttr($event, inputIndx, subInputIndx)"
            >
              <option selected disabled></option>
              <option value="type" :disabled="!subInput.mod || subInput?.mod == 'type'">type</option>
              <option v-for="attr in elements[subInput.type]" :value="attr" :disabled="subInput?.mod == attr">
                {{ attr }}
              </option>
              <option v-if="subInput.parent">color</option>
              <option>insert</option>
              <option>remove</option>
            </select>
            <!-- Checkbox or radio input -->
            <input
              v-if="['checkbox', 'radio'].includes(subInput.type)"
              :type="subInput.type"
              style="width: 13px; margin: 3px 3px 3px 4px"
              :checked="subInput.checked === true"
              @click="checkInput($event, inputIndx, subInputIndx)"
            />
            <!-- Name, value, placeholder and pattern inputs -->
            <input
              v-if="
                ['label', 'name', 'pattern', 'placeholder', 'value'].includes(subInput?.mod) &&
                !['row_increaser'].includes(subInput.type)
              "
              style="height: 28px"
              v-model="subInput[subInput.mod]"
              :type="subInput.mod == 'value' ? subInput.type.replaceAll('_', '-') : 'text'"
              :placeholder="subInput.type + ' input ' + subInput.mod"
              :style="{
                width: ['checkbox', 'radio'].includes(subInput.type) ? 'calc(100% - 40px)' : 'calc(100% - 20px)',
                background: ['checkbox', 'radio'].includes(subInput.type) ? 'transparent' : 'white',
                border: ['checkbox', 'radio'].includes(subInput.type) ? '1px dashed black' : '1px solid black',
              }"
              @change="attrRptr($event, inputIndx, subInputIndx, subInput.mod)"
            />
            <!-- Required and conditional inputs -->
            <select
              v-else-if="['conditional', 'required'].includes(subInput?.mod)"
              style="height: 28px"
              :style="{
                width: ['checkbox', 'radio'].includes(subInput.type) ? 'calc(100% - 40px)' : 'calc(100% - 20px)',
              }"
              @change="slctCondition($event, inputIndx, subInputIndx, subInput.mod)"
            >
              <option disabled selected>
                {{ 'is this ' + subInput.type + ' input ' + subInput.mod + '?' }}
              </option>
              <option :disabled="subInput[subInput.mod] == 'true'" value="true">true</option>
              <option :disabled="subInput[subInput.mod] == 'false' || !subInput.conditional" value="false">
                false
              </option>
            </select>
            <!-- Min, max, step and rows input -->
            <input
              v-else-if="['min', 'max', 'step', 'rows'].includes(subInput?.mod)"
              :placeholder="subInput.type + ' input ' + subInput.mod"
              type="number"
              style="width: calc(100% - 20px); height: 28px"
              v-model="subInput[subInput.mod]"
            />
            <!-- Color input for checkbox or radio inputs -->
            <input
              v-else-if="['color'].includes(subInput?.mod) && ['checkbox', 'radio'].includes(subInput?.type)"
              type="color"
              style="width: calc(100% - 40px); height: 28px"
              :value="'#' + subInput.parent"
              @input="chngCndtnlClor($event, subInput.parent, inputIndx, subInputIndx)"
            />
            <!-- Type input -->
            <select
              v-else
              style="height: 28px"
              :style="{
                width: ['checkbox', 'radio'].includes(subInput.type)
                  ? 'calc(100% - 40px)'
                  : ['break', 'horizontal_rule', 'label', 'row_increaser'].includes(subInput.type)
                  ? '100%'
                  : 'calc(100% - 20px)',
                background: ['break', 'horizontal_rule', 'row_increaser', 'label'].includes(subInput.type)
                  ? 'transparent'
                  : 'white',
                border: ['break', 'horizontal_rule', 'row_increaser', 'label'].includes(subInput.type)
                  ? 'none'
                  : '1px solid black',
              }"
              v-model="subInput.type"
              @change="changeInput($event, inputIndx, subInputIndx)"
            >
              <option
                selected
                disabled
                :value="
                  ['break', 'horizontal_rule', 'row_increaser', 'label'].includes(subInput.type) ? subInput.type : false
                "
              ></option>
              <template v-for="element in Object.keys(elements)">
                <option
                  :value="element"
                  :disabled="
                    element == subInput.type ||
                    (JSON.stringify(input).includes('row_increaser') && element == 'row_increaser')
                  "
                >
                  {{ element.replaceAll('_', '-') }}
                  {{
                    ['break', 'horizontal_rule', 'label', 'row_increaser', 'textarea'].includes(element) ? '' : 'input'
                  }}
                </option>
              </template>
            </select>
            <hr
              v-if="subInput.type == 'horizontal_rule'"
              style="margin-left: -1px; width: calc(100% - 21px); margin-top: -15px"
            />
            <span v-else-if="subInput.type == 'row_increaser'" style="margin-left: -100%">
              <button style="width: 30px; height: 28px"><i class="fa-solid fa-plus"></i></button>
              <button style="width: 30px; height: 28px"><i class="fa-solid fa-minus"></i></button>
              <input type="number" style="width: 60px; height: 28px" v-model="subInput.rows" />
              <input
                type="text"
                style="background: transparent; border: 1px dashed black; width: calc(100% - 140px)"
                v-model="subInput.label"
              />
            </span>
            <input
              v-else-if="['label'].includes(subInput.type)"
              type="text"
              placeholder="label"
              style="
                background: transparent;
                height: 28px;
                width: calc(100% - 20px);
                border: 1px dashed black;
                margin-left: -100%;
              "
              v-model="subInput.label"
            />
          </span>
        </template>
        <input type="number" style="width: 60px" :value="input.length" @change="addSubInput($event, inputIndx)" />
        <button style="width: 30px; height: 28px" @click="addInput(inputIndx)">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </template>

    <div class="forms-captcha-container">
      <div class="forms-captcha-inputs">
        <img class="forms-captcha-img" :src="endPts.captchaURL + captchaDate + '.jpg'" />
        <input type="text" placeholder="Verify captcha" style="height: 4vh; width: calc(100% - 90px)" />
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
      tempMod: null,
      elements: {
        break: [],
        checkbox: ['label', 'name', 'required', 'conditional'],
        color: ['value', 'name', 'required'],
        date: ['value', 'name', 'required', 'min', 'max', 'step'],
        datetime_local: ['value', 'name', 'required', 'min', 'max', 'step'],
        email: ['placeholder', 'name', 'value', 'required'],
        horizontal_rule: [],
        label: [],
        month: ['value', 'name', 'required', 'min', 'max', 'step'],
        number: ['placeholder', 'name', 'value', 'required', 'min', 'max', 'step'],
        radio: ['label', 'name', 'required', 'conditional'],
        row_increaser: [],
        tel: ['pattern', 'name', 'value', 'required', 'placeholder'],
        text: ['placeholder', 'name', 'value', 'required'],
        textarea: ['placeholder', 'name', 'value', 'required', 'rows'],
        time: ['value', 'name', 'required', 'min', 'max', 'step'],
        url: ['placeholder', 'name', 'value', 'required', 'pattern'],
        week: ['value', 'name', 'required', 'min', 'max', 'step'],
      },
    };
  },
  methods: {
    slctAttr(event, inputIndx, subInputIndx) {
      console.log('slctAttr');
      console.log(event.target.value);

      if (['insert', 'remove'].includes(event.target.value)) {
        const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
        if (event.target.value == 'insert') tempForm[inputIndx].splice(subInputIndx, 0, { type: 'break' });
        if (event.target.value == 'remove') tempForm[inputIndx].splice(subInputIndx, 1);

        this.site.htmlElmnts[this.elKey].form = tempForm;
        event.srcElement.selectedIndex = 0;
      } else {
        this.elValue.form[inputIndx][subInputIndx].mod = event.target.value;
        event.srcElement.selectedIndex = 0;
      }

      console.log('==============');
    },
    slctCondition(event, inputIndx, subInputIndx, mod) {
      console.log('slctCondition');
      const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
      tempForm[inputIndx][subInputIndx][mod] = event.target.value;
      if (mod == 'conditional') {
        if (event.target.value == 'true') {
          let colorHex;
          do {
            colorHex = Math.floor(Math.random() * 16777215).toString(16);
          } while (colorHex.length !== 6 || JSON.stringify(tempForm).includes('"parent":"' + colorHex + '"'));
          if (JSON.stringify(tempForm[inputIndx]).includes('"parent":"')) {
            let previousParent = null;
            for (let subInputIndex = tempForm[inputIndx].length - 1; subInputIndex >= 0; subInputIndex--) {
              if (tempForm[inputIndx][subInputIndex].parent) {
                previousParent = tempForm[inputIndx][subInputIndex].parent;
                break;
              }
            }
            if (JSON.stringify(tempForm).includes('"child":"' + previousParent + '"')) {
              let lastChildIndx = null;
              for (let inputIndex = tempForm.length - 1; inputIndex >= 0; inputIndex--) {
                if (tempForm[inputIndex][0].child == previousParent) {
                  lastChildIndx = inputIndex;
                  break;
                }
              }
              tempForm.splice(lastChildIndx + 1, 0, [{ type: 'break', child: colorHex }]);
            }
          } else {
            tempForm.splice(inputIndx + 1, 0, [{ type: 'break', child: colorHex }]);
          }
          tempForm[inputIndx][subInputIndx].parent = colorHex;
        } else {
          let findChildren = [];
          tempForm.forEach((row, rowIndx) => {
            if (row[0].child == tempForm[inputIndx][subInputIndx].parent) findChildren.push(rowIndx);
          });
          tempForm.splice(findChildren[0], findChildren.length);
          delete tempForm[inputIndx][subInputIndx].parent;
        }
      }
      console.log(tempForm[inputIndx][tempForm[inputIndx].length - 1]);
      this.site.htmlElmnts[this.elKey].form = tempForm;
      console.log('==============');
    },
    attrRptr(event, inputIndx, subInputIndx, mod) {
      console.log('attrRptr');
      if (['radio', 'checkbox'].includes(this.elValue.form[inputIndx][subInputIndx]?.type) && mod == 'name') {
        this.elValue.form[inputIndx].forEach((xInput, xInputIndx) => {
          if (['radio', 'checkbox'].includes(xInput.type))
            this.elValue.form[inputIndx][xInputIndx][mod] = event.target.value;
        });
      }
      console.log(this.elValue.form[inputIndx]);
      console.log('==============');
    },
    checkInput(event, inputIndx, subInputIndx) {
      console.log('checkInput');
      if (this.elValue.form[inputIndx][subInputIndx].checked === true) {
        this.elValue.form[inputIndx][subInputIndx].checked = false;
        event.target.checked = false;
      } else {
        this.elValue.form[inputIndx][subInputIndx].checked = true;
        event.target.checked = true;
      }
      console.log(this.elValue.form[inputIndx]);
      console.log('==============');
    },
    addInput(inputIndx) {
      console.log('addInput');
      const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
      if (tempForm[inputIndx][0]?.child) {
        // prettier-ignore
        tempForm.splice(inputIndx + 1, 0, [{ type: 'break', child: tempForm[inputIndx][0]?.child, }, ]);
      } else {
        let firstNonChild = [];
        if (tempForm[inputIndx + 1]) {
          if (tempForm[inputIndx + 1][0].child) {
            tempForm.forEach((row, rowIndx) => {
              if (inputIndx < rowIndx && !row[0].child) firstNonChild.push(rowIndx);
            });
            firstNonChild.length === 0
              ? tempForm.splice(tempForm.length, 0, [{ type: 'break' }])
              : tempForm.splice(firstNonChild[0], 0, [{ type: 'break' }]);
          } else {
            tempForm.splice(inputIndx + 1, 0, [{ type: 'break' }]);
          }
        } else {
          tempForm.splice(inputIndx + 1, 0, [{ type: 'break' }]);
        }
      }
      console.log(tempForm[inputIndx + 1]);
      this.site.htmlElmnts[this.elKey].form = tempForm;
      console.log('==============');
    },
    changeInput(event, inputIndx, subInputIndx) {
      console.log('changeInput');
      const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
      if (tempForm[inputIndx][subInputIndx].parent) {
        let findChildren = [];
        tempForm.forEach((row, rowIndx) => {
          if (row[0].child == tempForm[inputIndx][subInputIndx].parent) findChildren.push(rowIndx);
        });
        tempForm.splice(findChildren[0], findChildren.length);
      }
      const changedInput = { type: event.target.value };
      if (tempForm[inputIndx][subInputIndx].child) changedInput.child = tempForm[inputIndx][subInputIndx].child;
      if (this.elements[event.target.value].length > 0) changedInput.mod = this.elements[event.target.value][0];
      tempForm[inputIndx][subInputIndx] = changedInput;
      console.log(changedInput);
      this.site.htmlElmnts[this.elKey].form = tempForm;

      console.log('==============');
    },
    addSubInput(event, inputIndx) {
      console.log('addSubInput');
      const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
      const newColumnAmount = event.target.value;
      const existingColumnAmount = tempForm[inputIndx].length;
      if (newColumnAmount > existingColumnAmount) {
        for (let i = 0; i < newColumnAmount - existingColumnAmount; i++) {
          const prevSubInput = tempForm[inputIndx][tempForm[inputIndx].length - 1];
          const newSubInput = { type: prevSubInput.type != 'row_increaser' ? prevSubInput.type : 'text' };
          if (this.elements[newSubInput.type][0]) newSubInput.mod = this.elements[newSubInput.type][0];
          if (prevSubInput.child) newSubInput.child = prevSubInput.child;
          if (
            JSON.stringify(tempForm[inputIndx]).includes('"type":"radio"') ||
            JSON.stringify(tempForm[inputIndx]).includes('"type":"checkbox"')
          )
            tempForm[inputIndx].forEach((subInput) => {
              if (subInput.type == newSubInput.type && subInput.name) newSubInput.name = subInput.name;
            });
          tempForm[inputIndx].push(newSubInput);
        }
      } else if (newColumnAmount <= 0) {
        // this deletes are children if parent checkbox or radio is deleted
        if (tempForm[inputIndx][0].parent) {
          let findChildren = [];
          tempForm.forEach((row, rowIndx) => {
            if (row[0].child == tempForm[inputIndx][0].parent) findChildren.push(rowIndx);
          });
          tempForm.splice(findChildren[0], findChildren.length);
        }
        const rowChild = tempForm[inputIndx][0].child ? tempForm[inputIndx][0].child : false;
        tempForm.splice(inputIndx, 1);
        // this deletes a parent checkbox or radio input if all children are deleted
        if (rowChild && !JSON.stringify(tempForm).includes('"child":"' + rowChild + '"')) {
          tempForm.forEach((row, rowIndx) => {
            row.forEach((subInput, subInputIndex) => {
              if (subInput.parent == rowChild) delete tempForm[rowIndx][subInputIndex].parent;
            });
          });
        }
      } else {
        for (let i = newColumnAmount; i < existingColumnAmount; i++) {
          if (tempForm[inputIndx][i].parent) {
            let findChildren = [];
            tempForm.forEach((row, rowIndx) => {
              if (row[0].child == tempForm[inputIndx][i].parent) findChildren.push(rowIndx);
            });
            tempForm.splice(findChildren[0], findChildren.length);
          }
          tempForm[inputIndx].splice(i, 1);
        }
      }
      console.log(tempForm[inputIndx][tempForm[inputIndx].length - 1]);
      this.site.htmlElmnts[this.elKey].form = tempForm;
      console.log('==============');
    },
    chngCndtnlClor(event, parent, inputIndx, subInputIndx) {
      console.log('chngCndtnlClor');
      if (JSON.stringify(this.elValue.form).includes('"parent":"' + event.target.value.replaceAll('#', '') + '"')) {
        event.target.value = '#' + parent;
      } else {
        const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
        if (JSON.stringify(this.elValue.form).includes('"child":"' + parent + '"')) {
          tempForm.forEach((row, rowIndx) => {
            row.forEach((subInput, subInputIndex) => {
              if (tempForm[rowIndx][subInputIndex].child == parent) {
                tempForm[rowIndx][subInputIndex].child = event.target.value.replaceAll('#', '');
              }
            });
          });
        }
        tempForm[inputIndx][subInputIndx].parent = event.target.value.replaceAll('#', '');
        console.log(tempForm[inputIndx][subInputIndx]);
        this.site.htmlElmnts[this.elKey].form = tempForm;
      }

      console.log('==============');
    },
  },

  created() {
    if (!this.elValue.form || this.elValue.form.length < 1) {
      this.site.htmlElmnts[this.elKey].form = [[{ type: 'break' }]];
    }
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
  width: calc(100% - 90px);
  height: 28px;
}
.forms select {
  padding: 5px;
}
.forms select:focus {
  outline: none;
}
.forms button[type='submit'] {
  padding: 5px;
}
.forms span {
  /* float: left; */
  white-space: nowrap;
  overflow: hidden;
  /* width: calc(100% - 90px); */
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
