<template>
  <div class="admin-links">
    <select v-if="elValue.mod == 'pages'" @change="linkKeysDlt($event, itemIndx, elValue.mod)">
      <option disabled selected>Pages</option>
      <option v-for="sitePage in Object.keys(site.pages[slctd.type])" :selected="itemVal.page == sitePage">
        {{ sitePage }}
      </option>
    </select>
    <select v-else-if="elValue.mod == 'anchors'" @change="linkKeysDlt($event, itemIndx, elValue.mod)">
      <option disabled selected>Anchors</option>
      <template v-for="[sitePage, sitePageEls] in Object.entries(site.pages[slctd.type])">
        <template v-for="sitePageEl in sitePageEls">
          <option
            v-if="sitePageEl[1] && sitePageEl[2] && sitePageEl[2] != ''"
            :selected="itemVal.anchor == sitePage.toLowerCase() + '#' + sitePageEl[2].toLowerCase()"
            :value="sitePage.toLowerCase() + '#' + sitePageEl[2].toLowerCase()"
          >
            {{ sitePageEl[2] }} ({{ sitePage }})
          </option>
        </template>
      </template>
    </select>
    <select v-else-if="elValue.mod == 'disabled'" @change="linkKeysDlt($event, itemIndx, elValue.mod)">
      <option v-if="!itemVal.disable" disabled selected>Enabled</option>
      <option value="true" :selected="itemVal.disable">Disabled</option>
    </select>
    <input
      v-else
      type="text"
      placeholder="Link"
      :value="itemVal.link"
      @change="linkKeysDlt($event, itemIndx, elValue.mod)"
    />
  </div>
</template>

<script>
export default {
  name: 'Links',

  inject: ['slctd', 'site'],

  props: ['elKey', 'elValue', 'elIndex', 'itemVal', 'itemIndx'],

  methods: {
    linkKeysDlt(event, itemIndx, linkTp) {
      this.site.htmlElmnts[this.elKey].items[itemIndx][linkTp?.slice(0, -1)] = event.target.value;
      let slctdLinkTps = ['disable', 'link', 'page', 'anchor'].filter((linkType) => linkType != linkTp?.slice(0, -1));
      slctdLinkTps.forEach((linkType) => {
        if (this.site.htmlElmnts?.[this.elKey]?.items?.[itemIndx]?.[linkType])
          delete this.site.htmlElmnts[this.elKey].items[itemIndx][linkType];
      });
    },
  },
};
</script>

<style>
.links {
}
</style>
