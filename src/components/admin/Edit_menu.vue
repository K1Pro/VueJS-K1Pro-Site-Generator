<template>
  <div class="edit-menu">
    <select v-model="option">
      <option v-for="option in options" :value="option">
        {{ option.includes('_') ? option.split('_')[1].replaceAll('-', ' ') : option }}
      </option>
    </select>
    <!-- align -->
    <button v-if="option == 'align' && options.includes('align')" title="align">
      <i
        class="fa-solid"
        :class="
          site.htmlElmnts[elKey].style.align == 'left'
            ? 'fa-align-left'
            : site.htmlElmnts[elKey].style.align == 'center'
            ? 'fa-align-center'
            : 'fa-align-right'
        "
        @click="changeAlign($event.target.classList[1])"
      ></i>
    </button>
    <!-- text [anchor, url] -->
    <input
      v-if="option == 'anchor' && options.includes('anchor')"
      type="text"
      title="anchor"
      class="edit-menu-inputs"
      v-model="site.pages[slctd.type][slctd.page][elIndex][2]"
    />
    <input
      v-if="option == 'url' && options.includes('url')"
      type="text"
      title="url"
      class="edit-menu-inputs"
      v-model="site.htmlElmnts[elKey].style.url"
    />
    <!-- checkbox [backgound, responsive, text-box-image]-->
    <input
      v-if="option == 'background' || option == 'responsive'"
      type="checkbox"
      v-model="site.htmlElmnts[elKey].style[option]"
    />
    <input
      v-if="option == 'text-box_image' && options.includes('text-box_image')"
      type="checkbox"
      :checked="site.htmlElmnts[elKey].img && site.htmlElmnts[elKey].img != ''"
      @change="toggleTextBoxImg"
    />
    <!-- color [color] -->
    <input
      v-if="option.includes('color') && options.includes(option)"
      type="color"
      class="edit-menu-inputs"
      v-model="site.htmlElmnts[elKey].style[option]"
    />
    <!-- number [column gap, font-size, height, margin, padding, title-font-size, width ] -->
    <input
      v-if="['column-gap', 'font-size', 'height', 'margin', 'padding', 'title-font-size', 'width'].includes(option)"
      class="edit-menu-inputs"
      type="number"
      step="0.01"
      :title="option"
      v-model="
        site.htmlElmnts[elKey].style[option.replace(/\-[a-z]/g, (match) => match.toUpperCase()).replaceAll('-', '')]
      "
    />
    <select
      v-if="['column-gap', 'font-size', 'height', 'margin', 'padding', 'title-font-size', 'width'].includes(option)"
      v-model="
        site.htmlElmnts[elKey].style[
          option.replace(/\-[a-z]/g, (match) => match.toUpperCase()).replaceAll('-', '') + 'Unit'
        ]
      "
      style="width: 45px"
    >
      <option>px</option>
      <option>vh</option>
      <option>vw</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Edit menu',

  inject: ['site', 'slctd'],

  props: ['elKey', 'elIndex', 'options'],

  data() {
    return { option: this.options[0] };
  },

  methods: {
    changeAlign(event) {
      const align = ['left', 'center', 'right'];
      let alignPosition = align.findIndex((align) => align == event.split('-')[2]);
      alignPosition = alignPosition > 1 ? 0 : alignPosition + 1;
      this.site.htmlElmnts[this.elKey].style.align = align[alignPosition];
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
};
</script>

<style>
.edit-menu {
  position: absolute;
  top: 5px;
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
/* .edit-menu input[type='checkbox'] {
  opacity: 0.25;
}
.edit-menu button:hover,
.edit-menu input:hover,
.edit-menu select:hover,
.edit-menu button:focus,
.edit-menu input:focus,
.edit-menu select:focus {
  opacity: 1;
} */
</style>
