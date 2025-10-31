<template>
  <div class="legal-links" :style="[style.outline.borderColor, style.primaryColor.backgroundColor]">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <div class="legal-links-cntnr">
      <template v-for="linkKey in Object.keys(site.htmlElmnts[elKey].links)">
        <input type="checkbox" v-model="site.htmlElmnts.legal_links.links[linkKey]" />{{ linkKey.replaceAll('_', ' ') }}
      </template>
    </div>
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
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;

  text-align: center;
}
.legal-links-cntnr {
  padding: 10px;
}
</style>
