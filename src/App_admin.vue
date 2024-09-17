<template>
  <snackbar :msg @deleteMsg="msg = null"></snackbar>

  <div class="app-grid-container" :style="appGridContainer">
    <div class="app-grid-item1" ref="appGridItem1">
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
    <div id="app-grid-item2" ref="appGridItem2" :style="{ 'background-color': site.body.style.backgroundColor }">
      <template v-for="(pageElmnt, pageIndex) in site.pages[page.slctd]">
        <component
          :is="site.htmlElmnts[pageElmnt[0]].type"
          v-if="pageElmnt[1]"
          :elKey="pageElmnt[0]"
          :elValue="site.htmlElmnts[pageElmnt[0]]"
          :elIndex="pageIndex"
          :ref="pageElmnt[0]"
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
      isMounted: false,
      page: { slctd: 'Home' },
      site: params,
      respWidth: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1140,
      },
      sideMenuSlctdLnk: ['Website'],
      selectedMedia: { img: null, vid: null, txt: null },
      content: content,
      user: user,
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
      undoRedo: 0,
    };
  },

  provide() {
    return {
      // computed
      page: Vue.computed(() => this.page),
      selectedMedia: Vue.computed(() => this.selectedMedia),
      site: Vue.computed(() => this.site),
      pageElPositions: Vue.computed(() => this.pageElPositions),
      pageElTypes: Vue.computed(() => this.pageElTypes),
      siteElTypes: Vue.computed(() => this.siteElTypes),
      sideMenuSlctdLnk: Vue.computed(() => this.sideMenuSlctdLnk),
      content: Vue.computed(() => this.content),
      user: Vue.computed(() => this.user),
      selectedVideo: Vue.computed(() => this.selectedVideo),
      style: Vue.computed(() => this.style),
      grid: Vue.computed(() => this.grid),
      undoRedo: Vue.computed(() => this.undoRedo),
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
          this.wndw.wdth < this.respWidth.md
            ? this.$refs.appGridItem1?.clientWidth
            : this.$refs.appGridItem2?.clientWidth,
        hght: this.wndw.hght,
        size: this.userSettings.layout['grid-size'],
      };
    },
    pageElPositions() {
      const pageElPositionsArray = [];
      this.site.pages[this.page.slctd].forEach((el) => {
        pageElPositionsArray.push(this.site.htmlElmnts[el[0]]?.position);
      });
      return pageElPositionsArray;
    },
    pageElTypes() {
      const pageElTypesArray = [];
      this.site.pages[this.page.slctd].forEach((el) => {
        pageElTypesArray.push(this.site.htmlElmnts[el[0]].type);
      });
      return pageElTypesArray;
    },
    siteElTypes() {
      const siteElTypesArray = [];
      Object.values(this.site.htmlElmnts).forEach((val) => {
        siteElTypesArray.push(val.type);
      });
      return siteElTypesArray;
    },
    style() {
      return {
        primaryColor: {
          backgroundColor: { backgroundColor: this.site.body.style.primaryColor },
          outline: {
            color: {
              color: this.findGreyZone(this.site.body.style.primaryColor) ? 'rgb(32, 32, 32)' : 'rgb(160, 160, 160)',
            },
            borderColor: {
              borderColor: this.findGreyZone(this.site.body.style.primaryColor)
                ? 'rgb(32, 32, 32)'
                : 'rgb(128, 128, 128)',
            },
          },
        },
        outline: {
          color: {
            color: this.findGreyZone(this.site.body.style.backgroundColor) ? 'rgb(32, 32, 32)' : 'rgb(160, 160, 160)',
          },
          borderColor: {
            borderColor: this.findGreyZone(this.site.body.style.backgroundColor)
              ? 'rgb(32, 32, 32)'
              : 'rgb(128, 128, 128)',
          },
        },
      };
    },
  },

  methods: {
    findGreyZone(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return r < 192 && r > 64 && g < 192 && g > 64 && b < 192 && b > 64 ? true : false;
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
          this.applyStyle();
          this.undoRedo++;
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
            Authorization: access_token,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            site: add_auth,
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
    applyStyle() {
      const appGridItem2 = document.getElementById('app-grid-item2');

      const allElmnts = [
        ...Array.from(appGridItem2.getElementsByTagName('input')),
        ...Array.from(appGridItem2.getElementsByTagName('select')),
        ...Array.from(appGridItem2.getElementsByTagName('i')),
        ...Array.from(appGridItem2.getElementsByTagName('textarea')),
      ];
      allElmnts.forEach((el) => {
        el.style.color = this.site.body.style.textColor;
      });
    },
  },

  mounted() {
    this.isMounted = true;
    this.applyStyle();
    // Object.entries(this.$refs).forEach(([elKey, elVal]) => {
    //   if (elKey != 'appGridItem1' && elKey != 'appGridItem2') {
    //     console.log('===================================');
    //     console.log(elKey);
    //     console.log(document.getElementById(elKey).offsetTop);
    //     console.log(document.getElementById(elKey).offsetHeight);
    //     // console.log(document.getElementById(elKey).getBoundingClientRect());
    //   }
    // });
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
  /* background-color: #c6c6c6; */
  /* word-break: break-all; */
}
.app-grid-item1 {
  background-color: white;
}
.app-grid-resizer {
  cursor: col-resize;
  background-color: #c6c6c6;
}
.dim {
  font-weight: bold;
  position: absolute;
  bottom: 0px;
  padding: 0px 3px;
}
.greenWhitePlus::before {
  font-size: 16px;
  color: forestgreen;
  background-color: white;
  border-radius: 25px;
  cursor: pointer;
}
.redWhiteMinus::before {
  font-size: 16px;
  color: red;
  background-color: white;
  border-radius: 25px;
  cursor: pointer;
}
@media only screen and (min-width: 768px) {
  /* .app-grid-container {
    grid-template-rows: 100vh;
  } */
  #app-grid-item2 {
    overflow-y: scroll;
  }
}
</style>
