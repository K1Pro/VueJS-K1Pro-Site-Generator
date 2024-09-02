<template>
  <snackbar :msg @deleteMsg="msg = null"></snackbar>

  <div class="app-grid-container" :style="appGridContainer">
    <div class="app-grid-item1">
      <sidemenu
        :sideMenuItems
        :wndw
        @sideMenuSlctdLnk="(el) => ((eventIndex = null), (sideMenuSlctdLnk = el))"
      ></sidemenu>
      <component :is="sideMenuSlctdLnk[0]" style="padding: 10px 10px 10px 70px; height: 100%"></component>
    </div>

    <div
      v-if="wndw.wdth > 768"
      class="app-grid-resizer"
      @mousedown="startResizeGrid"
      @mouseup="stopResizeGrid"
      v-on:dblclick="resetGrid"
    ></div>

    <div class="app-grid-item2" :style="{ 'background-color': site.body.style.backgroundColor }">
      <template v-for="(pageElmnt, pageIndex) in site.pages[page.slctd]">
        <component
          :is="site.htmlElmnts[pageElmnt[0]].type"
          v-if="pageElmnt[1]"
          :elKey="pageElmnt[0]"
          :elValue="site.htmlElmnts[pageElmnt[0]]"
          :elIndex="pageIndex"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App admin',

  mixins: [snackbarMixin, wndwWdthHghtMixin, appGridResizerMixin, logoutMixin],

  data() {
    return {
      page: { slctd: 'Home' },
      site: params,
      respWidth: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1140,
      },
      sideMenuSlctdLnk: ['Website'],
      selectedVideo: '',
      selectedPhoto: '',
      content: content,
      user: {},
      userSettings: user_settings,
      endPts: {
        siteURL: site_url,
        loginURL: login_url,
        captchaURL: captcha_url,
        accountResetURL: accountreset_url,
        cookiePath: cookie_path,
        login: 'sessions',
        logout: 'sessions/',
        user: 'users',
        content: 'content',
        messages: 'messages',
      },
    };
  },

  provide() {
    return {
      // computed
      page: Vue.computed(() => this.page),
      selectedPhoto: Vue.computed(() => this.selectedPhoto),
      site: Vue.computed(() => this.site),
      sideMenuSlctdLnk: Vue.computed(() => this.sideMenuSlctdLnk),
      content: Vue.computed(() => this.content),
      user: Vue.computed(() => this.user),
      selectedVideo: Vue.computed(() => this.selectedVideo),
      grid: Vue.computed(() => this.grid),
      // static
      respWidth: this.respWidth,
      endPts: this.endPts,
      // methods
      getUserContent: this.getUserContent,
      patchSite: this.patchSite,
      modify: this.modify,
      getSite: this.getSite,
    };
  },

  computed: {
    sideMenuItems() {
      const sideMenuItemsArray = [
        ['fa fa-gear', null, 'Website'],
        ['fa fa-camera', null, 'Multimedia', 'Calendar'],
        ['fa fa-envelope', null, 'Messages', 'Calendar'],
        ['fa fa-user-gear', null, 'User', 'Calendar'],
        ['fa fa-sign-out', null, 'Log out'],
      ];
      return sideMenuItemsArray;
    },
    grid() {
      return {
        wdth:
          this.wndw.wdth < this.respWidth.md ? this.wndw.wdth - 11 : this.wndw.wdth * (this.appGridItem2Width / 100),
        hght: this.wndw.hght,
      };
    },
  },

  methods: {
    modify(newSite) {
      this.site = newSite;
    },
    async patchSite() {
      try {
        const response = await fetch(site_url + add_auth, {
          method: 'PATCH',
          headers: {
            Authorization: access_token,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            params: this.site,
          }),
        });
        const patchSiteJSON = await response.json();
        if (patchSiteJSON.success) {
          this.showMsg(patchSiteJSON.messages[0]);
        }
      } catch (error) {
        console.log(error.toString());
        this.showMsg(error.toString());
      }
    },
    async getSite() {
      try {
        const response = await fetch(site_url + add_auth, {
          method: 'GET',
        });
        const getSiteResJSON = await response.json();
        if (getSiteResJSON.success) {
          this.site = getSiteResJSON.data.params;
          console.log(getSiteResJSON.data.params);
          // if (getSiteResJSON.data?.params?.body?.style) {
          //   Object.keys(getSiteResJSON.data.params.body.style).forEach((key) => {
          //     // this should be also found in loader.js
          //     if (this.isValid == 'admin' && key == 'backgroundColor') {
          //       if (getSiteResJSON.data.params.body.style.backgroundColor == '#ffffff') {
          //         getSiteResJSON.data.params.body.style.backgroundColor = '#777777';
          //       }
          //       document.body.style.backgroundImage =
          //         'linear-gradient(125deg, ' +
          //         getSiteResJSON.data.params.body.style.backgroundColor +
          //         '75 0 65%, ' +
          //         getSiteResJSON.data.params.body.style.backgroundColor +
          //         ' 65% 100%)';
          //     } else {
          //       document.body.style[key] = getSiteResJSON.data.params.body.style[key];
          //     }
          //   });
          // }
          // const setFavicon = document.createElement('link');
          // setFavicon.setAttribute('rel', 'shortcut icon');
          // setFavicon.setAttribute('href', this.endPts.siteURL + this.site.params.icon);
          // document.head.appendChild(setFavicon);
        }
        // console.log(getSiteResJSON);
        // this.msg.snackBar = getSiteResJSON.messages[0];
      } catch (error) {
        console.log(error.toString());
        this.msg.snackBar = error.toString();
      }
    },
    async getUserContent(method, contentType) {
      // this.getUserContent('POST', null);
      let content;
      if (contentType == 'image') {
        content = {
          mostRecentImageSearch: this.content.mostRecentImageSearch,
          imagesSearched: this.content.imagesSearched,
        };
      } else if (contentType == 'video') {
        content = {
          mostRecentVideoSearch: this.content.mostRecentVideoSearch,
          videosSearched: this.content.videosSearched,
        };
      }

      try {
        const response = await fetch(this.endPts.siteURL + this.endPts.content, {
          method: method,
          headers: {
            Authorization: this.access_token,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            // site: this.site.folderPath,
            content: content,
            contentType: contentType,
          }),
        });
        const getUserContentJSON = await response.json();
        if (getUserContentJSON.success) {
          if (method == 'POST') this.content = getUserContentJSON.data;
          console.log(getUserContentJSON);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async patchUserSettings(newUserSettings) {
      this.userSettings = newUserSettings;
      try {
        const response = await fetch(site_url + 'settings', {
          method: 'PATCH',
          headers: {
            Authorization: access_token,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            Site: site.site,
            Settings: this.userSettings,
          }),
        });
        const patchUserSettingsResJSON = await response.json();
        if (!patchUserSettingsResJSON.success) {
          this.showMsg('Settings update error');
        }
      } catch (error) {
        console.log(error.toString());
        this.showMsg('Settings update error');
      }
    },
  },

  watch: {
    sideMenuSlctdLnk(newSideMenuSlctdLnk, oldSideMenuSlctdLnk) {
      if (newSideMenuSlctdLnk == 'Logout') {
        this.sideMenuSlctdLnk = oldSideMenuSlctdLnk;
        if (confirm('Are you sure you would like to log out?') == true) {
          this.deleteLogin();
        }
      }
    },
  },
};
</script>

<style>
.app-grid-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100vh auto; /* auto */
  background-color: #c6c6c6;
  /* word-break: break-all; */
}
.app-grid-item1 {
  background-color: white;
}
.app-grid-resizer {
  cursor: col-resize;
}
.app-grid-item1 {
  background-color: white;
}
@media only screen and (min-width: 768px) {
  /* .app-grid-container {
    grid-template-rows: 100vh;
  } */
  .app-grid-item2 {
    overflow-y: scroll;
  }
}
</style>
