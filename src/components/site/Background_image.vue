<template>
  <img class="background-image" :src="site.htmlElmnts[elKey]['url']" />
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.background-image {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 75vh;
}
</style>
