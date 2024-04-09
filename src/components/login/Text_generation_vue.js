export default {
  name: 'Text Generation',

  template: /*html*/ `
    <div class="text-generation">Text Generation</div>
  `,

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },

  mounted() {
    style(
      'Text-Generation',
      /*css*/ `
.text-generation {
  padding: 10px;
}
      `
    );
  },
};
