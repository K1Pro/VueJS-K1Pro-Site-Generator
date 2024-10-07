<template>
  <div class="legal">
    <top_menu elKey="top_menu" :elValue="site.htmlElmnts.top_menu" elIndex="0"></top_menu>
    <div class="legal-content" v-for="legalInfo in legal">
      <div
        v-html="
          legalInfo
            .replaceAll('__href__', domain.replaceAll('_', '.'))
            .replaceAll('__name__', name)
            .replaceAll('__email__', site.email.toLowerCase())
        "
      ></div>
    </div>
    <foot
      v-if="JSON.stringify(site.pages.Home).includes(JSON.stringify(['footer', true]))"
      elKey="footer"
      :elValue="null"
      elIndex="1"
    ></foot>
    <legal_links
      v-if="JSON.stringify(site.pages.Home).includes(JSON.stringify(['legal_links', true]))"
      elKey="legal_links"
      :elValue="null"
      elIndex="2"
    ></legal_links>
  </div>
</template>

<script>
export default {
  name: 'App copyright',

  mixins: [wndwWdthHghtMixin],

  data() {
    return {
      respWidth: {
        sm: 576,
        md: 650,
        lg: 992,
        xl: 1140,
      },
      site: params,
      domain: add_auth,
      legal: legal,
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
      endPts: this.endPts,
      respWidth: this.respWidth,
      site: Vue.computed(() => this.site),
      style: Vue.computed(() => this.style),
    };
  },

  computed: {
    style() {
      return {
        primaryColor: { backgroundColor: this.site.body.style.primaryColor },
      };
    },
    name() {
      return this.site.business ? this.site.business : this.site.author;
    },
    // pageElTypes() {
    //   const pageElTypesArray = [];

    //   //

    //   for (const [pageKey, pageVal] of Object.entries(this.site.htmlElmnts)) {
    //     pageElTypesArray.push(pageVal.type);
    //   }
    //   return pageElTypesArray;
    // },
  },

  mounted() {
    console.log(this.endPts.frstURLSgmnt);
  },
};
</script>

<style>
.legal-content {
  padding: 0px 10%;
}
</style>
