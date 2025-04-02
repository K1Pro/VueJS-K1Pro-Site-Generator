<template>
  <div
    class="background-video"
    :style="{ height: elValue.style.height + 'vh', marginBottom: '-' + elValue.style.height + 'vh' }"
  >
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="['height']"></edit_menu>
    <video
      :style="{ height: elValue.style.height + 'vh' }"
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

  inject: ['endPts', 'grid', 'mediaReq', 'site'],

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
        // this.imagesReq('POST', event.dataTransfer.files[0]).then((resJSON) => {
        //   this.site.htmlElmnts[this.elKey].cards[itemIndex].img = resJSON.data.file_name;
        // });
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

  created() {
    if (!this.elValue?.style) this.site.htmlElmnts[this.elKey].style = { height: 75 };
    if (!this.elValue?.style?.height) this.site.htmlElmnts[this.elKey].style.height = 75;
  },
};
</script>

<style>
.background-video {
  position: relative;
}
.background-video video {
  object-fit: cover;
  width: 100%;
}
</style>
