export default {
  name: 'Blog Settings',

  template: /*html*/ `
    <div class="blog-settings">Blog Settings</div>
  `,

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['isValid', 'site']),
  },

  created() {
    this.isValid = 'blog';
  },

  mounted() {
    style(
      'Blog-Settings',
      /*css*/ `
.blog-settings {
  padding: 10px;
}
      `
    );
  },
};
