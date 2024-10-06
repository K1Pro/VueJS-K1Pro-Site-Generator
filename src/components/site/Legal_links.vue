<template>
  <div class="legal-links" :style="[style.primaryColor, legalLinks]" ref="legalLinks">
    © Copyright 2024, {{ site.business }} |
    <template v-for="([linkKey, linkVal], linkIndex) in Object.entries(site.htmlElmnts[elKey].links)">
      <a :href="endPts.href + '/' + linkKey.toLowerCase()">
        {{ linkKey.replaceAll('-', ' ') }}
      </a>
      {{ Object.entries(site.htmlElmnts[elKey].links).length - 1 !== linkIndex ? ' | ' : '' }}
    </template>
  </div>
</template>

<script>
export default {
  name: 'Legal links',

  inject: ['endPts', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { atBottom: null };
  },

  computed: {
    legalLinks() {
      return this.atBottom !== null
        ? { position: this.atBottom ? 'relative' : 'fixed', bottom: this.atBottom ? false : '0' }
        : {};
    },
  },

  mounted() {
    setTimeout(() => {
      if (this.atBottom === null) {
        console.log(this.$refs.legalLinks.getBoundingClientRect().bottom);
        this.atBottom = this.$refs.legalLinks.getBoundingClientRect().bottom > this.wndw.hght ? true : false;
      }
    }, 1);
  },
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
