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
    <!-- anchor -->
    <input
      v-if="option == 'anchor' && options.includes('anchor')"
      type="text"
      v-model="site.pages[slctd.type][slctd.page][elIndex][2]"
      class="edit-height"
    />
    <!-- column gap -->
    <input
      v-if="option == 'column-gap' && options.includes('column-gap')"
      class="edit-height"
      type="number"
      step="0.01"
      title="column gap"
      v-model="site.htmlElmnts[elKey].style.columnGap"
    />
    <!-- font-size -->
    <input
      v-if="option == 'font-size' && options.includes('font-size')"
      class="edit-height"
      type="number"
      step="0.01"
      title="font size"
      v-model="site.htmlElmnts[elKey].style.fontSize"
    />
    <!-- font-size -->
    <input
      v-if="option == 'title-font-size' && options.includes('title-font-size')"
      class="edit-height"
      type="number"
      step="1"
      title="title font size"
      v-model="site.htmlElmnts[elKey].style.titleFontSize"
    />
    <!-- grid-template-columns -->
    <input
      v-if="option == 'grid-template-columns' && options.includes('grid-template-columns')"
      class="edit-height"
      type="number"
      title="columns"
      v-model="site.htmlElmnts[elKey].style.gridTemplateColumns"
    />
    <!-- height -->
    <input
      v-if="option == 'height' && options.includes('height')"
      class="edit-height"
      type="number"
      step="0.01"
      title="height"
      v-model="site.htmlElmnts[elKey].style.height"
    />
    <!-- padding -->
    <input
      v-if="option == 'padding' && options.includes('padding')"
      class="edit-height"
      type="number"
      step="0.01"
      title="padding"
      v-model="site.htmlElmnts[elKey].style.padding"
    />
    <!-- responsive -->
    <input type="checkbox" v-if="option == 'responsive'" v-model="site.htmlElmnts[elKey].style.responsive" />
    <!-- text-box_image -->
    <input
      type="checkbox"
      v-if="option == 'text-box_image' && options.includes('text-box_image')"
      :checked="site.htmlElmnts[elKey].img && site.htmlElmnts[elKey].img != ''"
      @change="toggleTextBoxImg"
    />
    <!-- width -->
    <input
      v-if="option == 'width' && options.includes('width')"
      class="edit-height"
      type="number"
      step="0.01"
      title="width"
      v-model="site.htmlElmnts[elKey].style.width"
    />
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
}
.edit-height {
  width: 50px;
}
.edit-menu select {
  width: 80px;
}
.edit-menu button,
.edit-menu input,
.edit-menu select {
  padding: 0px 3px;
  font-size: 12px;
  margin: 0px;
  opacity: 0.25;
  /* height: 100%; */
}
.edit-menu button:hover,
.edit-menu input:hover,
.edit-menu select:hover,
.edit-menu button:focus,
.edit-menu input:focus,
.edit-menu select:focus {
  opacity: 1;
}
</style>
