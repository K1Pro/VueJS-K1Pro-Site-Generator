<template>
  <div :id="elKey" class="headline">
    <span :style="[style.outline.color]" class="dim">{{ elValue.style.textSize }}%</span>
    <input
      :style="[
        {
          fontSize: elValue.style.textSize + 'vh',
        },
        style.outline.borderColor,
      ]"
      ref="headline"
      type="text"
      v-model="site.htmlElmnts[elKey].text"
    />
    <div @mousedown="startResizeInput" @mouseup="stopResizeInput"></div>
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['grid', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      mouseYCoord: null,
      newInputHeight: null,
      startingInputHeightFontSize: this.site.htmlElmnts[this.elKey].style.textSize,
    };
  },
  methods: {
    resizeInput(event) {
      if (this.mouseYCoord === null) this.mouseYCoord = event.clientY / this.grid.hght;
      const newInputHeight = -100 * (this.mouseYCoord - event.clientY / this.grid.hght);
      if (window.innerHeight > event.clientY && this.startingInputHeightFontSize + newInputHeight > 1) {
        this.site.htmlElmnts[this.elKey].style.textSize =
          Math.round((this.startingInputHeightFontSize + newInputHeight) * 100) / 100;
      }
    },
    startResizeInput() {
      document.body.classList.add('prevent-select');
      document.body.classList.add('ns-resize');
      document.addEventListener('mousemove', this.resizeInput, true);
      document.addEventListener('mouseup', this.stopResizeInput, true);
    },
    stopResizeInput() {
      this.patchUserSettings ? this.patchUserSettings(this.sttngs.user) : false;
      this.mouseYCoord = null;
      this.newInputHeight = null;
      this.startingInputHeightFontSize = this.site.htmlElmnts[this.elKey].style.textSize;
      document.removeEventListener('mousemove', this.resizeInput, true);
      document.removeEventListener('mouseup', this.stopResizeInput, true);
      document.body.classList.remove('ns-resize');
      document.body.classList.remove('prevent-select');
    },
  },
};
</script>

<style>
.headline {
  position: relative;
}
.headline input {
  height: 100%;
  width: 100%;
  text-align: center;
  background: transparent;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
  padding: 4vh 0px;
  border: none;
}
/* .headline input:focus {
  outline: none;
} */
.headline div {
  position: relative;
  z-index: 5;
  cursor: ns-resize;
  margin-top: -5px;
  height: 5px;
}
</style>
