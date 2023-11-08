<template>
  <div class="helloworld">
    <!-- <h2>{{ siteStore.hostname }}</h2>
    <h2>{{ siteStore.pathname }}</h2> -->
    <h2>{{ siteStore.site.entire_query[0] ? siteStore.site.entire_query[0] : "Main Directory" }}</h2>
    {{ siteStore.site.entire_query[1] ? siteStore.site.entire_query[1] : '' }}
    
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
