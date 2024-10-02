<template>
  <div class="description" ref="description">
    <h2>Description</h2>
    <p v-if="descWidth !== null">
      {{ this.site.description.slice(0, descWidth * 2) }}{{ this.site.description.length > descWidth * 2 ? '...' : '' }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Description',

  inject: ['respWidth', 'site', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],

  data() {
    return { descWidth: null };
  },

  watch: {
    'wndw.wdth'() {
      this.descWidth = this.$refs.description.getBoundingClientRect().width;
    },
  },
};
</script>

<style></style>
