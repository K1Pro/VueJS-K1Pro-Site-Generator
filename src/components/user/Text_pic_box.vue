<template>
  <div class="text-box">
    <template v-if="slctd.hash && Object.values(site.pages[slctd.type])[0][elIndex][2]">
      <a :id="Object.values(site.pages[slctd.type])[0][elIndex][2]"></a>
    </template>

    <div class="text-box-container">
      <img
        v-if="elValue.img || elValue.img == ''"
        class="text-box-img-item"
        :src="
          elValue.img.src.includes('http://') || elValue.img.src.includes('https://')
            ? elValue.img.src
            : endPts.imagesURL + elValue.img.src
        "
        :style="{
          float: elValue.img.align,
          width: elValue.img.scale ? elValue.img.scales[slctdScrn] + '%' : elValue.img.width[slctdScrn] + 'px',
          height: elValue.img.height[slctdScrn] + 'px',
          objectFit: elValue.img.scale ? 'cover' : false,
        }"
      />
      <div class="text-box-txt-item" v-html="elValue.txt"></div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['endPts', 'respWidth', 'site', 'slctd', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    slctdScrn() {
      return this.wndw.wdth > this.respWidth.lg ? 2 : this.wndw.wdth > this.respWidth.md ? 1 : 0;
    },
  },
};
</script>

<style>
.text-box {
  position: relative;
}
.text-box-container {
  width: 100%;
}
.text-box-txt-item {
  padding: 10px;
}
.text-box-img-item {
  padding: 0px 10px 0px 10px;
}
@media only screen and (min-width: 650px) {
  .text-box-container {
    padding: 0px 10%;
  }
}
</style>
