const useSiteStore = Pinia.defineStore('site', {
  state: () => {
    return {
      accessToken: '',
      sessionID: '',
      loggedIn: false,
      email: email,
      password: token,
      msg: {
        snackBar: '',
        login: '',
      },
      spinGlobal: false,
      hostname: host_name,
      pathname: path_name,
      windowWidth: 0,
      respWidth: 650,
      site: {
        folderPath: folder_path,
        isValid: valid_site,
        params: params,
        scannedDirs: scanned_dirs,
      },
      user: {},
      content: {},
      endPts: {
        siteURL: site_url,
        loginURL: login_url,
        captchaURL: captcha_url,
        servertimeURL: servertime_url,
        cookiePath: cookie_path,
        login: 'sessions',
        logout: 'sessions/',
        user: 'users',
        content: 'content',
        messages: 'messages',
      },
      selectedPhoto: '',
    };
  },
  actions: {
    async getSite() {
      try {
        const response = await fetch(this.endPts.siteURL + this.pathname, {
          method: 'GET',
        });
        const getSiteResJSON = await response.json();
        if (getSiteResJSON.success) {
          this.site = getSiteResJSON.data;
          Object.keys(getSiteResJSON.data?.params.body.style).forEach((key) => {
            document.body.style[key] =
              getSiteResJSON.data.params.body.style[key];
          });
          const setFavicon = document.createElement('link');
          setFavicon.setAttribute('rel', 'shortcut icon');
          setFavicon.setAttribute(
            'href',
            this.endPts.siteURL + this.site.params.icon
          );
          document.head.appendChild(setFavicon);
        }
        console.log(getSiteResJSON);
        // this.msg.snackBar = getSiteResJSON.messages[0];
      } catch (error) {
        console.log(error.toString());
        this.msg.snackBar = error.toString();
      }
    },
    getCookie(accessToken, sessionID) {
      this.accessToken = document.cookie
        .match(new RegExp(`(^| )${accessToken}=([^;]+)`))
        ?.at(2);
      this.sessionID = document.cookie
        .match(new RegExp(`(^| )${sessionID}=([^;]+)`))
        ?.at(2);
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
        if (
          getLoginJSON.success &&
          getLoginJSON.data.user.AppPermissions.SiteGenAI[this.site.folderPath]
        ) {
          this.getUserContent('POST');
          this.msg.snackBar = 'Logged in';
          this.user = getLoginJSON.data.user;
          this.loggedIn = true;
          document.body.style.backgroundColor = '#FFFFFF';
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          document.cookie = `_a_t=${
            this.accessToken
          }; expires=${tomorrow.toString()};`;
          document.cookie = `_s_i=${
            this.sessionID
          }; expires=${tomorrow.toString()};`;
        } else {
          this.deleteCookie();
          this.msg.snackBar = 'Login error 1';
        }
        console.log(getLoginJSON);
      } catch (error) {
        this.deleteCookie();
        console.log(error.toString());
        this.msg.snackBar = 'Login error 2';
      }
    },
    async getUserContent(method) {
      try {
        const response = await fetch(
          this.endPts.siteURL + this.endPts.content,
          {
            method: method,
            headers: {
              Authorization: this.accessToken,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
            },
            body: JSON.stringify({
              site: this.site.folderPath,
              content: this.content,
            }),
          }
        );
        const getUserContentJSON = await response.json();
        if (getUserContentJSON.success) {
          console.log(getUserContentJSON);
          if (getUserContentJSON.data.content) {
            this.content = getUserContentJSON.data.content;
            this.content.default = getUserContentJSON.data.default;
            this.content.messages = getUserContentJSON.data.messages;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async postLogin() {
      this.spinGlobal = true;
      try {
        const response = await fetch(this.endPts.loginURL + this.endPts.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            Email: this.email.toLowerCase(),
            Password: this.password,
            Referer: this.site.folderPath,
          }),
        });
        const logInResJSON = await response.json();
        if (logInResJSON.success) {
          console.log('<-- Login Info -->');
          console.log(logInResJSON);
          this.accessToken = logInResJSON.data.accesstoken;
          this.sessionID = logInResJSON.data.session_id;
          this.getLoginUser();
          this.msg.login = '';
          this.msg.snackBar = 'Logged in';
        } else {
          this.deleteCookie();
          this.msg.login = logInResJSON.messages[0];
          this.msg.snackBar = 'Login error 3';
        }
        this.spinGlobal = false;
      } catch (error) {
        this.deleteCookie();
        console.log(error);
        this.msg.snackBar = 'Login error 4';
        this.spinGlobal = false;
      }
    },
    async deleteLogin() {
      try {
        const response = await fetch(
          this.endPts.loginURL + this.endPts.logout + this.sessionID,
          {
            method: 'DELETE',
            headers: {
              Authorization: this.accessToken,
              'Cache-Control': 'no-store',
            },
          }
        );
        const logOutResJSON = await response.json();
        if (logOutResJSON.success) {
          this.getSite();
          this.deleteCookie();
          this.email = '';
          this.password = '';
        }
        this.msg.snackBar = 'Logged out';
      } catch (error) {
        this.getSite();
        this.deleteCookie();
        this.email = '';
        this.password = '';
        this.msg.snackBar = 'Logged out';
        console.log(error);
      }
    },
  },
  getters: {},
});
