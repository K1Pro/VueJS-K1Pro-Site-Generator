<template>
  <div :id="elKey" class="image-banner" :style="[style.outline.borderColor, divStyle]">
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="['height', 'object-fit', 'width']"></edit_menu>
    <template v-for="image in elValue.images">
      <img :src="image" alt="image" :style="[imgStyle]" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'Image banner',

  inject: ['endPts', 'grid', 'pexelsReq', 'respWidth', 'site', 'sttngs', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    divStyle() {
      return {
        paddingLeft: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
        paddingRight: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
      };
    },
    imgStyle() {
      return {
        height: this.elValue.style.height ? this.elValue.style.height : 'auto',
        width:
          this.grid.wdth < this.respWidth.xs ? '100%' : this.elValue.style.width ? this.elValue.style.width : 'auto',
        objectFit: this.elValue.style['object-fit'] ? this.elValue.style['object-fit'] : 'initial',
      };
    },
  },
  mounted() {
    if (Array.isArray(this.elValue.style)) this.elValue.style = {};
    if (this.elValue.images.length === 0 && this.site.keywords.length > 0) {
      this.pexelsReq(
        'GET',
        'img/' +
          this.site.keywords[Math.floor(Math.random() * this.site.keywords.length)].toLowerCase().replaceAll(' ', '+')
      ).then((resJSON) => {
        if (resJSON?.data?.photos.length > 1)
          this.elValue.images.push(
            resJSON?.data?.photos[Math.floor(Math.random() * resJSON?.data?.photos.length)]?.src?.large
          );
        console.log(this.endPts.imagesURL);
      });
    }
  },
};
</script>

<style>
.image-banner {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.image-banner img {
  max-width: 100%;
}
</style>
