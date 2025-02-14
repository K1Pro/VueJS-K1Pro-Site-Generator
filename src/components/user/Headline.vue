<template>
  <div
    class="headline"
    :style="{
      textAlign: elValue.style.align,
      fontSize: elValue.style.fontSize + 'vh',
      padding: elValue.style.padding + 'vh ' + (this.wndw.wdth > this.respWidth.md ? 'calc(10% + 10px)' : '10px'),
    }"
  >
    {{ elValue.text }}
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['wndw', 'respWidth', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.headline {
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
