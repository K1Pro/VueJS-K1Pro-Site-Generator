<template>
  <template v-if="slctd.hash && Object.values(site.pages[slctd.type])[0][elIndex][2]">
    <a
      :id="Object.values(site.pages[slctd.type])[0][elIndex][2]"
      style="display: block; margin-top: -100px; margin-bottom: 100px"
    ></a>
  </template>

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

  inject: ['wndw', 'respWidth', 'site', 'slctd'],

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
