<template>
  <div
    :id="'site_page_el_' + elIndex"
    class="legal-links"
    :style="[style.outline.borderColor, style.primaryColor.backgroundColor]"
  >
    <template v-for="linkKey in Object.keys(site.htmlElmnts[elKey].links)">
      <input type="checkbox" v-model="site.htmlElmnts.legal_links.links[linkKey]" />{{ linkKey.replaceAll('_', ' ') }}
    </template>
  </div>
</template>

<script>
export default {
  name: 'Legal links',

  inject: ['site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { year: fullDateTime.getFullYear() };
  },
};
</script>

<style>
.legal-links {
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
  padding: 10px;
  text-align: center;
}
</style>
