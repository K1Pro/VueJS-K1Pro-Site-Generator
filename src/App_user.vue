<template>
  <snackbar :msg @deleteMsg="msg = null"></snackbar>
  <template
    v-for="(pageElmnt, pageIndex) in pages[
      slctd.first_url_segment ? slctd.first_url_segment : site.defaultPage[slctd.type]
    ]"
  >
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
        xs: 400,
        sm: 576,
        md: 650,
        lg: 992,
        xl: 1140,
      },
      site: site,
      slctd: slctd,
      endPts: {
        appApiUrl: app_api_url,
        captchaURL: api_path.captcha,
      },
    };
  },

  provide() {
    return {
      endPts: this.endPts,
      respWidth: this.respWidth,
      site: this.site,
      slctd: this.slctd,
      style: this.style,
    };
  },

  computed: {
    pages() {
      const pagesLowerCase = {};
      Object.entries(site.pages[this.slctd.type]).map(([key, value]) => (pagesLowerCase[key.toLowerCase()] = value));
      return pagesLowerCase;
    },
    style() {
      return {
        primaryColor: { backgroundColor: this.site.body.style.primaryColor },
      };
    },
  },
};
</script>

<style>
.blog-content {
  position: relative;
  padding: 10px;
}
.validation-message {
  color: red;
  height: 3vh;
  line-height: 3vh;
  font-size: 2vh;
  background-color: white;
  font-weight: bold;
  text-align: left;
  padding-left: 5px;
}
</style>
