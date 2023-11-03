const useSiteStore = Pinia.defineStore('site', {
  state: () => {
    return {
      hostname: window.location.hostname,
      pathname: window.location.pathname,
    };
  },
  actions: {
    getCookie(accessToken, sessionID) {},
  },
  getters: {},
});
