<template>
  <div class="resp-padding">
    <div class="image-banner">
      <template v-for="image in elValue.images">
        <img :src="image" alt="image" :style="[imgStyle]" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Image banner',

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    imgStyle() {
      return {
        height: this.elValue.style.height ? this.elValue.style.height : '250px',
      };
    },
  },
};
</script>

<style>
.image-banner {
  position: relative;
}
.image-banner img {
  object-fit: cover;
  width: 100%;
}
</style>
