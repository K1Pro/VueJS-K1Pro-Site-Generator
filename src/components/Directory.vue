<template>
  <div class="directory">
    <div class="directory-item1">
      <h2>K1Pro Website Directory</h2>
    </div>
    <div class="directory-item2">
      <input type="search" id="site-search" name="search" placeholder="Search for a site..." />
    </div>
    <div class="directory-item3">
      <template v-for="value in site.scannedDirs">
        <div>
          <a :href="value" target="_blank">{{ value }}</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Directory',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site', 'message']),
  },

  created() {
    if (this.site?.isValid === false) {
      this.message = 'Invalid site';
    }
  },
};
//https://cssgrid-generator.netlify.app/
</script>

<style>
.directory {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 25vh repeat(2, 10vh) auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  /* min-height: 100vh; */
}

.directory-item1 {
  grid-area: 2 / 2 / 3 / 3;
  text-align: center;
}
.directory-item2 {
  grid-area: 3 / 2 / 4 / 3;
  text-align: center;
}
.directory-item3 {
  grid-area: 4 / 1 / 6 / 4;
  text-align: center;
}

.directory input[type='search'] {
  width: 100%;
  padding: 15px;
  border-radius: 25px;
}
</style>
