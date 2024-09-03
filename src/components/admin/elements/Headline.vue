<template>
  <div class="headline">
    <span class="dimensions">{{ elValue.style.textSize }}px</span>
    <input
      :style="{
        fontSize: elValue.style.textSize + 'px',
        borderWidth: elIndex == 0 ? '3px 3px 3px 3px' : '0px 3px 3px 3px',
      }"
      type="text"
      v-model="site.htmlElmnts[elKey].text"
    />
    <div @mousedown="startResizeInput" @mouseup="stopResizeInput"></div>
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['site'],

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
      if (this.mouseYCoord === null) this.mouseYCoord = event.clientY;
      const newInputHeight = -1 * (this.mouseYCoord - event.clientY);
      if (window.innerHeight > event.clientY && this.mouseYCoord - this.startingInputHeightFontSize + 7 < event.clientY)
        this.site.htmlElmnts[this.elKey].style.textSize = this.startingInputHeightFontSize + newInputHeight;
    },
    startResizeInput() {
      document.body.classList.add('prevent-select');
      document.body.classList.add('ns-resize');
      document.addEventListener('mousemove', this.resizeInput, true);
      document.addEventListener('mouseup', this.stopResizeInput, true);
    },
    stopResizeInput() {
      this.patchUserSettings ? this.patchUserSettings(this.userSettings) : false;
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
  border-style: dashed;
  padding: 30px 0px;
}
.headline input:focus {
  outline: none;
}
.headline div {
  position: relative;
  z-index: 5;
  cursor: ns-resize;
  margin-top: -5px;
  height: 5px;
}
</style>
