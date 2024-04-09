export default {
  name: 'About Us',

  template: /*html*/ `
    <div class="contact-us">
      <h2 v-if="!loggedIn">About Us</h2>
      <p>
        {{ site.params.author }}<br />
        {{ site.params.phone }}<br />
        <a :href="'mailto:' + site.params.email">{{ site.params.email }}</a>
      </p>
    </div>
  `,

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'site']),
  },
};
