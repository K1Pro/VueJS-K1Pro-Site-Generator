<template>
  <div
    :id="'site_page_el_' + elIndex"
    class="background-image"
    :style="{ height: elValue.style.height, marginBottom: '-' + elValue.style.height }"
  >
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="['height']"></edit_menu>
    <img
      :style="{ height: elValue.style.height }"
      :width="grid.wdth + 'px'"
      :src="
        elValue.src.includes('http://') || elValue.src.includes('https://')
          ? elValue.src
          : endPts.imagesURL + elValue.src
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

  inject: ['endPts', 'grid', 'imagesReq', 'mediaReq', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {
    drop() {
      if (
        event?.dataTransfer.getData('text') &&
        !event?.dataTransfer.getData('text').includes('http://') &&
        !event?.dataTransfer.getData('text').includes('https://')
      ) {
        this.site.htmlElmnts[this.elKey].src = event.dataTransfer.getData('text');
      } else if (event?.dataTransfer?.files?.[0]?.name) {
        this.imagesReq('POST', event.dataTransfer.files[0], 'images/' + slctd.job + '/' + this.elValue.type).then(
          (resJSON) => {
            this.site.htmlElmnts[this.elKey].src = resJSON.data.asset_path;
          }
        );
      } else if (
        (event?.dataTransfer.getData('text').includes('http://') ||
          event?.dataTransfer.getData('text').includes('https://')) &&
        !event?.dataTransfer?.files?.[0]?.name
      ) {
        this.mediaReq('POST', event.dataTransfer.getData('text'), 'images/' + slctd.job + '/' + this.elValue.type).then(
          (resJSON) => {
            this.site.htmlElmnts[this.elKey].src = resJSON.data.asset_path;
          }
        );
      } else {
        console.log('error');
      }
    },
  },

  created() {
    if (!this.elValue?.style) this.site.htmlElmnts[this.elKey].style = { height: '75vh' };
    if (!this.elValue?.style?.height) this.site.htmlElmnts[this.elKey].style.height = '75vh';
  },
};
</script>

<style>
.background-image {
  position: relative;
}
.background-image img {
  object-fit: cover;
  width: 100%;
}
</style>
