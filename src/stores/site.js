const useSiteStore = Pinia.defineStore('site', {
  state: () => {
    return {
      hostname: window.location.hostname,
      pathname: window.location.pathname.replaceAll('/node/vuejs/Frontends/Site/', '').replaceAll('/', ''),
    };
  },
  actions: {
    getCookie(accessToken, sessionID) {},
  },
  getters: {},
});
