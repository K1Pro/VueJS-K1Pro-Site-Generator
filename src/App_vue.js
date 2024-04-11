import Snackbar from './components/Snackbar_vue.js';
import Directory from './components/Directory_vue.js';
import Login_side_panel from './components/login/Side_panel_vue.js';
import App_container from './components/App_container_vue.js';
import Login from './components/elements/footer/Login_vue.js';

export default {
  name: 'App',

  template: /*html*/ `
    <snackbar> </snackbar>

    <a id="home" ref="home"></a>

    <template
      v-if="
        (isValid === 'true' || isValid === 'blog') && site.params?.htmlElements
      "
    >
      <template v-if="loggedIn === true">
        <div class="app-grid-container">
          <div class="app-grid-item1">
            <login_side_panel></login_side_panel>
          </div>
          <div
            class="app-grid-item2"
            :style="{ backgroundColor: site.params.body.style.backgroundColor }"
          >
            <div class="inline-editor-container">
              <div class="inline-editor-title">
                <b>Inline editor:</b> <button type="button">Apply</button>&nbsp;
                <button type="button" @click.prevent="patchSite">Update</button
                >&nbsp;
                <button type="button" @click.prevent="getSite">Reset</button
                >&nbsp;
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

    <template v-else-if="isValid === 'root' || isValid === 'false'">
      <directory></directory>
    </template>

    <template v-else-if="isValid === 'admin'">
      <div id="login-container">
        <login></login>
      </div>
    </template>

    <template v-else>Nothing</template>
  `,

  components: {
    Snackbar,
    Directory,
    Login_side_panel,
    App_container,
    Login,
  },

  computed: {
    // ...Pinia.mapStores(useSiteStore),
    ...Pinia.mapWritableState(useSiteStore, [
      'accessToken',
      'sessionID',
      'loggedIn',
      'msg',
      'windowWidth',
      'isValid',
      'site',
      'endPts',
      'getSite',
      'deleteCookie',
      'getLoginUser',
    ]),
  },

  methods: {
    async patchSite() {
      try {
        const response = await fetch(
          this.endPts.siteURL + this.site.folderPath,
          {
            method: 'PATCH',
            headers: {
              Authorization: this.accessToken,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
            },
            body: JSON.stringify({
              params: this.site.params,
            }),
          }
        );
        const patchSiteJSON = await response.json();
        if (patchSiteJSON.success) {
          console.log(patchSiteJSON);
          this.msg.snackBar = patchSiteJSON.messages[0];
        }
      } catch (error) {
        console.log(error.toString());
        this.msg.snackBar = error.toString();
      }
    },
    updateScreenWidth() {
      this.windowWidth = window.innerWidth;
    },
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.updateScreenWidth();
      });
    },
  },

  created() {
    if (this.isValid == 'true' || this.isValid == 'admin') {
      this.accessToken && this.sessionID
        ? this.getLoginUser()
        : this.deleteCookie();
    }
  },

  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
    if (this.$refs.home.id == this.endPts.urlHash) window.scrollTo(0, 0);

    style(
      'App',
      /*css*/ `
.app-grid-container {
  display: grid;
  grid-template-columns: 100%;
}
.app-grid-item1 {
  height: 100%;
  background-color: rgb(255, 255, 255);
  overflow-y: hidden;
  overflow-x: hidden;
}
.app-grid-item2 {
  height: 100%;
}
.inline-editor-container {
  display: table;
  height: 6vh;
  width: 100%;
  background-color: white;
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
  .app-grid-container {
    grid-template-columns: 25% 75%;
    height: 100vh;
  }
}
    `
    );
  },
};
