<template>
  <div class="background-video" :style="{ height: elValue.style.height, marginBottom: '-' + elValue.style.height }">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <edit_menu
      v-if="slctd.edtMd == 'Individual edit mode'"
      :elKey="elKey"
      :elIndex="elIndex"
      :options="defaults.htmlElmnts[elValue.type].info.opts"
    ></edit_menu>
    <video
      :style="{ height: elValue.style.height }"
      :width="grid.wdth + 'px'"
      :src="
        elValue.src.includes('http://') || elValue.src.includes('https://')
          ? elValue.src
          : endPts.videosURL + elValue.src
      "
      @drop.prevent="drop"
      @dragover.prevent
      @dragenter.prevent
      muted
      autoplay
      loop
      playsinline
    ></video>
  </div>
</template>

<script>
export default {
  name: 'Background video',

  inject: ['defaults', 'endPts', 'grid', 'mediaReq', 'site', 'slctd', 'videosReq'],

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
        this.videosReq('POST', event.dataTransfer.files[0], 'videos/' + slctd.job + '/' + this.elValue.type).then(
          (resJSON) => {
            this.site.htmlElmnts[this.elKey].src = resJSON.data.asset_path;
          }
        );
      } else if (
        (event?.dataTransfer.getData('text').includes('http://') ||
          event?.dataTransfer.getData('text').includes('https://')) &&
        !event?.dataTransfer?.files?.[0]?.name
      ) {
        this.mediaReq('POST', event.dataTransfer.getData('text'), 'videos/' + slctd.job + '/' + this.elValue.type).then(
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
.background-video {
  position: relative;
  min-height: 35px;
  border: none;
  /* outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px; */
}
.background-video video {
  object-fit: cover;
  width: 100%;
}
</style>
