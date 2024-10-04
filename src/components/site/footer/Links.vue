<template>
  <div class="links">
    <h2>Links</h2>
    <template v-for="[elmntKey, elmntVal] in Object.entries(site.htmlElmnts[elKey][footKey])">
      <p
        v-if="
          site.htmlElmnts?.[elmntVal[0]] &&
          site.htmlElmnts?.[elmntVal[0]]?.items.includes(elmntVal[1]) &&
          site.htmlElmnts?.[elmntVal[0]]?.links.includes(elmntVal[3])
        "
      >
        <a v-if="elmntVal[2] == 'Page'" :href="endPts.href + '/' + elmntVal[1].toLowerCase()">{{ elmntVal[1] }}</a>
        <a v-else-if="elmntVal[2] == 'Anchor'" :href="endPts.href + '/' + elmntVal[1].toLowerCase()">{{
          elmntVal[1]
        }}</a>
        <a v-else-if="elmntVal[2] == 'Link'" :href="'https://' + elmntVal[3].toLowerCase()" target="_blank">
          {{ elmntVal[1] }}
        </a>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Links',

  inject: ['endPts', 'site'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],
};
</script>

<style>
.links a {
  text-decoration: none;
}
</style>
