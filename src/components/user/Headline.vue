<template>
  <template v-if="slctd.hash && Object.values(site.pages[slctd.type])[0][elIndex][2]">
    <a
      :id="Object.values(site.pages[slctd.type])[0][elIndex][2]"
      style="display: block; margin-top: -100px; margin-bottom: 100px"
    ></a>
  </template>
  <div
    :style="{
      paddingTop: elValue.style.margin ? elValue.style.margin + 'vh' : false,
      paddingBottom: elValue.style.margin ? elValue.style.margin + 'vh' : false,
    }"
  >
    <div
      class="headline"
      :style="{
        background: elValue.style.background ? elValue.style.background : 'transparent',
        backgroundColor:
          elValue.style.background && elValue.style['background-color'] ? elValue.style['background-color'] : false,
        color: elValue.style.color ? elValue.style.color : 'black',
        fontSize: elValue.style.fontSize ? elValue.style.fontSize + 'vh' : '3vh',
        padding: elValue.style.padding ? elValue.style.padding + 'vh' : false,
        justifyContent: elValue.style.align ? elValue.style.align : 'center',
        width: elValue.style.width ? elValue.style.width + 'px' : '100%',
      }"
    >
      {{ elValue.text }}
    </div>
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
  display: flex;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  margin: auto;
}
</style>
