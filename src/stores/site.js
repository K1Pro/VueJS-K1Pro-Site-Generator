const useSiteStore = Pinia.defineStore('site', {
  state: () => {
    return {
      accessToken: '',
      sessionID: '',
      loggedIn: null,
      email: '',
      password: '',
      message: '',
      hostname: window.location.hostname,
      pathname: window.location.host.includes('192.168')
        ? window.location.pathname.replaceAll('/node/vuejs/Frontends/k1pro/site/v001/', '')
        : window.location.pathname.slice(1),
      windowWidth: 0,
      respWidth: 650,
      site: {},
      user: {},
      content: {},
      endPts: {
        servrURL: window.location.host.includes('192.168')
          ? 'http://192.168.54.22/php81/APIs/k1pro/site/v001/public/'
          : 'https://api-site.k1pro.net/',
        loginURL: window.location.host.includes('192.168')
          ? 'http://192.168.54.22/php81/APIs/k1pro/login/v001/public/'
          : 'https://api-login.k1pro.net/',
        cookiePath: window.location.host.includes('192.168') ? '/node/vuejs/Frontends/k1pro/site/v001' : '/',
        login: 'sessions',
        logout: 'sessions/',
        user: 'users',
        params: 'administrator',
        content: 'content',
      },
      selectedPhoto: '',
    };
  },
  actions: {
    getCookie(accessToken, sessionID) {
      this.accessToken = document.cookie.match(new RegExp(`(^| )${accessToken}=([^;]+)`))?.at(2);
      this.sessionID = document.cookie.match(new RegExp(`(^| )${sessionID}=([^;]+)`))?.at(2);
    },
    deleteCookie() {
      this.accessToken = undefined;
      this.sessionID = undefined;
      this.loggedIn = false;
      document.cookie = `_a_t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${this.cookiePath};`;
      document.cookie = `_s_i=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${this.cookiePath};`;
    },
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.windowWidth = window.innerWidth;
    },
    async getLoginUser() {
      try {
        const response = await fetch(this.endPts.loginURL + this.endPts.user, {
          method: 'GET',
          headers: {
            Authorization: this.accessToken,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        });
        const getLoginJSON = await response.json();
        if (getLoginJSON.success && getLoginJSON.data.user.AppPermissions.SiteGenAI[this.site.site]) {
          this.getUserContent('POST');
          console.log(getLoginJSON);
          this.message = getLoginJSON.messages[0];
          this.user = getLoginJSON.data.user;
          this.loggedIn = true;
          document.body.style.backgroundColor = '#FFFFFF';
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          document.cookie = `_a_t=${this.accessToken}; expires=${tomorrow.toString()};`;
          document.cookie = `_s_i=${this.sessionID}; expires=${tomorrow.toString()};`;
        } else {
          this.loggedIn = false;
          this.email = '';
          this.password = '';
        }
      } catch (error) {
        console.log(error.toString());
        this.message = error.toString();
      }
    },
    async getUserContent(method) {
      try {
        const response = await fetch(this.endPts.servrURL + this.endPts.content, {
          method: method,
          headers: {
            Authorization: this.accessToken,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            site: this.site.site,
            content: this.content,
          }),
        });
        const getUserContentJSON = await response.json();
        if (getUserContentJSON.success) {
          console.log(getUserContentJSON);
          if (getUserContentJSON.data.content) {
            this.content = getUserContentJSON.data.content;
          }
        }
      } catch (error) {
        console.log(error.toString());
        this.message = error.toString();
      }
    },
    async deleteLogin() {
      try {
        const response = await fetch(this.endPts.loginURL + this.endPts.logout + this.sessionID, {
          method: 'DELETE',
          headers: {
            Authorization: this.accessToken,
            'Cache-Control': 'no-store',
          },
        });
        const logOutResJSON = await response.json();
        if (logOutResJSON.success) {
          this.deleteCookie();
        }
        this.message = logOutResJSON.messages[0];
      } catch (error) {
        this.error = error.toString();
        this.message = this.error;
      }
    },
  },
  getters: {},
});
