<template>
  <img
    class="background-image"
    :style="{ height: elValue.style.height }"
    :src="
      elValue.src.includes('http://') || elValue.src.includes('https://') ? elValue.src : endPts.imagesURL + elValue.src
    "
  />
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['endPts', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  created() {
    if (!this.elValue?.style) this.site.htmlElmnts[this.elKey].style = { height: '75vh' };
    if (!this.elValue?.style?.height) this.site.htmlElmnts[this.elKey].style.height = '75vh';
  },
};
</script>

<style>
.background-image {
  position: absolute;
  object-fit: cover;
  width: 100%;
}
</style>
