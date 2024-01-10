<template>
  <option
    v-for="menuOptions in Object.keys(site.params.htmlElements[selectIndex][selectKey]['style'])"
    :value="menuOptions"
  >
    {{ menuOptions.charAt(0).toUpperCase()
    }}{{
      menuOptions
        .slice(1)
        .replaceAll('-', ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
    }}
  </option>
</template>

<script>
export default {
  name: 'Element Select',

  props: ['selectKey', 'selectIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },
};
</script>

<style></style>
