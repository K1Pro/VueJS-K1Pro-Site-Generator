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
        console.log(getSiteResJSON);
      } catch (error) {
        console.log(error.toString());
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
