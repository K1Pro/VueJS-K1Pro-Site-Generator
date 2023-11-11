<template>
  <maincomponent></maincomponent>
</template>

<script>
import Maincomponent from './components/MainComponent.vue';

export default {
  name: 'App',

  components: {
    Maincomponent,
  },

  computed: {
    ...Pinia.mapStores(useSiteStore),
    // ...Pinia.mapWritableState(useUserStore, ['accessToken', 'sessionID', 'loggedIn', 'userData', 'endPts']),
  },

  methods: {
    async getSite() {
      try {
        console.log(servrURL + this.siteStore.pathname);
        const response = await fetch(servrURL + this.siteStore.pathname, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            hostname: window.location.hostname.toLowerCase(),
          }),
        });
        const getSiteResJSON = await response.json();
        if (getSiteResJSON.success) {
          this.siteStore.searchedSite = getSiteResJSON.data;
          let head = document.getElementsByTagName('HEAD')[0];
          let link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = servrURL + '../protected/' + getSiteResJSON.data.site + '/body.css';
          head.appendChild(link);
        }
        console.log(getSiteResJSON);
        this.siteStore.message = getSiteResJSON.messages[0];
      } catch (error) {
        console.log(error.toString());
        this.siteStore.message = error.toString();
      }
    },
  },

  watch: {},

  created() {
    this.getSite();
  },
};
</script>

<style></style>
