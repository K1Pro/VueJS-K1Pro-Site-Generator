<template>
  <div class="legal-links" :style="[style.outline.borderColor, style.primaryColor.backgroundColor]">
    <span v-for="([linkKey, linkVal], linkIndex) in Object.entries(site.htmlElmnts[elKey].links)">
      <input type="checkbox" />{{ linkKey.replaceAll('_', ' ') }}
      {{ Object.entries(site.htmlElmnts[elKey].links).length - 1 !== linkIndex ? ' | ' : '' }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Legal links',

  inject: ['site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],
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
