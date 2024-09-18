<template>
  <div :id="elKey" :class="'spacer spacer_' + elKey" :style="[style.outline.borderColor]">
    <span class="dim" :style="[style.outline.color]"
      >{{ elValue.style.height >= 1 ? elValue.style.height : '1' }}%</span
    >
    <p :style="[spacerHeight]" ref="spacerP"></p>
    <div @mousedown="startResizeSpacer" @mouseup="stopResizeSpacer"></div>
  </div>
</template>

<script>
export default {
  name: 'Spacer',

  inject: ['grid', 'page', 'pageElTypes', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    spacerHeight() {
      return { height: this.elValue.style.height >= 1 ? this.elValue.style.height + 'vh' : '1vh' };
    },
  },

  data() {
    return {
      mouseYCoord: null,
      newSpacerHeight: null,
      startingSpacerHeight: this.site.htmlElmnts[this.elKey].style.height,
      modifyingSpacerHeight: false,
    };
  },
  methods: {
    resizeSpacer(event) {
      if (this.mouseYCoord === null) this.mouseYCoord = event.clientY / this.grid.hght;
      if (window.innerHeight > event.clientY) {
        if ((this.$refs.spacerP.clientHeight / this.grid.hght) * 100 >= 1) {
          const newSpacerHeight = -100 * (this.mouseYCoord - event.clientY / this.grid.hght);
          const numberOfSpacers = this.site.pages[this.page.slctd]
            .slice(0, this.elIndex + 1)
            .filter((page) => page[0] == this.elKey && page[1] == true).length;
          // const numberOfSpacersArray = [];
          // Array.from(document.getElementsByClassName('spacer_' + this.elKey)).forEach((element) => {
          //   if (element.getBoundingClientRect().top >= 0 && element.getBoundingClientRect().bottom <= this.grid.hght) {
          //     numberOfSpacersArray.push(this.elIndex);
          //   }
          // });
          // const numberOfSpacers = numberOfSpacersArray.length;
          console.log(numberOfSpacers);
          this.site.htmlElmnts[this.elKey].style.height =
            Math.round((this.startingSpacerHeight + newSpacerHeight / numberOfSpacers) * 100) / 100;
        } else {
          this.site.htmlElmnts[this.elKey].style.height = 1;
        }
      }
    },
    startResizeSpacer() {
      document.body.classList.add('prevent-select');
      document.body.classList.add('ns-resize');
      this.modifyingSpacerHeight = true;
      document.addEventListener('mousemove', this.resizeSpacer, true);
      document.addEventListener('mouseup', this.stopResizeSpacer, true);
    },
    stopResizeSpacer() {
      this.patchUserSettings ? this.patchUserSettings(this.userSettings) : false;
      this.modifyingSpacerHeight = false;
      this.mouseYCoord = null;
      this.newSpacerHeight = null;
      this.startingSpacerHeight = this.elValue.style.height >= 1 ? this.site.htmlElmnts[this.elKey].style.height : 1;
      document.removeEventListener('mousemove', this.resizeSpacer, true);
      document.removeEventListener('mouseup', this.stopResizeSpacer, true);
      document.body.classList.remove('ns-resize');
      document.body.classList.remove('prevent-select');
    },
  },
  watch: {
    spacerHeight() {
      if (!this.modifyingSpacerHeight) this.startingSpacerHeight = Number(this.spacerHeight.height.replace('vh', ''));
    },
  },
};
</script>

<style>
.spacer {
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
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
