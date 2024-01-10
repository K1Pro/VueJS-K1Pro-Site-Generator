<template>
  <snackbar> </snackbar>

  <template v-if="site.isValid === 'true'">
    <template v-if="loggedIn === true">
      <div class="login-container">
        <div class="login-item1">
          <login_side_panel></login_side_panel>
        </div>
        <div class="login-item2" :style="{ backgroundColor: site.params.body.style.backgroundColor }">
          <div class="inline-editor-container">
            <div class="inline-editor-title">
              <b>Inline editor:</b> <button type="button">Apply</button>&nbsp;
              <button type="button" @click.prevent="patchParams">Update</button>&nbsp;
              <button type="button" @click.prevent="getSite">Reset</button>&nbsp;
            </div>
          </div>
          <div class="inline-editor">
            <app_container></app_container>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <app_container></app_container>
    </template>
  </template>

  <template v-else-if="site.isValid === 'root' || site.isValid === 'false'">
    <directory></directory>
  </template>

  <template v-else> </template>
</template>

<script>
import Snackbar from './components/Snackbar.vue';
import Directory from './components/Directory.vue';
import Login_side_panel from './components/login/Side_panel.vue';
import App_container from './components/App_container.vue';

export default {
  name: 'App',

  components: {
    Snackbar,
    Directory,
    Login_side_panel,
    App_container,
  },

  computed: {
    // ...Pinia.mapStores(useSiteStore),
    ...Pinia.mapWritableState(useSiteStore, [
      'accessToken',
      'loggedIn',
      'email',
      'password',
      'message',
      'site',
      'endPts',
      'getSite',
      'getCookie',
      'deleteCookie',
      'onScreenResize',
      'updateScreenWidth',
      'getLoginUser',
      'postLogin',
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
    this.getSite();
    this.email && this.password ? this.postLogin() : this.getCookie('_a_t', '_s_i');
    this.accessToken ? this.getLoginUser() : this.deleteCookie();
  },

  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  },
};
</script>

<style>
.login-container {
  display: grid;
  grid-template-columns: 100%;
  /* background-color: #2196f3; */
  /* padding: 2vh; */
  /* column-gap: 2vh; */
}
.login-item1 {
  background-color: rgb(255, 255, 255);
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* padding: 20px; */
  /* text-align: center; */
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}

.login-item2 {
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
  .login-container {
    grid-template-columns: 25% 75%;
    height: 100vh;
  }
}
</style>
