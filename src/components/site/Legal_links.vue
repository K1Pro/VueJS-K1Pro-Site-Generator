<template>
  <div class="legal-links" :style="[style.primaryColor]">
    <template v-for="([linkKey, linkVal], linkIndex) in Object.entries(site.htmlElmnts[elKey].links)">
      <template v-if="linkVal === true">
        <template v-if="linkKey == 'Copyright'"> © Copyright {{ year }}, {{ site.business }} </template>
        <a v-else :href="endPts.href + '/' + linkKey.toLowerCase()">
          {{ linkKey.replaceAll('-', ' ') }}
        </a>
      </template>
      {{ Object.values(site.htmlElmnts[elKey].links)[linkIndex + 1] ? ' | ' : '' }}
    </template>
  </div>
</template>

<script>
export default {
  name: 'Legal links',

  inject: ['endPts', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      year: fullDateTime.getFullYear(),
      // atBottom: null
    };
  },

  // computed: {
  //   legalLinks() {
  //     return this.atBottom !== null
  //       ? { position: this.atBottom ? 'relative' : 'fixed', bottom: this.atBottom ? false : '0' }
  //       : {};
  //   },
  // },

  // mounted() {
  //   setTimeout(() => {
  //     if (this.atBottom === null) {
  //       this.atBottom = this.$refs.legalLinks.getBoundingClientRect().bottom > this.wndw.hght ? true : false;
  //     }
  //   }, 1);
  // },
};
</script>

<style>
.legal-links {
  position: relative;
  text-align: center;
  padding: 30px;
  width: 100%;
}
.legal-links a {
  text-decoration: none;
}
</style>
