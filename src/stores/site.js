const useSiteStore = Pinia.defineStore('site', {
  state: () => {
    return {
      message: '',
      hostname: window.location.hostname.replace('.net', '').replace('.com', '').split('.'),
      pathname: window.location.pathname.replaceAll('/node/vuejs/Frontends/Site', ''),
      searchedSite: {},
    };
  },
  actions: {
    getCookie(accessToken, sessionID) {},
  },
  getters: {
    rootHostname: (state) => state.hostname[state.hostname.length - 1],
  },
});
