<template>
  <div class="admin-links">
    <input
      v-if="elValue.mod == 'links'"
      type="text"
      placeholder="Link"
      v-model="site.htmlElmnts[elKey][itemKey][itemIndx].link"
      @change="linkKeysDlt(itemIndx, elValue.mod)"
    />
    <!-- 
    <select v-else-if="elValue.mod == 'pages'" v-model="icon.page" @change="linkKeysDlt(iconIndx, elValue.mod)">
      <option disabled selected>Pages</option>
      <template v-for="(siteType, siteTypeIndx) in Object.keys(site.pages)">
        <option value="Choose page" disabled>
          ==={{ siteType.charAt(0).toUpperCase() + siteType.slice(1) }} pages===
        </option>
        <option v-for="sitePage in Object.keys(site.pages[siteType])" :selected="icon.page == sitePage">
          {{ sitePage }}
        </option>
      </template>
    </select>
    <select v-else-if="elValue.mod == 'anchors'" v-model="icon.anchor" @change="linkKeysDlt(iconIndx, elValue.mod)">
      <option disabled selected>Anchors</option>
      <template v-for="siteType in Object.keys(site.pages)">
        <template v-for="[sitePage, sitePageEls] in Object.entries(site.pages[siteType])">
          <template v-for="sitePageEl in sitePageEls">
            <option
              v-if="sitePageEl[1] && sitePageEl[2] && sitePageEl[2] != ''"
              :value="sitePage.toLowerCase() + '#' + sitePageEl[2].toLowerCase()"
            >
              {{ sitePageEl[2] }} ({{ sitePage }})
            </option>
          </template>
        </template>
      </template>
    </select> -->
  </div>
</template>

<script>
export default {
  name: 'Links',

  inject: ['site'],

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
