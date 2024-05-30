<template>
  <div class="blog-settings">Blog Settings</div>
</template>

<script>
export default {
  name: 'Blog Settings',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['isValid', 'site']),
  },

  created() {
    this.isValid = 'blog';
  },
};
</script>

<style>
.blog-settings {
  padding: 10px;
}
</style>
