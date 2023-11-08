<template>
  <div class="helloworld">
    <!-- <h2>{{ siteStore.hostname }}</h2>
    <h2>{{ siteStore.pathname }}</h2> -->

    <h2 v-for="value in siteStore.searchedSite.entire_query">{{ value }}</h2>
    
  </div>
</template>

<script>
export default {
  name: 'Maincomponent',

  data() {
    return {};
  },

  computed: {
    ...Pinia.mapStores(useSiteStore),
  },
};
</script>


</style>
