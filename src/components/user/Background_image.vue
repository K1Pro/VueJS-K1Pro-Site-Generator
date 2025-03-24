<template>
  <img
    class="background-image"
    :src="
      elValue.url.includes('http://') || elValue.url.includes('https://') ? elValue.url : endPts.imagesURL + elValue.url
    "
  />
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['endPts'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.background-image {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 75vh;
}
</style>
