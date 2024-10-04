<template>
  <div class="legal-links" :style="[style.primaryColor]">
    <template v-for="([linkKey, linkVal], linkIndex) in Object.entries(site.htmlElmnts[elKey].links)">
      <a :href="endPts.href + '/' + linkKey.replaceAll('_', '').toLowerCase()">
        {{ linkKey.replaceAll('_', ' ') }}
      </a>
      {{ Object.entries(site.htmlElmnts[elKey].links).length - 1 !== linkIndex ? ' | ' : '' }}
    </template>
  </div>
</template>

<script>
export default {
  name: 'Legal links',

  inject: ['endPts', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.legal-links {
  text-align: center;
  padding: 30px;
}
.legal-links a {
  text-decoration: none;
}
</style>
