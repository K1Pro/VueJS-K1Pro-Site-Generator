<template>
  <div class="background-image">
    <img
      :width="grid.wdth + 'px'"
      :src="
        elValue.url.includes('http://') || elValue.url.includes('https://')
          ? elValue.url
          : endPts.imagesURL + elValue.url
      "
      @drop.prevent="drop"
      @dragover.prevent
      @dragenter.prevent
    />
  </div>
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['endPts', 'grid', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {
    drop(event) {
      this.site.htmlElmnts[this.elKey].url = event.dataTransfer.getData('text');
    },
  },
};
</script>

<style>
.background-image {
  position: relative;
  height: 75vh;
  margin-bottom: -75vh;
}
.background-image img {
  object-fit: cover;
  width: 100%;
  height: 75vh;
}
</style>
