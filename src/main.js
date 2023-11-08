const vm = Vue.createApp({
  components: {
    app: Vue.defineAsyncComponent(() => loadModule(`${assetsPath}/src/App.vue`, options)),
  },
  template: '<app></app>',
});

const pinia = Pinia.createPinia();

vm.use(pinia);

vm.mount('#app');
