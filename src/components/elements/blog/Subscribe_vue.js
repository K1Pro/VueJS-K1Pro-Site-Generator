export default {
  name: 'Subscribe',

  template: /*html*/ `
    <div
    class="subscribe"
    :style="{
      backgroundColor:
        site.params.htmlElements[0]['top-menu'].style.backgroundColor +
        site.params.htmlElements[0]['top-menu'].style.opacity,
    }">
      <input type="text" placeholder="Email" /><button>Subscribe</button>
    </div>
  `,

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'windowWidth',
      'respWidth',
      'site',
      'loggedIn',
    ]),
  },

  mounted() {
    style(
      'Subscribe',
      /*css*/ `
.subscribe {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 0px;
  text-align: center;
}
      `
    );
  },
};
