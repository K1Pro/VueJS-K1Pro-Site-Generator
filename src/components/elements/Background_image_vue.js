export default {
  name: 'Background Image',

  template: /*html*/ `
    <div class="background-image">
      <img :src="site.params.htmlElements[elIndex]['background-image']['url']" />
        <div v-if="loggedIn">
          <button
            @click="selectSearchedImg"
            :style="{
              'margin-top': topMenu
                ? Number(site.params.htmlElements[topMenuPos]['top-menu']['style']['height']) + 'px'
                : '0px',
            }">
            Select Image
          </button>
        </div>
    </div>
  `,

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'msg',
      'site',
      'endPts',
      'selectedPhoto',
    ]),
  },

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { topMenu: false, topMenuPos: '' };
  },

  methods: {
    selectSearchedImg() {
      if (this.selectedPhoto) {
        this.site.params.htmlElements[this.elIndex]['background-image']['url'] =
          this.selectedPhoto;
      } else {
        this.msg.snackBar = 'Search for image first';
      }
    },
  },

  created() {
    this.site.params.htmlElements.forEach((htmlElement, index) => {
      Object.keys(htmlElement).forEach((htmlElementType) => {
        if (htmlElementType.includes('top-menu')) {
          this.topMenuPos = index;
          return (this.topMenu = true);
        }
      });
    });
  },

  mounted() {
    style(
      'Background-Image',
      /*css*/ `
.background-image {
  position: relative;
  top: 0;
  height: 75vh;
}
.background-image button {
  padding: 3px;
  width: 150px;
  margin-left: 5px;
}
.background-image span {
  margin-left: 10px;
}
.background-image img {
  object-fit: cover;
  width: 100%;
  height:75vh
}
      `
    );
  },
};
