<template>
  <div class="admin-links">
    <select
      v-if="elValue.mod == 'pages'"
      v-model="site.htmlElmnts[elKey][itemKey][itemIndx].page"
      @change="linkKeysDlt(itemIndx, elValue.mod)"
    >
      <option disabled selected>Pages</option>
      <option
        v-for="sitePage in Object.keys(site.pages[slctd.type])"
        :selected="site.htmlElmnts[elKey][itemKey][itemIndx].page == sitePage"
      >
        {{ sitePage }}
      </option>
    </select>
    <select
      v-else-if="elValue.mod == 'anchors'"
      v-model="site.htmlElmnts[elKey][itemKey][itemIndx].anchor"
      @change="linkKeysDlt(itemIndx, elValue.mod)"
    >
      <option disabled selected>Anchors</option>
      <template v-for="[sitePage, sitePageEls] in Object.entries(site.pages[slctd.type])">
        <template v-for="sitePageEl in sitePageEls">
          <option
            v-if="sitePageEl[1] && sitePageEl[2] && sitePageEl[2] != ''"
            :value="sitePage.toLowerCase() + '#' + sitePageEl[2].toLowerCase()"
          >
            {{ sitePageEl[2] }} ({{ sitePage }})
          </option>
        </template>
      </template>
    </select>
    <select v-else-if="elValue.mod == 'disable'">
      <option disabled selected>Disabled</option>
      <option>true</option>
      <option>false</option>
    </select>
    <input
      v-else
      type="text"
      placeholder="Link"
      v-model="site.htmlElmnts[elKey][itemKey][itemIndx].link"
      @change="linkKeysDlt(itemIndx, elValue.mod)"
    />
  </div>
</template>

<script>
export default {
  name: 'Links',

  inject: ['slctd', 'site'],

  props: ['elKey', 'elValue', 'elIndex', 'itemKey', 'itemVal', 'itemIndx'],

  methods: {
    linkKeysDlt(itemIndx, linkTp) {
      let slctdLinkTps = ['link', 'page', 'anchor'].filter((linkType) => linkType != linkTp?.slice(0, -1));
      slctdLinkTps.forEach((linkType) => {
        if (this.site.htmlElmnts?.[this.elKey]?.[this.itemKey]?.[itemIndx]?.[linkType])
          delete this.site.htmlElmnts[this.elKey][this.itemKey][itemIndx][linkType];
      });
    },
  },
};
</script>

<style>
.links {
}
</style>
