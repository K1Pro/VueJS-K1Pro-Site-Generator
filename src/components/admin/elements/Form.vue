<template>
  <div class="forms" :style="[style.outline.borderColor]">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="defaults.htmlElmnts[elValue.type].info.opts"></edit_menu>
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
              @focusin="tempMod = $event.target.value"
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
              <option :disabled="subInput[subInput.mod] != 'true'" value="false">false</option>
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
            <!-- Horizontal rule -->
            <hr
              v-if="subInput.type == 'horizontal_rule'"
              style="margin-left: -1px; width: calc(100% - 21px); margin-top: -15px"
            />
            <!-- Row increaser -->
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
            <!-- Label -->
            <input
              v-else-if="['label'].includes(subInput.type)"
              type="text"
              placeholder="label"
              :style="{ fontWeight: subInput.bold == 'true' ? 'bold' : 'normal' }"
              style="
                background: transparent;
                height: 28px;
                width: calc(100% - 20px);
                border: 1px dashed black;
                margin-left: -100%;
              "
              v-model="subInput.label"
              @keyup.ctrl="changeBold($event, inputIndx, subInputIndx)"
            />
          </span>
        </template>
        <input
          type="number"
          style="width: 60px"
          :value="input.length"
          @change="changeSubInputAmnt($event, inputIndx)"
        />
        <button style="width: 30px; height: 28px" @click="addInput(inputIndx)">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </template>
    <!-- Captcha -->
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
    <!-- Editable submit button -->
    <span
      class="forms-submit"
      contenteditable="plaintext-only"
      v-on:blur="site.htmlElmnts[elKey].button = $event.target.innerHTML"
      >{{ site.htmlElmnts[elKey].button ? site.htmlElmnts[elKey].button : 'Submit' }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'Form',

  inject: ['defaults', 'grid', 'endPts', 'showMsg', 'site', 'style'],

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
    changeBold(event, inputIndx, subInputIndx) {
      if (event.key == 'b') {
        this.elValue.form[inputIndx][subInputIndx].bold == 'true'
          ? (this.elValue.form[inputIndx][subInputIndx].bold = 'false')
          : (this.elValue.form[inputIndx][subInputIndx].bold = 'true');
      }
    },
    slctAttr(event, inputIndx, subInputIndx) {
      console.log('slctAttr');
      if (['insert', 'remove'].includes(event.target.value)) {
        const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
        if (event.target.value == 'insert') {
          tempForm[inputIndx][0].child
            ? tempForm[inputIndx].splice(subInputIndx, 0, {
                type: tempForm[inputIndx][subInputIndx].type,
                child: tempForm[inputIndx][0].child,
              })
            : tempForm[inputIndx].splice(subInputIndx, 0, { type: tempForm[inputIndx][subInputIndx].type });
        }
        if (event.target.value == 'remove') {
          if (tempForm[inputIndx][subInputIndx].parent) {
            let findChildren = [];
            tempForm.forEach((row, rowIndx) => {
              if (row[0].child == tempForm[inputIndx][subInputIndx].parent) findChildren.push(rowIndx);
            });
            tempForm.splice(findChildren[0], findChildren.length);
          }
          const rowChild = tempForm[inputIndx][subInputIndx].child ? tempForm[inputIndx][subInputIndx].child : false;
          tempForm[inputIndx].length === 1
            ? tempForm.splice(inputIndx, 1)
            : tempForm[inputIndx].splice(subInputIndx, 1);
          if (rowChild && !JSON.stringify(tempForm).includes('"child":"' + rowChild + '"')) {
            tempForm.forEach((row, rowIndx) => {
              row.forEach((subInput, subInputIndex) => {
                if (subInput.parent == rowChild) {
                  delete tempForm[rowIndx][subInputIndex].parent;
                  tempForm[rowIndx][subInputIndex].conditional = 'false';
                }
              });
            });
          }
        }
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
      // console.log('inputIndx: ' + inputIndx);
      // console.log('subInputIndx: ' + subInputIndx);
      const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
      tempForm[inputIndx][subInputIndx][mod] = event.target.value;
      if (mod == 'conditional') {
        console.log('conditional');
        if (event.target.value == 'true') {
          // console.log('true');
          let colorHex;
          do {
            colorHex = Math.floor(Math.random() * 16777215).toString(16);
          } while (colorHex.length !== 6 || JSON.stringify(tempForm).includes('"parent":"' + colorHex + '"'));
          if (subInputIndx === 0) {
            // console.log('this is the first subinput');
            tempForm.splice(inputIndx + 1, 0, [{ type: 'break', child: colorHex }]);
          } else if (JSON.stringify(tempForm[inputIndx]).includes('"parent":"')) {
            // console.log('parents exist');
            let previousParent = null;
            for (let subInputIndex = subInputIndx - 1; subInputIndex >= 0; subInputIndex--) {
              // console.log(subInputIndex);
              if (tempForm[inputIndx][subInputIndex].parent) {
                previousParent = tempForm[inputIndx][subInputIndex].parent;
                break;
              }
            }
            // console.log(previousParent);
            if (JSON.stringify(tempForm).includes('"child":"' + previousParent + '"')) {
              // console.log('children exist');
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
            // console.log('parents do not exist');
            tempForm.splice(inputIndx + 1, 0, [{ type: 'break', child: colorHex }]);
          }
          tempForm[inputIndx][subInputIndx].parent = colorHex;
        } else {
          // console.log('false');
          let findChildren = [];
          tempForm.forEach((row, rowIndx) => {
            if (row[0].child == tempForm[inputIndx][subInputIndx].parent) findChildren.push(rowIndx);
          });
          tempForm.splice(findChildren[0], findChildren.length);
          delete tempForm[inputIndx][subInputIndx].parent;
        }
      } else if (mod == 'required') {
        if (['radio', 'checkbox'].includes(tempForm[inputIndx][subInputIndx].type)) {
          console.log('required');
          tempForm[inputIndx].forEach((subInput, subInputIndex) => {
            if (subInput.type == tempForm[inputIndx][subInputIndx].type)
              event.target.value == 'true'
                ? (tempForm[inputIndx][subInputIndex].required = 'true')
                : delete tempForm[inputIndx][subInputIndex].required;
          });
        }
      }
      console.log(tempForm[inputIndx][tempForm[inputIndx].length - 1]);
      this.site.htmlElmnts[this.elKey].form = tempForm;
      console.log('==============');
    },
    attrRptr(event, inputIndx, subInputIndx, mod) {
      console.log('attrRptr');
      if (['radio', 'checkbox'].includes(this.elValue.form[inputIndx][subInputIndx]?.type) && mod == 'name') {
        // This applies the same name for radio and checkbox inputs in the same
        this.elValue.form[inputIndx].forEach((xInput, xInputIndx) => {
          if (['radio', 'checkbox'].includes(xInput.type))
            event.target.value == ''
              ? delete this.elValue.form[inputIndx][xInputIndx][mod]
              : (this.elValue.form[inputIndx][xInputIndx][mod] = event.target.value);
        });
      }
      if (event.target.value == '') delete this.elValue.form[inputIndx][subInputIndx][mod];
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
    changeSubInputAmnt(event, inputIndx) {
      console.log('changeSubInputAmnt');
      const tempForm = JSON.parse(JSON.stringify(this.elValue.form));
      const newColumnAmount = event.target.value;
      const existingColumnAmount = tempForm[inputIndx].length;
      if (newColumnAmount > existingColumnAmount) {
        // console.log('increases subinputs');
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
        // console.log('deleting entire row');
        // this deletes all children if parent checkbox or radio is deleted
        if (tempForm[inputIndx][0].parent) {
          // console.log('this deletes all children if parent checkbox or radio is deleted');
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
          // console.log('this deletes a parent checkbox or radio input if all children are deleted');
          tempForm.forEach((row, rowIndx) => {
            row.forEach((subInput, subInputIndex) => {
              if (subInput.parent == rowChild) {
                delete tempForm[rowIndx][subInputIndex].parent;
                tempForm[rowIndx][subInputIndex].conditional = 'false';
              }
            });
          });
        }
      } else {
        // console.log('decreases subinputs');
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
};
</script>

<style>
.forms {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
  padding: 0px 10px;
  /* might need to get rid of padding above */
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
  white-space: nowrap;
  overflow: hidden;
}
.forms-submit {
  display: inline-block;
  background-color: #efefef;
  border: 1px solid #767676;
  border-radius: 2px;
  height: 30px;
  cursor: default;
  padding: 6px 5px 5px 5px;
  font-size: 13px;
}
.forms-submit:hover {
  background-color: #e5e5e5;
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
