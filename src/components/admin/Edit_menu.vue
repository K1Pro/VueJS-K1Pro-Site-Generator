<template>
  <div class="edit-menu">
    <select v-model="option">
      <option v-for="option in options" :value="option">
        {{ option.includes('_') ? option.split('_')[1].replaceAll('-', ' ') : option }}
      </option>
    </select>
    <!-- align -->
    <button v-if="JSON.stringify(option).includes('align') && option != 'vertical-align'" :title="option">
      <i
        class="fa-solid"
        :class="
          ['center'].includes(site.htmlElmnts[elKey].style[option])
            ? 'fa-align-center'
            : ['right', 'flex-end'].includes(site.htmlElmnts[elKey].style[option])
            ? 'fa-align-right'
            : 'fa-align-left'
        "
        @click="changeAlign($event.target.classList[1], option)"
      ></i>
    </button>
    <!-- justify-content -->
    <select v-if="option == 'justify-content'" v-model="site.htmlElmnts[elKey].style['justify-content']">
      <option>space-between</option>
      <option>space-around</option>
      <option>space-evenly</option>
    </select>
    <!-- object-fit -->
    <select v-if="option == 'object-fit'" v-model="site.htmlElmnts[elKey].style['object-fit']">
      <option>contain</option>
      <option>cover</option>
      <option>fill</option>
      <option>none</option>
      <option>scale-down</option>
    </select>
    <!-- text [anchor, url] -->
    <!-- need to handle elIndex for footer items so anchor is not used -->
    <input
      v-if="option == 'anchor'"
      type="text"
      title="anchor"
      class="edit-menu-inputs"
      v-model="site.pages[slctd.type][slctd.page][elIndex][2]"
    />
    <input
      v-if="option == 'url'"
      type="text"
      title="url"
      class="edit-menu-inputs"
      v-model="site.htmlElmnts[elKey].style.url"
    />
    <!-- checkbox [backgound, responsive, text-box-image, titles, vertical-align]-->
    <input
      v-if="['background', 'responsive', 'vertical-align'].includes(option)"
      type="checkbox"
      v-model="site.htmlElmnts[elKey].style[option]"
    />
    <input v-if="['titles'].includes(option)" type="checkbox" v-model="site.htmlElmnts[elKey][option]" />
    <input
      v-if="['caption'].includes(option)"
      type="checkbox"
      :checked="site.htmlElmnts[elKey][option]"
      @change="changeCaption($event.target.checked, option)"
    />
    <input
      v-if="option == 'text-box_image'"
      type="checkbox"
      :checked="site.htmlElmnts[elKey].img && site.htmlElmnts[elKey].img != ''"
      @change="toggleTextBoxImg"
    />
    <!-- color [color] -->
    <input
      v-if="option.includes('color')"
      type="color"
      class="edit-menu-inputs"
      v-model="site.htmlElmnts[elKey].style[option]"
    />
    <!-- mod menu -->
    <select v-if="option == 'links'" v-model="site.htmlElmnts[elKey].mod">
      <option>disable</option>
      <option>pages</option>
      <option>anchors</option>
      <option>links</option>
    </select>
    <input v-if="option == 'text-editor'" type="checkbox" v-model="site.htmlElmnts[elKey].textEditor" />
    <!-- number [unitInputs] -->
    <input
      v-if="unitInputs.includes(option)"
      class="edit-menu-inputs"
      type="number"
      step="0.01"
      :title="option"
      :value="noInput.no"
      @input="site.htmlElmnts[elKey].style[option] = $event.target.value + noInput.unit"
    />
    <select
      v-if="unitInputs.includes(option)"
      style="width: 45px"
      :value="noInput.unit"
      @input="site.htmlElmnts[elKey].style[option] = noInput.no + $event.target.value"
    >
      <option>px</option>
      <option>vh</option>
      <option>vw</option>
      <option>%</option>
    </select>
    <input
      v-if="
        site.htmlElmnts[elKey].style[option] &&
        !['background', 'responsive', 'text-editor', 'vertical-align'].includes(option)
      "
      type="checkbox"
      :checked="site.htmlElmnts[elKey].style[option]"
      @change="deleteStyle($event.target.checked, option)"
    />
    <select v-if="option.includes('paste')" @change="pasteTemplate">
      <option selected disabled>{{ site.htmlElmnts[elKey]?.type.replaceAll('_', ' ') }} style</option>
      <template v-for="[htmlElmntKey, htmlElmntVal] in Object.entries(site.htmlElmnts)">
        <option v-if="htmlElmntVal.type == site.htmlElmnts[elKey].type && htmlElmntKey != elKey" :value="htmlElmntKey">
          {{ htmlElmntKey.replaceAll(htmlElmntVal.type, '').replaceAll('_', ' ') }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Edit menu',

  inject: ['site', 'slctd'],

  props: ['elKey', 'elIndex', 'options'],

  data() {
    return {
      option: this.options[0],
      unitInputs: [
        'border-radius',
        'border-width',
        'column-gap',
        'font-size',
        'height',
        'icon-size',
        'image-height',
        'margin',
        'padding',
        'title-font-size',
        'width',
      ],
    };
  },

  computed: {
    noInput() {
      if (this?.site?.htmlElmnts?.[this.elKey]?.style?.[this.option]) {
        // if option is not a string, convert to string
        if (typeof this.site.htmlElmnts[this.elKey].style[this.option] != 'string')
          this.site.htmlElmnts[this.elKey].style[this.option] = String(
            this.site.htmlElmnts[this.elKey].style[this.option]
          );
        // if unit does not exist, add default px
        if (
          this.site.htmlElmnts[this.elKey].style[this.option].replace(/[^0-9.]/g, '') &&
          !this.site.htmlElmnts[this.elKey].style[this.option].replace(/[0-9.]/g, '')
        )
          this.site.htmlElmnts[this.elKey].style[this.option] =
            this.site.htmlElmnts[this.elKey].style[this.option].replace(/[^0-9.]/g, '') + 'px';
        // if no does not exist, add default 100
        if (
          !this.site.htmlElmnts[this.elKey].style[this.option].replace(/[^0-9.]/g, '') &&
          this.site.htmlElmnts[this.elKey].style[this.option].replace(/[0-9.]/g, '')
        )
          this.site.htmlElmnts[this.elKey].style[this.option] =
            '0' + this.site.htmlElmnts[this.elKey].style[this.option].replace(/[0-9.]/g, '');
      }

      return this.unitInputs.includes(this.option)
        ? {
            no: this?.site?.htmlElmnts?.[this.elKey]?.style?.[this.option]?.replace(/[^0-9.]/g, ''),
            unit: this?.site?.htmlElmnts?.[this.elKey]?.style?.[this.option]?.replace(/[0-9.]/g, ''),
            // no: this?.site?.htmlElmnts?.[this.elKey]?.style?.[this.option]?.replace(/\D/g, ''),
            // unit: this?.site?.htmlElmnts?.[this.elKey]?.style?.[this.option]?.replace(/[0-9]/g, ''),
          }
        : { no: '', unit: '' };
    },
  },

  methods: {
    deleteStyle(event, option) {
      if (!event) delete this.site.htmlElmnts[this.elKey].style[option];
    },
    changeCaption(event, option) {
      if (event) {
        this.site.htmlElmnts[this.elKey] = 'true';
      } else {
        delete this.site.htmlElmnts[this.elKey][option];
        delete this.site.htmlElmnts[this.elKey].style.color;
        delete this.site.htmlElmnts[this.elKey].style['font-size'];
        delete this.site.htmlElmnts[this.elKey].style['text-align'];
      }
    },
    pasteTemplate(event) {
      this.site.htmlElmnts[this.elKey].style = this.site.htmlElmnts[event.target.value].style;
    },
    changeAlign(event, option) {
      const align = option == 'align-content' ? ['flex-start', 'center', 'flex-end'] : ['left', 'center', 'right'];
      let alignPosition = ['left', 'center', 'right'].findIndex((pos) => pos == event.split('-')[2]);
      alignPosition = alignPosition > 1 ? 0 : alignPosition + 1;
      this.site.htmlElmnts[this.elKey].style[option] = align[alignPosition];
    },
    toggleTextBoxImg(event) {
      if (event.target.checked) {
        this.site.htmlElmnts[this.elKey].img = {
          align: 'left',
          src: 'https://api-site.k1pro.net/public/default/logo/missingimage.png',
          width: [200, 250, 300],
          height: [200, 250, 300],
          scale: true,
          scales: [50, 45, 35],
        };
      } else {
        delete this.site.htmlElmnts[this.elKey].img;
      }
    },
  },

  watch: {
    option() {
      console.log(this.option);
      this.$emit('slctdOpt', this.option);
    },
  },
};
</script>

<style>
.edit-menu {
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 6;
  height: 25px;
  opacity: 0.25;
}
.edit-menu:hover {
  opacity: 1;
}
.edit-menu:focus-within {
  opacity: 1;
}
.edit-menu-inputs {
  height: 100%;
  width: 50px;
}
.edit-menu select {
  width: 80px;
}
.edit-menu button,
.edit-menu input:not([type='checkbox']),
.edit-menu select {
  padding: 0px 3px;
  font-size: 12px;
  margin: 0px;
  height: 100%;
}
</style>
