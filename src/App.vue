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

  methods: {},

  watch: {},

  created() {},
};
</script>

<style></style>
