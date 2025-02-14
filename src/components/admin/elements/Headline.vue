<template>
  <div :id="elKey" class="headline">
    <edit_menu :elKey="elKey" :options="['align', 'font-size', 'padding']"></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ elValue.style.fontSize }}%</span>
    <input
      class="headline-input"
      :style="[
        {
          textAlign: elValue.style.align,
          fontSize: elValue.style.fontSize + 'vh',
          padding: elValue.style.padding + 'vh ' + (this.grid.wdth > this.respWidth.md ? 'calc(10% + 10px)' : '10px'),
        },
        style.outline.borderColor,
      ]"
      ref="headline"
      type="text"
      v-model="site.htmlElmnts[elKey].text"
    />
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['grid', 'respWidth', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.headline {
  position: relative;
}
.headline-input {
  height: 100%;
  width: 100%;
  background: transparent;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
  border: none;
}
</style>
