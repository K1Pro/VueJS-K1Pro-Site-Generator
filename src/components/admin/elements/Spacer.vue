<template>
  <div
    :id="elKey"
    class="spacer"
    :style="[
      {
        borderWidth: elIndex == 0 ? '3px 3px 3px 3px' : '0px 3px 3px 3px',
      },
      style.outline.borderColor,
    ]"
  >
    <span class="dim" :style="[style.outline.color]">{{ elValue.style.heightPX }}px</span>
    <p :style="[spacerHeight]" ref="spacerP"></p>
    <div @mousedown="startResizeSpacer" @mouseup="stopResizeSpacer"></div>
  </div>
</template>

<script>
export default {
  name: 'Spacer',

  inject: ['grid', 'page', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    spacerHeight() {
      return { height: this.elValue.style.heightPX + 'px' };
    },
  },

  data() {
    return {
      mouseYCoord: null,
      newSpacerHeight: null,
      startingSpacerHeight: this.site.htmlElmnts[this.site.pages[this.page.slctd][this.elIndex][0]].style.heightPX,
    };
  },
  methods: {
    resizeSpacer(event) {
      if (this.mouseYCoord === null) this.mouseYCoord = event.clientY;
      const newSpacerHeight = -1 * (this.mouseYCoord - event.clientY);
      if (window.innerHeight > event.clientY && this.mouseYCoord - this.startingSpacerHeight + 19 < event.clientY) {
        this.site.htmlElmnts[this.site.pages[this.page.slctd][this.elIndex][0]].style.heightPX =
          this.startingSpacerHeight + newSpacerHeight;
        this.site.htmlElmnts[this.site.pages[this.page.slctd][this.elIndex][0]].style.heightVH = Math.round(
          (this.$refs.spacerP.getBoundingClientRect().height / this.grid.hght) * 100
        );
      }
    },
    startResizeSpacer() {
      document.body.classList.add('prevent-select');
      document.body.classList.add('ns-resize');
      document.addEventListener('mousemove', this.resizeSpacer, true);
      document.addEventListener('mouseup', this.stopResizeSpacer, true);
    },
    stopResizeSpacer() {
      this.patchUserSettings ? this.patchUserSettings(this.userSettings) : false;
      this.mouseYCoord = null;
      this.newSpacerHeight = null;
      this.startingSpacerHeight =
        this.site.htmlElmnts[this.site.pages[this.page.slctd][this.elIndex][0]].style.heightPX;
      document.removeEventListener('mousemove', this.resizeSpacer, true);
      document.removeEventListener('mouseup', this.stopResizeSpacer, true);
      document.body.classList.remove('ns-resize');
      document.body.classList.remove('prevent-select');
    },
  },
};
</script>

<style>
.spacer {
  position: relative;
  border-style: dashed;
}
.spacer p {
  padding: 0%;
  margin: 0%;
}
.spacer div {
  position: relative;
  z-index: 5;
  cursor: ns-resize;
  margin-top: -5px;
  height: 5px;
}
</style>
