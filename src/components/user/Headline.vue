<template>
  <template v-if="slctd.hash && Object.values(site.pages[slctd.type])[0][elIndex][2]">
    <a
      :id="Object.values(site.pages[slctd.type])[0][elIndex][2]"
      style="display: block; margin-top: -100px; margin-bottom: 100px"
    ></a>
  </template>
  <div
    style="position: relative; display: flex"
    :style="{
      paddingTop: elValue.style.margin ? elValue.style.margin + 'vh' : false,
      paddingBottom: elValue.style.margin ? elValue.style.margin + 'vh' : false,
      justifyContent: elValue.style.align ? elValue.style.align : 'center',
    }"
  >
    <component
      :is="elValue.style.url ? 'a' : 'div'"
      :href="elValue.style.url ? elValue.style.url : false"
      class="headline"
      :style="{
        background: elValue.style.background ? elValue.style.background : 'transparent',
        backgroundColor:
          elValue.style.background && elValue.style['background-color'] ? elValue.style['background-color'] : false,
        color: elValue.style.color ? elValue.style.color : 'black',
        fontSize: elValue.style.fontSize ? elValue.style.fontSize + 'px' : '3vh',
        margin: elValue.style.align == 'center' ? 'auto' : false,
        // marginLeft: elValue.style.align == 'left' ? '10%' : false,
        // marginLeft: elValue.style.align == 'right' ? 'calc(' + wndw.wdth + 'px - 50%)' : false,
        paddingTop: elValue.style.padding ? elValue.style.padding + 'vh' : false,
        paddingBottom: elValue.style.padding ? elValue.style.padding + 'vh' : false,
        paddingLeft:
          elValue.style.align == 'center'
            ? elValue.style.padding + 'vh'
            : wndw.wdth > respWidth.md
            ? '10%'
            : elValue.style.padding
            ? elValue.style.padding + 'vh'
            : false,
        paddingRight:
          elValue.style.align == 'center'
            ? elValue.style.padding + 'vh'
            : wndw.wdth > respWidth.md
            ? '10%'
            : elValue.style.padding
            ? elValue.style.padding + 'vh'
            : false,
        justifyContent: elValue.style.align ? elValue.style.align : 'center',
        width: elValue.style.width
          ? elValue.style.width + (elValue.style.widthUnit ? elValue.style.widthUnit : 'px')
          : '100%',
      }"
    >
      {{ elValue.text }}
    </component>
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
  text-decoration: none;
}
</style>
