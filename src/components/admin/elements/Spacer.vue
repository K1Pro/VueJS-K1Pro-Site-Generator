<template>
  <div :id="elKey" :class="'spacer spacer_' + elKey" :style="[style.outline.borderColor]">
    <edit_menu :elKey="elKey" :options="['height']"></edit_menu>
    <span class="dim" :style="[style.outline.color]"
      >{{ elValue.style.height >= 1 ? Math.round(elValue.style.height * 100) / 100 : '1' }}%</span
    >
    <p :style="[spacerHeight]"></p>
  </div>
</template>

<script>
export default {
  name: 'Spacer',

  inject: ['site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    spacerHeight() {
      return { height: this.elValue.style.height >= 1 ? this.elValue.style.height + 'vh' : '1vh' };
    },
  },
};
</script>

<style>
.spacer {
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.spacer p {
  padding: 0%;
  margin: 0%;
}
</style>
