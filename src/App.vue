<template>
  <snackbar> </snackbar>

  <template v-if="site?.isValid === true">
    <header><!-- <h2>{{ site.params.site }}</h2> --></header>
    <body_background v-if="loggedIn === true"></body_background>
    <template v-for="(htmlElements, htmlIndex) in site.params.htmlElements">
      <template v-for="([elKey, elValue], elementIndex) in Object.entries(htmlElements)">
        <horizontal_menu
          v-if="elKey == 'horizontal-menu'"
          :elKey="elKey"
          :elValue="elValue"
          :elIndex="htmlIndex"
        ></horizontal_menu>
        <background_image
          v-if="elKey == 'background-image' && loggedIn === false"
          :elKey="elKey"
          :elValue="elValue"
          :elIndex="htmlIndex"
        ></background_image>
        <background_video
          v-if="elKey == 'background-video' && loggedIn === false"
          :elKey="elKey"
          :elValue="elValue"
          :elIndex="htmlIndex"
        ></background_video>
      </template>
    </template>
    <foot></foot>
  </template>

  <template v-else-if="site?.isValid === false">
    <h2>Site Directory</h2>
    <h4>Invalid Site</h4>
    <div v-for="value in site.scannedDirs">
      <a :href="value">{{ value }}</a>
    </div>
  </template>

  <template v-else-if="site?.isValid === 'root'">
    <h2>Site Directory</h2>
    <div v-for="value in site.scannedDirs">
      <a :href="value" target="_blank">{{ value }}</a>
    </div>
  </template>

  <template v-else> </template>
</template>

<script>
import Snackbar from './components/Snackbar.vue';
import Foot from './components/Footer.vue';
import Body_background from './components/Body_background.vue';
import Horizontal_menu from './components/Horizontal_menu.vue';
import Background_image from './components/Background_image.vue';
import Background_video from './components/Background_video.vue';

export default {
  name: 'App',

  components: {
    Snackbar,
    Body_background,
    Horizontal_menu,
    Background_image,
    Background_video,
    Foot,
  },

  computed: {
    // ...Pinia.mapStores(useSiteStore),
    ...Pinia.mapWritableState(useSiteStore, [
      'accessToken',
      'loggedIn',
      'message',
      'hostname',
      'pathname',
      'site',
      'endPts',
      'getCookie',
      'deleteCookie',
      'onScreenResize',
      'updateScreenWidth',
      'getLoginUser',
    ]),
  },

  methods: {
    async getSite() {
      try {
        console.log(this.endPts.servrURL + this.pathname);
        const response = await fetch(this.endPts.servrURL + this.pathname, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            hostname: window.location.hostname.toLowerCase(),
          }),
        });
        const getSiteResJSON = await response.json();
        if (getSiteResJSON.success) {
          this.site = getSiteResJSON.data;
          Object.keys(getSiteResJSON.data?.params.body.style).forEach((key) => {
            document.body.style[key] = getSiteResJSON.data.params.body.style[key];
          });

          const setFavicon = document.createElement('link');
          setFavicon.setAttribute('rel', 'shortcut icon');
          setFavicon.setAttribute('href', this.endPts.servrURL + this.site.params.icon);
          document.head.appendChild(setFavicon);
        }
        console.log(getSiteResJSON);
        // this.message = getSiteResJSON.messages[0];
      } catch (error) {
        console.log(error.toString());
        this.message = error.toString();
      }
    },
  },

  watch: {},

  created() {
    this.getSite();
    console.log(document.body.style);
    this.getCookie('_a_t', '_s_i');
    if (this.accessToken) {
      this.getLoginUser();
    } else {
      this.deleteCookie();
    }
  },

  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  },
};
</script>

<style></style>
