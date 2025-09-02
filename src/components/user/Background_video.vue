<template>
  <video
    class="background-video"
    :style="{ height: elValue.style.height }"
    :src="
      elValue.src.includes('http://') || elValue.src.includes('https://') ? elValue.src : endPts.videosURL + elValue.src
    "
    muted
    autoplay
    loop
    playsinline
  ></video>
</template>

<script>
export default {
  name: 'Background video',

  inject: ['endPts'],

  props: ['elKey', 'elValue', 'elIndex'],

  created() {
    if (!this.elValue?.style) this.site.htmlElmnts[this.elKey].style = { height: '75vh' };
    if (!this.elValue?.style?.height) this.site.htmlElmnts[this.elKey].style.height = '75vh';
  },
};
</script>

<style>
.background-video {
  position: absolute;
  object-fit: cover;
  width: 100%;
}
</style>
