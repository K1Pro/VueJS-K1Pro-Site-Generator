<template>
  <div :id="elKey" class="headline">
    <edit_menu
      :elKey="elKey"
      :elIndex="elIndex"
      :options="[
        'font-size',
        'align',
        'anchor',
        'background',
        'background-color',
        'color',
        'margin',
        'padding',
        'url',
        'width',
      ]"
    ></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ elValue.style.fontSize }}%</span>
    <div
      class="headline-input"
      :style="[
        style.outline.borderColor,
        {
          paddingTop: elValue.style.margin ? elValue.style.margin + 'vh' : '0vh',
          paddingBottom: elValue.style.margin ? elValue.style.margin + 'vh' : '0vh',
          textAlign: elValue.style.align ? elValue.style.align : false,
        },
      ]"
    >
      <input
        style="height: 100%; border: none"
        :style="{
          background: elValue.style.background ? elValue.style.background : 'transparent',
          backgroundColor:
            elValue.style.background && elValue.style['background-color'] ? elValue.style['background-color'] : false,
          color: elValue.style.color ? elValue.style.color : 'black',
          fontSize: elValue.style.fontSize ? elValue.style.fontSize + 'px' : '3vh',
          marginLeft: elValue.style.align == 'left' ? '10%' : false,
          marginRight: elValue.style.align == 'right' ? '10%' : false,
          paddingTop: elValue.style.padding ? elValue.style.padding + 'vh' : false,
          paddingBottom: elValue.style.padding ? elValue.style.padding + 'vh' : false,
          paddingLeft:
            elValue.style.align == 'center'
              ? elValue.style.padding + 'vh'
              : elValue.style.padding && grid.wdth > respWidth.md
              ? '10%'
              : grid.wdth > respWidth.md
              ? '10%'
              : elValue.style.padding
              ? elValue.style.padding + 'vh'
              : false,
          paddingRight:
            elValue.style.align == 'center'
              ? elValue.style.padding + 'vh'
              : elValue.style.padding && grid.wdth > respWidth.md
              ? '10%'
              : grid.wdth > respWidth.md
              ? '10%'
              : elValue.style.padding
              ? elValue.style.padding + 'vh'
              : false,
          textAlign: elValue.style.align ? elValue.style.align : 'center',
          width:
            !elValue.style.width && !elValue.style.widthUnit
              ? '100%'
              : (elValue.style.widthUnit == 'vw' ? grid.wdth * (elValue.style.width / 100) : elValue.style.width) +
                (elValue.style.widthUnit == 'vw' ? 'px' : elValue.style.widthUnit ? elValue.style.widthUnit : 'px'),
        }"
        ref="headline"
        type="text"
        v-model="site.htmlElmnts[elKey].text"
      />
    </div>
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
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
  border: none;
}
</style>
