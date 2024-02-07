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
  <blog_menu></blog_menu>
  <div class="blog-content">Here is your blog content</div>
  <subscribe></subscribe>
</template>

<script>
import Top_menu from './elements/Top_menu.vue';
import Blog_menu from './elements/blog/Menu.vue';
import Subscribe from './elements/blog/Subscribe.vue';
export default {
  name: 'Blog Container',

  components: {
    Top_menu,
    Blog_menu,
    Subscribe,
  },

  computed: {
    // ...Pinia.mapStores(useSiteStore),
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },
};
</script>

<style>
.blog-content {
  position: relative;
  padding: 10px;
}
</style>
