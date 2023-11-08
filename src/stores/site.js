const useSiteStore = Pinia.defineStore('site', {
  state: () => {
    return {
      message: '',
      hostname: window.location.hostname,
      pathname: window.location.pathname.replaceAll('/node/vuejs/Frontends/Site', ''),
      // pathname: window.location.pathname.replaceAll('/node/vuejs/Frontends/Site', '').replaceAll('/', ''),
      site: [],
    };
  },
  actions: {
    getCookie(accessToken, sessionID) {},
  },
  getters: {},
});
