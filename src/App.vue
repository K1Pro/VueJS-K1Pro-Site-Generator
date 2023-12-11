<template>
  <snackbar> </snackbar>

  <template v-if="site?.isValid === true">
    <template v-for="htmlElements in site.params.htmlElements">
      <header><!-- <h2>{{ site.params.site }}</h2> --></header>

      <template v-for="([elKey, elValue], elIndex) in Object.entries(htmlElements)">
        <horizontal_menu :elKey="elKey" :elValue="elValue" :elIndex="elIndex"> </horizontal_menu>
      </template>

      <foot></foot>
    </template>
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
import Horizontal_menu from './components/Horizontal_menu.vue';

export default {
  name: 'App',

  components: {
    Snackbar,
    Horizontal_menu,
    Foot,
  },

  computed: {
    // ...Pinia.mapStores(useSiteStore),
    ...Pinia.mapWritableState(useSiteStore, [
      'accessToken',
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
          setFavicon.setAttribute('href', this.endPts.servrURL + '../protected/' + this.site.site + '/logo/favi.ico');
          document.head.appendChild(setFavicon);
        }
        console.log(getSiteResJSON);
        this.message = getSiteResJSON.messages[0];
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
