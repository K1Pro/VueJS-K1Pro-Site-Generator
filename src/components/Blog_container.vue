<template>
  <template v-for="(htmlElements, htmlIndex) in site.params.htmlElements">
    <template
      v-for="([elKey, elValue], elementIndex) in Object.entries(htmlElements)"
    >
      <top_menu
        v-if="elKey == 'top-menu' && elValue.enabled"
        :elKey="elKey"
        :elValue="elValue"
        :elIndex="htmlIndex"
      ></top_menu> </template
  ></template>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
  <div>Here is your blog</div>
</template>

<script>
import Top_menu from './elements/Top_menu.vue';
export default {
  name: 'Blog Container',

  components: {
    Top_menu,
  },

  computed: {
    // ...Pinia.mapStores(useSiteStore),
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },
};
</script>

<style></style>
