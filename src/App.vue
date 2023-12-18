<template>
  <snackbar> </snackbar>

  <template v-if="site?.isValid === true">
    <template v-if="loggedIn === true">
      <div class="app-container">
        <div class="app-item1">
          <login_side_panel></login_side_panel>
        </div>
        <div class="app-item2" :style="{ backgroundColor: site.params.body.style.backgroundColor }">
          <div :style="{ height: '3vh', padding: '10px', backgroundColor: 'white', borderBottom: '1px solid black' }">
            <b>Inline editor:</b>
          </div>
          <template v-for="(htmlElements, htmlIndex) in site.params.htmlElements">
            <template v-for="([elKey, elValue], elementIndex) in Object.entries(htmlElements)">
              <headline v-if="elKey == 'headline'" :elKey="elKey" :elValue="elValue" :elIndex="htmlIndex"></headline>
              <top_menu v-if="elKey == 'top-menu'" :elKey="elKey" :elValue="elValue" :elIndex="htmlIndex"></top_menu>
              <background_image
                v-if="elKey == 'background-image'"
                :elKey="elKey"
                :elValue="elValue"
                :elIndex="htmlIndex"
              ></background_image>
              <background_video
                v-if="elKey == 'background-video'"
                :elKey="elKey"
                :elValue="elValue"
                :elIndex="htmlIndex"
              ></background_video>
              <icon_slider
                v-if="elKey == 'icon-slider'"
                :elKey="elKey"
                :elValue="elValue"
                :elIndex="htmlIndex"
              ></icon_slider>
            </template>
          </template>
          <foot></foot>
        </div>
      </div>
    </template>
    <template v-else>
      <template v-for="(htmlElements, htmlIndex) in site.params.htmlElements">
        <template v-for="([elKey, elValue], elementIndex) in Object.entries(htmlElements)">
          <headline v-if="elKey == 'headline'" :elKey="elKey" :elValue="elValue" :elIndex="htmlIndex"></headline>
          <top_menu v-if="elKey == 'top-menu'" :elKey="elKey" :elValue="elValue" :elIndex="htmlIndex"></top_menu>
          <background_image
            v-if="elKey == 'background-image'"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></background_image>
          <background_video
            v-if="elKey == 'background-video'"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></background_video>
          <icon_slider
            v-if="elKey == 'icon-slider'"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></icon_slider>
        </template>
      </template>
      <foot></foot>
    </template>
  </template>

  <template v-else-if="site?.isValid === 'root' || site?.isValid === false">
    <directory></directory>
  </template>

  <template v-else> </template>
</template>

<script>
import Snackbar from './components/Snackbar.vue';
import Headline from './components/Headline.vue';
import Foot from './components/Footer.vue';
import Top_menu from './components/Top_menu.vue';
import Background_image from './components/Background_image.vue';
import Background_video from './components/Background_video.vue';
import Icon_slider from './components/Icon_slider.vue';
import Directory from './components/Directory.vue';
import Login_side_panel from './components/login/Login_side_panel.vue';

export default {
  name: 'App',

  components: {
    Snackbar,
    Headline,
    Foot,
    Top_menu,
    Background_image,
    Background_video,
    Icon_slider,
    Directory,
    Login_side_panel,
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

<style>
.app-container {
  display: grid;
  grid-template-columns: 25% 75%;
  /* background-color: #2196f3; */
  /* padding: 2vh; */
  /* column-gap: 2vh; */
  height: 100vh;
}
.app-item1 {
  background-color: rgb(255, 255, 255);
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* padding: 20px; */
  /* text-align: center; */
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.app-item2 {
  /* background-color: rgb(255, 255, 255); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* padding: 20px; */
  /* text-align: center; */
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
