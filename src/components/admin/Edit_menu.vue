<template>
  <div class="edit-menu">
    <select v-model="option">
      <option v-for="option in options" :value="option">
        {{ option.includes('_') ? option.split('_')[1].replaceAll('-', ' ') : option }}
      </option>
    </select>
    <!-- align -->
    <button
      v-if="option == 'justify-content' || (JSON.stringify(option).includes('align') && option != 'vertical-align')"
      :title="option"
    >
      <i
        class="fa-solid"
        :class="
          ['left', 'flex-start'].includes(site.htmlElmnts[elKey].style[option])
            ? 'fa-align-left'
            : ['center'].includes(site.htmlElmnts[elKey].style[option])
            ? 'fa-align-center'
            : ['right', 'flex-end'].includes(site.htmlElmnts[elKey].style[option])
            ? 'fa-align-right'
            : 'fa-align-justify'
        "
        @click="changeAlign($event.target.classList[1], option)"
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
    <!-- checkbox [backgound, responsive, text-box-image, vertical-align]-->
    <input
      v-if="option == 'background' || option == 'responsive' || option == 'vertical-align'"
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
      v-model="site.htmlElmnts[elKey].style[option]"
    />
    <select
      v-if="['column-gap', 'font-size', 'height', 'margin', 'padding', 'title-font-size', 'width'].includes(option)"
      v-model="site.htmlElmnts[elKey].style[option + '-unit']"
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
    changeAlign(event, option) {
      const align =
        option == 'justify-content' ? ['flex-start', 'center', 'flex-end', false] : ['left', 'center', 'right', false];
      let alignPosition = ['left', 'center', 'right', false].findIndex((pos) => pos == event.split('-')[2]);
      alignPosition = alignPosition > 2 ? 0 : alignPosition + 1;
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
</style>
