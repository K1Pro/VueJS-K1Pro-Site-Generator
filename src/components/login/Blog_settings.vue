<template>
  <div class="blog-settings">Blog Settings</div>
</template>

<script>
export default {
  name: 'Blog Settings',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },

  created() {
    console.log('Blog settings');
    this.site.isValid = 'blog';
  },
};
</script>

<style>
.blog-settings {
  padding: 10px;
}
</style>
