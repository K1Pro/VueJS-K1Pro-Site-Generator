<template>
  <div
    :id="'site_page_el_' + elIndex"
    :class="'spacer spacer_' + elKey"
    :style="[style.outline.borderColor]"
    ref="spacer"
  >
    <edit_menu :elKey="elKey" :options="['height']"></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ spacerHght }}px x {{ spacerWdth }}px</span>
    <p :style="[pStyle]"></p>
  </div>
</template>

<script>
export default {
  name: 'Spacer',

  inject: ['defaults', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      spacerHght: 0,
      spacerWdth: 0,
    };
  },

  mounted() {
    this.spacerHght = this.$refs?.spacer?.scrollHeight;
    this.spacerWdth = this.$refs?.spacer?.scrollWidth;
  },

  updated() {
    this.spacerHght = this.$refs?.spacer?.scrollHeight;
    this.spacerWdth = this.$refs?.spacer?.scrollWidth;
  },

  computed: {
    pStyle() {
      return {
        height: this.elValue.style.height ? this.elValue.style.height : 'initial',
      };
    },
  },
};
</script>

<style>
.spacer {
  position: relative;
  min-height: 35px;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.spacer p {
  padding: 0%;
  margin: 0%;
}
</style>
