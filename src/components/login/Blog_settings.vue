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
    console.log('Blog settings');
    this.isValid = 'blog';
  },
};
</script>

<style>
.blog-settings {
  padding: 10px;
}
</style>
