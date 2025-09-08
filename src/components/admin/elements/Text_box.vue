<template>
  <div :id="elKey" class="text-box" :style="[style.outline.borderColor, divStyle]">
    <edit_menu
      :elKey="elKey"
      :elIndex="elIndex"
      :options="['text-editor', 'color', 'font-size', 'text-align']"
    ></edit_menu>

    <div v-if="site.htmlElmnts[elKey].textEditor" class="text-box-editor">
      <button
        @click="editDsbld ? false : styleChng('span', 'font-weight', 'bold')"
        :disabled="elValue.mod == 'source-code'"
      >
        <i class="fa-solid fa-bold"></i>
      </button>
      <button
        @click="editDsbld ? false : styleChng('span', 'font-style', 'italic')"
        :disabled="elValue.mod == 'source-code'"
      >
        <i class="fa-solid fa-italic"></i>
      </button>
      <button
        @click="editDsbld ? false : styleChng('span', 'text-decoration', 'underline')"
        :disabled="elValue.mod == 'source-code'"
      >
        <i class="fa-solid fa-underline"></i>
      </button>
      <button
        @click.prevent="editDsbld ? false : styleChng('span', 'font-size', 1)"
        :disabled="elValue.mod == 'source-code'"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
      <button @click="editDsbld ? false : styleChng('span', 'font-size', -1)" :disabled="elValue.mod == 'source-code'">
        <i class="fa-solid fa-minus"></i>
      </button>
      <input
        type="color"
        @input="editDsbld ? false : styleChng('span', 'color', $event.target.value)"
        :disabled="elValue.mod == 'source-code'"
      />
      <input type="text" placeholder="URL" style="width: 45px" v-model="url" :disabled="elValue.mod == 'source-code'" />
      <button :disabled="url == '' || elValue.mod == 'source-code'" @click="editDsbld ? false : styleChng('a')">
        <i class="fa-solid fa-link"></i>
      </button>
      <button
        @click="editDsbld ? false : (site.htmlElmnts[elKey].text = elValue.text.replace(/<[^>]*>?/gm, ''))"
        :disabled="elValue.mod == 'source-code'"
      >
        <i class="fa-solid fa-eraser"></i>
      </button>
      <button
        v-if="elValue.mod == 'html'"
        @click="editDsbld ? false : (elValue.mod = 'source-code')"
        style="width: 30px"
      >
        <i class="fa-solid fa-code"></i>
      </button>
      <button v-else @click="editDsbld ? false : (elValue.mod = 'html')" style="width: 30px">
        <i class="fa-solid fa-align-justify"></i>
      </button>
    </div>

    <span
      v-if="elValue.mod == 'html'"
      ref="textBoxSpan"
      spellcheck="false"
      contenteditable="true"
      :id="'text-box-' + elIndex"
      :style="[spanStyle]"
      class="text-box-main-span"
      v-html="elValue.text"
      v-on:blur="elValue.text = $event.target.innerHTML"
      @click="spanClick"
      @mousedown="slctdSpanID = null"
      @paste="onPaste"
    >
    </span>
    <textarea v-else v-model="elValue.text" :style="{ height: spanHght }"></textarea>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['grid', 'respWidth', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { spanHght: '35px', editDsbld: false, slctdSpanID: null, url: '' };
  },

  updated() {
    if (this.$refs.textBoxSpan) this.spanHght = this.$refs.textBoxSpan.scrollHeight + 'px';
  },

  methods: {
    onPaste() {
      console.log('image pasted in');
      setTimeout(() => {
        this.elValue.text = this.$refs.textBoxSpan.innerHTML
          .replace(/<[^>]*>/g, '__________')
          .replaceAll('__________', '<br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>')
          .replaceAll('<br><br><br>', '<br><br>');
      }, 2);
    },
    spanClick() {
      this.slctdSpanID = null;
      let selection = window.getSelection();
      let nodes = [];
      let nodeNames = [];
      let slctdEl = selection.anchorNode;
      do {
        nodes.unshift(slctdEl.parentNode.id);
        nodeNames.unshift(slctdEl.parentNode.nodeName);
        slctdEl = slctdEl.parentNode;
      } while (slctdEl.parentNode && !nodes.includes(this.$refs.textBoxSpan.id));
      this.slctdSpanID = nodeNames.length > 1 ? nodes[1] : null;
    },
    styleChng(el, styleType, unit) {
      let selection = window.getSelection();
      let slctdSpan;
      if (
        selection.toString() != '' &&
        (selection?.anchorNode?.id == this.$refs.textBoxSpan.id ||
          selection?.anchorNode?.parentNode?.id == this.$refs.textBoxSpan.id ||
          selection?.anchorNode?.parentNode?.parentNode?.id == this.$refs.textBoxSpan.id)
      ) {
        this.editDsbld = true;
        let element;
        if (this.slctdSpanID) {
          // Editing existing element
          slctdSpan = document.getElementById(this.slctdSpanID);
          if (el == 'span') {
            if (slctdSpan.style[styleType]) {
              if (styleType == 'font-size') {
                slctdSpan.style[styleType] =
                  Number(slctdSpan.style[styleType].replace(/[^0-9.]/g, '')) +
                  unit +
                  slctdSpan.style[styleType].replace(/[0-9.]/g, '');
              } else if (styleType == 'color') {
                slctdSpan.style[styleType] = unit;
              } else {
                slctdSpan.style.removeProperty(styleType);
              }
            } else {
              slctdSpan.style[styleType] =
                styleType == 'font-size'
                  ? Number(this.elValue.style[styleType].replace(/\D/g, '')) +
                    unit +
                    this.elValue.style[styleType].replace(/[0-9]/g, '')
                  : unit;
            }
          }
        } else {
          // Creating a new element
          element = document.createElement(el);
          element.id = 'text-box-el-' + new Date().getTime();
          this.slctdSpanID = element.id;
          if (el == 'span') {
            element.style[styleType] =
              styleType == 'font-size'
                ? Number(this.elValue.style[styleType].replace(/\D/g, '')) +
                  unit +
                  this.elValue.style[styleType].replace(/[0-9]/g, '')
                : unit;
          } else if (el == 'a') {
            element.href = this.url;
            element.target = '_blank';
          }
          window.getSelection().getRangeAt(0).surroundContents(element);
          slctdSpan = document.getElementById(this.slctdSpanID);
        }

        this.elValue.text = this.$refs.textBoxSpan.innerHTML;

        setTimeout(() => {
          this.reHighlight();
          this.editDsbld = false;
        }, 2);

        this.url = '';
      } else {
        // Something went wrong with selection
        if (this.slctdSpanID)
          setTimeout(() => {
            this.reHighlight();
          }, 2);
      }
    },
    reHighlight() {
      slctdSpan = document.getElementById(this.slctdSpanID);
      slctdSpan.setAttribute('tabindex', '0');
      slctdSpan.focus();
      const range = document.createRange();
      range.setStart(slctdSpan.firstChild, 0);
      range.setEnd(slctdSpan.firstChild, slctdSpan.firstChild.length);
      let selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    },
  },

  computed: {
    divStyle() {
      return {
        paddingLeft: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
        paddingRight: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
      };
    },
    spanStyle() {
      return {
        color: this.elValue.style.color ? this.elValue.style.color : 'blue',
        fontSize:
          !this.elValue.style['font-size'] && !this.site.body.style['font-size']
            ? '12px'
            : !this.elValue.style['font-size'] && this.site.body.style['font-size']
            ? this.site.body.style['font-size']
            : this.elValue.style['font-size'].includes('vw')
            ? this.grid.wdth * (this.elValue.style['font-size']?.replace(/\D/g, '') / 100) + 'px'
            : this.elValue.style['font-size'],
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'center',
      };
    },
  },
};
</script>

<style>
.text-box {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.text-box-editor {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.text-box-main-span {
  display: block;
  min-height: 35px;
}
.text-box-main-span:focus {
  outline: none;
}
.text-box span[contenteditable]:empty::before {
  content: 'Text box';
  color: grey;
}
.text-box span[contenteditable]:empty:focus::before {
  content: 'Start typing';
  color: grey;
}
.text-box textarea {
  width: 100%;
  min-height: 35px;
}
.text-box input[type='color'] {
  height: 22px;
}
</style>
