<template>
  <div class="maincomponent">

    <template v-if="siteStore.searchedSite.valid_site === true">
      <h2 v-for="value in siteStore.searchedSite.segments">{{ value }}</h2>
    </template>

    <template v-else-if="siteStore.searchedSite.valid_site === false">
      <h2>Site Directory</h2>
      <h4>Invalid Site</h4>
      <div v-for="value in siteStore.searchedSite.scanned_dirs">
        <a :href="value">{{ value }}</a>
      </div>
    </template>

    <template v-else-if='siteStore.searchedSite.valid_site === "root"'>
      <h2>Site Directory</h2>
      <div v-for="value in siteStore.searchedSite.scanned_dirs">
        <a :href="value">{{ value }}</a>
      </div>
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
