<template>
  <div class="edit-menu">
    <!-- align -->
    <button v-if="options.includes('align')" class="edit-align" title="align">
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
      v-if="options.includes('anchor')"
      type="text"
      v-model="site.pages[slctd.type][slctd.page][elIndex][2]"
      class="edit-height"
    />
    <!-- font-size -->
    <input
      v-if="options.includes('font-size')"
      class="edit-height"
      type="number"
      step="0.01"
      title="height"
      v-model="site.htmlElmnts[elKey].style.fontSize"
    />
    <!-- grid-template-columns -->
    <input
      v-if="options.includes('grid-template-columns')"
      class="edit-height"
      type="number"
      title="columns"
      v-model="site.htmlElmnts[elKey].style.gridTemplateColumns"
    />
    <!-- height -->
    <input
      v-if="options.includes('height')"
      class="edit-height"
      type="number"
      step="0.01"
      title="height"
      v-model="site.htmlElmnts[elKey].style.height"
    />
    <!-- padding -->
    <input
      v-if="options.includes('padding')"
      class="edit-height"
      type="number"
      step="0.01"
      title="padding"
      v-model="site.htmlElmnts[elKey].style.padding"
    />
  </div>
</template>

<script>
export default {
  name: 'Edit menu',

  inject: ['site', 'slctd'],

  props: ['elKey', 'elIndex', 'options'],

  methods: {
    changeAlign(event) {
      const align = ['left', 'center', 'right'];
      let alignPosition = align.findIndex((align) => align == event.split('-')[2]);
      alignPosition = alignPosition > 1 ? 0 : alignPosition + 1;
      this.site.htmlElmnts[this.elKey].style.align = align[alignPosition];
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
.edit-menu button,
.edit-menu input {
  padding: 0px 3px;
  font-size: 12px;
  margin: 0px;
  opacity: 0.25;
  height: 100%;
}
.edit-menu button:hover,
.edit-menu input:hover,
.edit-menu button:focus,
.edit-menu input:focus {
  opacity: 1;
}
</style>
