<template>
  <div :id="elKey" class="headline">
    <edit_menu :elKey="elKey" :options="['height']"></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ elValue.style.textSize }}%</span>
    <input
      class="headline-input"
      :style="[
        {
          fontSize: elValue.style.textSize + 'vh',
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

  inject: ['site', 'style'],

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
  text-align: center;
  background: transparent;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
  padding: 4vh 0px;
  border: none;
}
</style>
