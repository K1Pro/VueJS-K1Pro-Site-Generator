<template>
  <snackbar> </snackbar>

  <template v-if="site?.isValid === true">
    <template v-if="loggedIn === true">
      <div class="app-container">
        <div class="app-item1">
          <login_side_panel></login_side_panel>
        </div>
        <div class="app-item2" :style="{ backgroundColor: site.params.body.style.backgroundColor }">
          <div class="inline-editor-container">
            <div class="inline-editor-title">
              <b>Inline editor:</b> <button type="button">Apply</button>&nbsp;
              <button type="button" @click.prevent="patchParams">Update</button>&nbsp;
              <button type="button" @click.prevent="getSite">Reset</button>&nbsp;
            </div>
          </div>
          <div class="inline-editor">
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
      'urlQuery',
      'loggedIn',
      'message',
      'hostname',
      'pathname',
      'site',
      'endPts',
      'getSite',
      'getCookie',
      'deleteCookie',
      'onScreenResize',
      'updateScreenWidth',
      'getLoginUser',
    ]),
  },

  methods: {
    async patchParams() {
      try {
        const response = await fetch(this.endPts.servrURL + this.endPts.params, {
          method: 'PATCH',
          headers: {
            Authorization: this.accessToken,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            site: this.site.site,
            params: this.site.params,
          }),
        });
        const patchParamsJSON = await response.json();
        if (patchParamsJSON.success) {
          console.log(patchParamsJSON);
          this.message = patchParamsJSON.messages[0];
        }
      } catch (error) {
        console.log(error.toString());
        this.message = error.toString();
      }
    },
  },

  watch: {},

  created() {
    const loaderElement = document.getElementById('loader-container');
    loaderElement.remove();
    // const searchParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.has('token'));
    // console.log(new URLSearchParams(window.location.search).get('token'));
    this.getSite();
    if (!this.urlQuery.has('email') && !this.urlQuery.has('token')) this.getCookie('_a_t', '_s_i');
    if (this.accessToken) {
      this.getLoginUser();
      console.log('logging in');
    } else {
      this.deleteCookie();
      console.log('deleting cookie');
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
  grid-template-columns: 100%;
  /* background-color: #2196f3; */
  /* padding: 2vh; */
  /* column-gap: 2vh; */
}
.app-item1 {
  background-color: rgb(255, 255, 255);
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* padding: 20px; */
  /* text-align: center; */
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}

.app-item2 {
  /* background-color: rgb(255, 255, 255); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* padding: 20px; */
  /* text-align: center; */
  height: 100%;
  /* overflow: hidden; */
}

.inline-editor-container {
  display: table;
  height: 6vh;
  width: 100%;
  background-color: white;
  /* border-bottom: 1px solid black; */
}

.inline-editor-title {
  display: table-cell;
  padding-left: 10px;
  vertical-align: middle;
}

.inline-editor {
  height: 94vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

@media only screen and (min-width: 650px) {
  .app-container {
    grid-template-columns: 25% 75%;
    height: 100vh;
  }
}
</style>
