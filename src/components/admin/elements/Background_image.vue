<template>
  <div :id="elKey" class="background-image" ref="backgroundImage">
    <img
      :width="grid.wdth + 'px'"
      :src="site.htmlElmnts[elKey].url"
      @drop.prevent="drop"
      @dragover.prevent
      @dragenter.prevent
    />
  </div>
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['grid', 'page', 'respWidth', 'selectedMedia', 'showMsg', 'site', 'endPts', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { imgOffsetTop: null };
  },

  computed: {
    enabledPages() {
      return this.site.pages[this.page.slctd]
        .flat()
        .slice(0, this.elIndex * 2)
        .filter((removePageElmnt) => removePageElmnt == true || removePageElmnt == false);
    },
  },

  methods: {
    calcImgOffsetTop() {
      this.imgOffsetTop =
        this.wndw.wdth < this.respWidth.md
          ? this.$refs.backgroundImage.offsetTop - window.innerHeight
          : this.$refs.backgroundImage.offsetTop;
    },
    drop(event) {
      this.site.htmlElmnts[this.elKey].url = event.dataTransfer.getData('text');
    },
  },

  mounted() {
    this.calcImgOffsetTop();
  },
  watch: {
    enabledPages(newEnabledPages, oldEnabledPages) {
      if (newEnabledPages.join('') !== oldEnabledPages.join('')) {
        if (this.wndw.wdth < this.respWidth.md) {
          this.imgOffsetTop = !this.enabledPages.includes(true)
            ? 0
            : this.$refs.backgroundImage.offsetTop - window.innerHeight;
        } else {
          this.imgOffsetTop = !this.enabledPages.includes(true) ? 0 : this.$refs.backgroundImage.offsetTop;
        }
      }
    },
  },
};
</script>

<style>
.background-image {
  position: relative;
  height: 75vh;
  margin-bottom: -75vh;
}
.background-image img {
  object-fit: cover;
  width: 100%;
  height: 75vh;
}
</style>
