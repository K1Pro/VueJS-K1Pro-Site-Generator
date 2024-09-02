<template>
  <div class="background-image" ref="backgroundImage" :style="[elImg]">
    <img
      v-if="Object.keys(elImg).length !== 0"
      :width="grid.wdth + 'px'"
      :src="site.htmlElmnts[elKey]['url']"
      :style="[backgroundImageBorder]"
    />
  </div>
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['grid', 'page', 'respWidth', 'selectedPhoto', 'showMsg', 'site', 'endPts', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { elImg: {} };
  },

  computed: {
    enabledPages() {
      return this.site.pages[this.page.slctd]
        .flat()
        .slice(0, this.elIndex * 2)
        .filter((removePageElmnt) => removePageElmnt == true || removePageElmnt == false);
    },
    backgroundImageBorder() {
      return {
        borderWidth: this.site.pages[this.page.slctd][this.elIndex - 1] ? '3px 3px 3px 3px' : '0px 3px 3px 3px',
      };
    },
  },
  mounted() {
    setTimeout(() => {
      if (Object.keys(this.elImg).length === 0) {
        this.elImg =
          this.wndw.wdth > this.respWidth.md
            ? {
                marginTop: '-' + this.$refs.backgroundImage.getBoundingClientRect().y + 'px',
              }
            : {
                marginTop: '-' + (this.$refs.backgroundImage.getBoundingClientRect().y - window.innerHeight) + 'px',
              };
      }
    }, 1);
  },
  watch: {
    enabledPages(newEnabledPages, oldEnabledPages) {
      if (newEnabledPages.join('') !== oldEnabledPages.join('')) {
        if (this.$refs.backgroundImage.getBoundingClientRect().y < 0 && !this.enabledPages.includes(true)) {
          this.elImg = {
            marginTop: '0px',
          };
        } else {
          this.elImg = {
            marginTop: '-' + this.$refs.backgroundImage.getBoundingClientRect().y + 'px',
          };
        }
      }
    },
  },
};
</script>

<style>
.background-image {
  position: relative;
  top: 0;
  height: 75vh;
}
.background-image img {
  object-fit: cover;
  width: 100%;
  height: 75vh;
  border-style: dashed;
  border-color: rgb(115, 115, 115);
}
</style>
