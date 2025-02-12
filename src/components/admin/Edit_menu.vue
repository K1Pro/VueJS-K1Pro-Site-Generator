<template>
  <div class="edit-menu">
    <button v-if="options.includes('align')" class="edit-align" title="alignment">
      <i
        class="fa-solid"
        :class="
          site.htmlElmnts[elKey].style.alignment == 'left'
            ? 'fa-align-left'
            : site.htmlElmnts[elKey].style.alignment == 'center'
            ? 'fa-align-center'
            : 'fa-align-right'
        "
        @click="changeAlign($event.target.classList[1])"
      ></i>
    </button>
    <input
      v-if="options.includes('height')"
      class="edit-font-size"
      type="number"
      step="0.01"
      title="height"
      v-model="site.htmlElmnts[elKey].style.height"
    />
  </div>
</template>

<script>
export default {
  name: 'Edit menu',

  inject: ['site'],

  props: ['elKey', 'options'],

  methods: {
    changeAlign(event) {
      const alignment = ['left', 'center', 'right'];
      let alignmentPosition = alignment.findIndex((align) => align == event.split('-')[2]);
      alignmentPosition = alignmentPosition > 1 ? 0 : alignmentPosition + 1;
      this.site.htmlElmnts[this.elKey].style.alignment = alignment[alignmentPosition];
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
.edit-font-size {
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
