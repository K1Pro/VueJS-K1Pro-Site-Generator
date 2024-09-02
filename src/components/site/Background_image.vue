<template>
  <div ref="backgroundImage" class="background-image" :style="[elImg]">
    <img :src="site.htmlElmnts[elKey]['url']" />
  </div>
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { elImg: { marginTop: '0px' } };
  },
  mounted() {
    this.elImg = { marginTop: '-' + this.$refs.backgroundImage.getBoundingClientRect().y + 'px' };
  },
};
</script>

<style>
.background-image {
  position: relative;
  top: 0;
  height: 75vh;
}
.background-image img {
  object-fit: cover;
  width: 100%;
  height: 75vh;
}
</style>
