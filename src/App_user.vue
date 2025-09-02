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
        email: api_path.email,
        imagesURL: (slctd.is_valid_first_url_segment ? '../' : '') + 'src/assets/images/' + slctd.job + '/',
        videosURL: (slctd.is_valid_first_url_segment ? '../' : '') + 'src/assets/videos/' + slctd.job + '/',
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
      // methods
      emailReq: this.emailReq,
    };
  },

  methods: {
    async emailReq(METHOD, captchaDate, captcha, emailBody) {
      try {
        const response = await fetch(this.endPts.email + captchaDate + '/' + captcha, {
          method: METHOD,
          headers: {
            Authorization: btoa(site.email),
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify(emailBody),
        });
        const resJSON = await response.json();
        return resJSON;
      } catch (error) {
        console.log(error.toString());
      }
    },
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
.resp-padding {
  padding-left: 5px;
  padding-right: 5px;
}
.scroller {
  width: 100%;
  border: none;
  background: none;
}
@media only screen and (min-width: 400px) {
  .resp-padding {
    padding-left: 5%;
    padding-right: 5%;
  }
}
@media only screen and (min-width: 650px) {
  .resp-padding {
    padding-left: 10%;
    padding-right: 10%;
  }
}
@media only screen and (min-width: 992px) {
  .resp-padding {
    padding-left: 15%;
    padding-right: 15%;
  }
}
@media only screen and (min-width: 1200px) {
  .resp-padding {
    padding-left: 17.5%;
    padding-right: 17.5%;
  }
}
@media only screen and (min-width: 1400px) {
  .resp-padding {
    padding-left: 20%;
    padding-right: 20%;
  }
}
@media only screen and (min-width: 1600px) {
  .resp-padding {
    padding-left: 22.5%;
    padding-right: 22.5%;
  }
}
</style>
