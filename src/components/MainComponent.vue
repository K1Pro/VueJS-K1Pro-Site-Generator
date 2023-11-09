<template>
  <div class="helloworld">
    <!-- <h2>{{ siteStore.hostname }}</h2>
    <h2>{{ siteStore.pathname }}</h2> -->
    <template v-if="siteStore.searchedSite.valid_site === true">
      <h2 v-for="value in siteStore.searchedSite.entire_query">{{ value }}</h2>
    </template>
    <template v-else-if="siteStore.searchedSite.valid_site === false">
      <h2>Site Directory</h2>
      <h4>Invalid Site</h4>
    </template>
    <template v-else-if='siteStore.searchedSite.valid_site === "root"'>
      <h2>Site Directory</h2>
    </template>
    <template v-else>
      
    </template>

    
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
