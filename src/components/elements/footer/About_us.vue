<template>
  <div class="contact-us">
    <h2 v-if="!loggedIn">Contact Us</h2>
    <div class="footer-contact-container"></div>
  </div>

  <template v-if="siteFooterItem == 'About Us'">
    <h2 v-if="!loggedIn">About Us</h2>
    <p>
      {{ site.params.author }}<br />
      {{ site.params.phone }}<br />
      <a :href="'mailto:' + site.params.email">{{ site.params.email }}</a>
    </p></template
  >
</template>

<script>
export default {
  name: 'About Us',

  components: {
    Login,
    Contact_us,
  },

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {};
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'windowWidth',
      'respWidth',
      'site',
      'content',
      'endPts',
    ]),
  },
};
</script>

<style></style>
