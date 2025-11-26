<template>
  <video
    class="background-video"
    :style="[elVideo]"
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

  computed: {
    elVideo() {
      return { height: this.elValue.style.height };
    },
  },
};
</script>

<style>
.background-video {
  position: absolute;
  display: block;
  object-fit: cover;
  width: 100%;
}
</style>
