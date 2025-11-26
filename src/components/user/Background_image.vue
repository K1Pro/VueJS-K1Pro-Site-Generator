<template>
  <img
    class="background-image"
    :style="[elImg]"
    :src="
      elValue.src.includes('http://') || elValue.src.includes('https://') ? elValue.src : endPts.imagesURL + elValue.src
    "
  />
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['endPts'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    elImg() {
      return { height: this.elValue.style.height };
    },
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
