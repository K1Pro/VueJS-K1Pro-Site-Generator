<template>
  <snackbar :msg @deleteMsg="msg = null"></snackbar>

  <div class="app-grid-container" :style="appGridContainer" v-if="sttngs.user !== null">
    <div class="app-grid-item1" ref="appGridItem1">
      <sidemenu
        :sideMenuItems
        :sideMenuSlctdLnk="sideMenuSlctdLnk"
        :wndw
        @sideMenuSlctdLnk="(el) => (sideMenuSlctdLnk = el)"
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

    <div class="app-grid-item2" ref="appGridItem2" :style="{ 'background-color': site.body.style.backgroundColor }">
      <template v-for="(pageElmnt, pageIndex) in site.pages[slctd.type][slctd.page]">
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

  mixins: [appGridResizerMixin, defaultsMixin, pexelsMixin, snackbarMixin, settingsMixin, wndwWdthHghtMixin],

  data() {
    return {
      endPts: {
        appApiUrl: app_api_url,
        captchaURL: api_path.captcha,
        uploadFilesURL: app_api_url + 'public/' + slctd.job + '/upload/images/',
      },
      grid: {
        wdth: document.body.clientWidth * 0.5,
        hght: document.documentElement.clientHeight,
      },
      individEdit: {
        elmntIndx: null,
        elmnts: null,
      },
      messages: null,
      respWidth: {
        xs: 400,
        sm: 576,
        md: 650,
        lg: 992,
        xl: 1140,
      },
      slctd: {
        firstUrlSegment: slctd.first_url_segment,
        href: slctd.href,
        imgURL: null,
        job: slctd.job,
        page: 'Home',
        txtCntnt: null,
        type: 'loggedout',
        vidURL: null,
      },
      sideMenuSlctdLnk: ['Website'],
      site: site,
      undoRedo: 0,
      upload: { files: [] },
      userData: user_data,
    };
  },

  provide() {
    return {
      // computed
      grid: Vue.computed(() => this.grid),
      individEdit: Vue.computed(() => this.individEdit),
      messages: Vue.computed(() => this.messages),
      page: Vue.computed(() => this.page),
      pageElPositions: Vue.computed(() => this.pageElPositions),
      pageElTypes: Vue.computed(() => this.pageElTypes),
      selectedVideo: Vue.computed(() => this.selectedVideo),
      sideMenuSlctdLnk: Vue.computed(() => this.sideMenuSlctdLnk),
      site: Vue.computed(() => this.site),
      siteElTypes: Vue.computed(() => this.siteElTypes),
      slctd: Vue.computed(() => this.slctd),
      style: Vue.computed(() => this.style),
      undoRedo: Vue.computed(() => this.undoRedo),
      upload: Vue.computed(() => this.upload),
      userData: Vue.computed(() => this.userData),
      // static
      endPts: this.endPts,
      respWidth: this.respWidth,
      // methods
      getSite: this.getSite,
      patchSite: this.patchSite,
    };
  },

  computed: {
    sideMenuItems() {
      const sideMenuItemsArray = [
        ['fa fa-gear', null, 'Website'],
        ['fa fa-camera', null, 'Multimedia'],
        ['fa fa-envelope', null, 'Messages'],
        ['fa fa-comment', null, 'Chat'],
        ['fa fa-user-gear', 'post-' + url_path.login, 'Account', '_a_t', access_token, '_s_i', session_id],
        ['fa fa-sign-out', null, 'Log out'],
      ];
      return sideMenuItemsArray;
    },
    pageElPositions() {
      const pageElPositionsArray = [];
      this.site.pages?.[this.slctd.type]?.[this.slctd.page]?.forEach((el) => {
        pageElPositionsArray.push(this.site.htmlElmnts[el[0]]?.position);
      });
      return pageElPositionsArray;
    },
    pageElTypes() {
      const pageElTypesArray = [];
      this.site.pages?.[this.slctd.type]?.[this.slctd.page]?.forEach((el) => {
        pageElTypesArray.push(this.site.htmlElmnts[el[0]].type);
      });
      return pageElTypesArray;
    },
    siteElTypes() {
      return Object.keys(this.site.htmlElmnts);
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
            outlineColor: this.findGreyZone(this.site.body.style.backgroundColor)
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
      let siteTemp = JSON.stringify(this.site);
      if (this.individEdit.elmntIndx !== null) {
        siteTemp = JSON.parse(siteTemp);
        siteTemp.pages[this.slctd.type][this.slctd.page] = JSON.parse(this.individEdit.elmnts);
      }
      try {
        const response = await fetch(app_api_url + this.slctd.job, {
          method: 'PATCH',
          headers: {
            Authorization: access_token,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            params: typeof siteTemp === 'string' ? JSON.parse(siteTemp) : siteTemp,
          }),
        });
        const resJSON = await response.json();
        if (resJSON.success) {
          this.showMsg(resJSON.messages[0]);
        }
      } catch (error) {
        console.log(error.toString());
        this.showMsg(error.toString());
      }
    },
    async getSite() {
      this.individEdit.elmntIndx = null;
      this.individEdit.elmnts = null;
      try {
        const response = await fetch(app_api_url + this.slctd.job, {
          method: 'GET',
        });
        const resJSON = await response.json();
        console.log(resJSON);
        if (resJSON.success) {
          this.site = resJSON.data.site; //need to refactor params
          this.individEdit.elmnts = null;
          // this.applyStyle();
          this.undoRedo++;
          console.log(resJSON.data.site);
          // if (resJSON.data?.params?.body?.style) {
          //   Object.keys(resJSON.data.params.body.style).forEach((key) => {
          //     // this should be also found in loader.js
          //     if (this.isValid == 'admin' && key == 'backgroundColor') {
          //       if (resJSON.data.params.body.style.backgroundColor == '#ffffff') {
          //         resJSON.data.params.body.style.backgroundColor = '#777777';
          //       }
          //       document.body.style.backgroundImage =
          //         'linear-gradient(125deg, ' +
          //         resJSON.data.params.body.style.backgroundColor +
          //         '75 0 65%, ' +
          //         resJSON.data.params.body.style.backgroundColor +
          //         ' 65% 100%)';
          //     } else {
          //       document.body.style[key] = resJSON.data.params.body.style[key];
          //     }
          //   });
          // }
          // const setFavicon = document.createElement('link');
          // setFavicon.setAttribute('rel', 'shortcut icon');
          // setFavicon.setAttribute('href', this.endPts.appApiUrl + this.site.params.icon);
          // document.head.appendChild(setFavicon);
        }
        // console.log(resJSON);
        // this.msg.snackBar = resJSON.messages[0];
      } catch (error) {
        console.log(error.toString());
        this.showMsg(error.toString());
      }
    },
    async getMultimediaFiles() {
      try {
        const response = await fetch(app_api_url + this.slctd.job + '/multimedia', {
          headers: {
            Authorization: access_token,
            'Cache-Control': 'no-store',
          },
        });
        const resJSON = await response.json();
        if (resJSON.success) {
          this.upload.files = resJSON.data.upload_files;
        } else {
          console.log(resJSON);
        }
      } catch (error) {
        console.log(error.toString());
      }
    },
    applyStyle() {
      const appGridItem2 = this.$refs.appGridItem2;

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

    async messagesReq(METHOD) {
      try {
        const response = await fetch(app_api_url + this.slctd.job + '/messages', {
          headers: {
            Authorization: access_token,
            'Cache-Control': 'no-store',
          },
        });
        const resJSON = await response.json();
        if (resJSON.success) this.messages = resJSON.data.messages;
      } catch (error) {
        console.log(error.toString());
        this.showMsg('Messages error');
      }
    },
  },

  mounted() {
    this.sttngsReq('GET', 'user');
    this.messagesReq('GET');
    this.pexelsReq('GET', 'img');
    this.getMultimediaFiles();
    // this.applyStyle();
  },
  updated() {
    if (this.$refs?.appGridItem2) this.grid.wdth = this.$refs.appGridItem2.clientWidth;
    // console.log(this.grid.wdth);
  },
};
</script>

<style>
.app-grid-container {
  display: grid;
  grid-template-rows: 100vh auto; /* auto */
  /* background-color: #c6c6c6; */
  /* word-break: break-all; */
}
.app-grid-item1 {
  background-color: white;
}
.app-grid-resizer {
  cursor: col-resize;
  background-color: #eee;
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
@media only screen and (max-width: 767px) {
  .app-grid-container {
    grid-template-columns: 100%;
  }
}
@media only screen and (min-width: 768px) {
  .app-grid-item2 {
    overflow-y: scroll;
  }
}
</style>
