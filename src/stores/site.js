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
      site: {},
      user: {},
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
      },
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
          console.log(getLoginJSON);
          this.message = getLoginJSON.messages[0];
          this.user = getLoginJSON.data.user;
          this.loggedIn = true;
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
  },
  getters: {},
});
