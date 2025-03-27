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
        elValue.url.includes('http://') || elValue.url.includes('https://')
          ? elValue.url
          : endPts.videosURL + elValue.url
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

  inject: ['endPts', 'grid', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {
    drop(event) {
      this.site.htmlElmnts[this.elKey].url = event.dataTransfer.getData('text');
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
