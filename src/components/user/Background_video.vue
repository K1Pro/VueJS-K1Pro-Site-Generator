<template>
  <video
    class="background-video"
    :style="{ height: elValue.style.height + 'vh' }"
    :src="
      elValue.url.includes('http://') || elValue.url.includes('https://') ? elValue.url : endPts.videosURL + elValue.url
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
    if (!this.elValue?.style) this.site.htmlElmnts[this.elKey].style = { height: 75 };
    if (!this.elValue?.style?.height) this.site.htmlElmnts[this.elKey].style.height = 75;
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
