<template>
  <div class="links">
    <h2>Links</h2>
    <template v-for="(link, linkIndex) in site.htmlElmnts[elKey][footKey].links">
      <p>
        <a
          v-if="link == 'Page'"
          :href="slctd.href + '/' + site.htmlElmnts[elKey][footKey].items[linkIndex].toLowerCase()"
          >{{ site.htmlElmnts[elKey][footKey].items[linkIndex] }}</a
        >
        <a v-else-if="link.includes('#')" :href="slctd.href + '/' + link.toLowerCase()">{{
          site.htmlElmnts[elKey][footKey].items[linkIndex]
        }}</a>
        <a v-else-if="link.includes('http://') || link.includes('https://')" :href="link.toLowerCase()" target="_blank">
          {{ site.htmlElmnts[elKey][footKey].items[linkIndex] }}
        </a>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Links',

  inject: ['endPts', 'site', 'slctd'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],
};
</script>

<style>
.links a {
  text-decoration: none;
}
</style>
