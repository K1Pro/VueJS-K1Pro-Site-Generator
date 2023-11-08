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
        const response = await fetch(servrURL + this.siteStore.pathname, {
          method: 'GET',
        });
        const getSiteResJSON = await response.json();
        if (getSiteResJSON.success) {
          this.siteStore.searchedSite = getSiteResJSON.data;
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
