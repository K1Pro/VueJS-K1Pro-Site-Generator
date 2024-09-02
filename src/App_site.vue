<template>
  <snackbar :msg @deleteMsg="msg = null"></snackbar>
  <template v-for="(pageElmnt, pageIndex) in pages[endPts.frstURLSgmnt ? endPts.frstURLSgmnt : 'home']">
    <component
      :is="site.htmlElmnts[pageElmnt[0]].type"
      v-if="pageElmnt[1]"
      :elKey="pageElmnt[0]"
      :elValue="site.htmlElmnts[pageElmnt[0]]"
      :elIndex="pageIndex"
    ></component>
  </template>
</template>

<script>
export default {
  name: 'App site',

  mixins: [snackbarMixin, wndwWdthHghtMixin],

  data() {
    return {
      respWidth: {
        sm: 576,
        md: 650,
        lg: 992,
        xl: 1140,
      },
      site: params,
      endPts: {
        url: url,
        href: href,
        frstURLSgmnt: first_url_segment,
        siteURL: site_url,
        captchaURL: captcha_url,
        messages: 'messages',
      },
    };
  },

  provide() {
    return {
      site: Vue.computed(() => this.site),
      respWidth: this.respWidth,
      endPts: this.endPts,
    };
  },

  computed: {
    pages() {
      const pagesLowerCase = {};
      Object.entries(params.pages).map(([key, value]) => (pagesLowerCase[key.toLowerCase()] = value));
      return pagesLowerCase;
    },
  },
};
</script>

<style>
.blog-content {
  position: relative;
  padding: 10px;
}
</style>
