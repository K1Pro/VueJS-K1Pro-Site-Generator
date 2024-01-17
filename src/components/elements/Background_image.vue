<template>
  <div :class="elKey">
    <div
      class="hero-image"
      :style="{
        backgroundImage: `url(${
          site.params.htmlElements[elIndex]['background-image']['url'].includes(
            'http://'
          ) ||
          site.params.htmlElements[elIndex]['background-image']['url'].includes(
            'https://'
          )
            ? site.params.htmlElements[elIndex]['background-image']['url']
            : endPts.siteURL +
              site.params.htmlElements[elIndex]['background-image']['url']
        })`,
      }"
    >
      <div v-if="loggedIn">
        <button
          @click="selectSearchedImg"
          :style="{
            'margin-top': topMenu
              ? Number(
                  site.params.htmlElements[topMenuPos]['top-menu']['style'][
                    'height'
                  ]
                ) + 'px'
              : '0px',
          }"
        >
          Select Gallery Image
        </button>
        <!-- <h1 style="font-size: 50px">Bartosz Kwasniewski</h1>
        <p>Programista</p>
        <button>Zatrudnij mnie</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Background Image',

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
    // This can be used an an alternative if inline styling does not work
    // const style = document.createElement('style');
    // style.type = 'text/css';
    // style.textContent = `.hero-image { background-image: url('${
    //   this.endPts.siteURL + this.site.params.htmlElements[this.elIndex]['background-image']['url']
    // }')}`;
    // document.head.appendChild(style);
  },
};
</script>

<style>
.background-image {
  position: relative;
  top: 0;
  height: 75vh;
  width: 100%;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.background-image button {
  padding: 3px;
  width: 150px;
  margin-left: 5px;
}

.background-image span {
  margin-left: 10px;
}

.hero-image {
  /* background-image: url('background_image.jpg'); */
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('background_image.jpg'); */
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.hero-text button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 10px 25px;
  color: black;
  background-color: #ddd;
  text-align: center;
  cursor: pointer;
}

.hero-text button:hover {
  background-color: #555;
  color: white;
}
</style>
