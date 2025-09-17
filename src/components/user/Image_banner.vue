<template>
  <div class="resp-padding">
    <div class="image-banner">
      <img :src="endPts.imagesURL + elValue.src" alt="image" :style="[imgStyle]" />
      <div v-if="elValue.caption" :style="[divStyle]">{{ elValue.caption }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Image banner',

  inject: ['endPts', 'respWidth', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    imgStyle() {
      return {
        height: this.elValue.style.height ? this.elValue.style.height : 'auto',
        width: this.elValue.style.width ? this.elValue.style.width : 'auto',
        objectFit: this.elValue.style['object-fit'] ? this.elValue.style['object-fit'] : 'initial',
      };
    },
    divStyle() {
      return {
        color: this.elValue.style.color ? this.elValue.style.color : 'black',
        fontSize:
          !this.elValue.style['font-size'] && !this.site.body.style['font-size']
            ? '12px'
            : !this.elValue.style['font-size'] && this.site.body.style['font-size']
            ? this.site.body.style['font-size']
            : this.elValue.style['font-size'].includes('vw')
            ? this.grid.wdth * (this.elValue.style['font-size']?.replace(/\D/g, '') / 100) + 'px'
            : this.elValue.style['font-size'],
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'left',
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
