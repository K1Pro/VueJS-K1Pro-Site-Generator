<template>
  <div class="resp-padding">
    <div class="image-banner">
      <template v-for="image in elValue.images">
        <img :src="image" alt="image" :style="[imgStyle]" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Image banner',

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    imgStyle() {
      return {
        height: this.elValue.style.height ? this.elValue.style.height : 'auto',
        width: this.elValue.style.width ? this.elValue.style.width : 'auto',
        objectFit: this.elValue.style['object-fit'] ? this.elValue.style['object-fit'] : 'initial',
      };
    },
  },
};
</script>

<style>
.image-banner {
  position: relative;
}
.image-banner img {
  max-width: 100%;
}

@media only screen and (max-width: 400px) {
  .image-banner img {
    min-width: 100%;
  }
}
</style>
