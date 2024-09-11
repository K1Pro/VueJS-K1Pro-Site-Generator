<template>
  <div :id="elKey" class="background-image" ref="backgroundImage" :style="[elImg]">
    <img v-if="imgOffsetTop != null" :width="grid.wdth + 'px'" :src="site.htmlElmnts[elKey]['url']" />
  </div>
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['grid', 'page', 'respWidth', 'selectedPhoto', 'showMsg', 'site', 'endPts', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { isMounted: false, imgOffsetTop: null };
  },

  computed: {
    elImg() {
      if (this.isMounted && this.imgOffsetTop === null) this.calcImgOffsetTop();
      return this.isMounted
        ? {
            // 'margin-top': '-' + this.imgOffsetTop + 'px',
            'margin-bottom': '-' + (this.$refs.backgroundImage.clientHeight - this.imgOffsetTop) + 'px',
          }
        : {};
    },
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
  },

  mounted() {
    this.isMounted = true;
    if (this.imgOffsetTop === null) this.calcImgOffsetTop();
  },
  watch: {
    'wndw.wdth'() {
      if (this.imgOffsetTop === null) this.calcImgOffsetTop();
    },
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
}
.background-image img {
  object-fit: cover;
  width: 100%;
  height: 75vh;
}
</style>
