<template>
  <div class="background-image" :style="[style.outline.borderColor, elDiv]">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <edit_menu
      v-if="slctd.edtMd == 'Individual edit mode' && slctd.indEdtIndx === elIndex"
      :elKey="elKey"
      :elIndex="elIndex"
      :options="defaults.htmlElmnts[elValue.type].info.opts"
    ></edit_menu>
    <img
      :style="[elImg]"
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

  inject: ['defaults', 'endPts', 'grid', 'imagesReq', 'mediaReq', 'slctd', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    elDiv() {
      return {
        height: this.elValue.style.height,
        marginBottom: '-' + this.elValue.style.height,
        outlineStyle:
          this.slctd.edtMd == 'Individual edit mode' && this.slctd.indEdtIndx === this.elIndex ? 'dashed' : 'none',
      };
    },
    elImg() {
      return { height: this.elValue.style.height };
    },
  },

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
};
</script>

<style>
.background-image {
  position: relative;
  min-height: 35px;
  border: none;
  outline-width: 2px;
  outline-offset: -2px;
}
.background-image img {
  display: block;
  object-fit: cover;
  width: 100%;
}
</style>
