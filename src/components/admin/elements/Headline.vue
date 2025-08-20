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
    <div class="headline-input" :style="[style.outline.borderColor, divStyle]">
      <input type="text" :style="inputStyle" v-model="site.htmlElmnts[elKey].text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['grid', 'respWidth', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    divStyle() {
      return {
        paddingTop: this.elValue.style.margin ? this.elValue.style.margin + 'vh' : '0vh',
        paddingBottom: this.elValue.style.margin ? this.elValue.style.margin + 'vh' : '0vh',
        textAlign: this.elValue.style.align ? this.elValue.style.align : false,
      };
    },
    inputStyle() {
      return {
        background: this.elValue.style.background ? this.elValue.style.background : 'transparent',
        backgroundColor:
          this.elValue.style.background && this.elValue.style['background-color']
            ? this.elValue.style['background-color']
            : false,
        color: this.elValue.style.color ? this.elValue.style.color : 'black',
        fontSize:
          !this.elValue.style.fontSize &&
          !this.elValue.style.fontSizeUnit &&
          !this.site.body.style.fontSize &&
          !this.site.body.style.fontSizeUnit
            ? '12px'
            : !this.elValue.style.fontSize &&
              !this.elValue.style.fontSizeUnit &&
              this.site.body.style.fontSize &&
              this.site.body.style.fontSizeUnit
            ? this.site.body.style.fontSize + this.site.body.style.fontSizeUnit
            : (this.elValue.style.fontSizeUnit == 'vw'
                ? this.grid.wdth * (this.elValue.style.fontSize / 100)
                : this.elValue.style.fontSize) +
              (this.elValue.style.fontSizeUnit == 'vw'
                ? 'px'
                : this.elValue.style.fontSizeUnit
                ? this.elValue.style.fontSizeUnit
                : 'px'),
        marginLeft: this.elValue.style.align == 'left' ? '10%' : false,
        marginRight: this.elValue.style.align == 'right' ? '10%' : false,
        paddingTop: this.elValue.style.padding ? this.elValue.style.padding + 'vh' : false,
        paddingBottom: this.elValue.style.padding ? this.elValue.style.padding + 'vh' : false,
        paddingLeft:
          this.elValue.style.align == 'center'
            ? this.elValue.style.padding + 'vh'
            : this.elValue.style.padding && this.grid.wdth > this.respWidth.md
            ? '10%'
            : this.grid.wdth > this.respWidth.md
            ? '10%'
            : this.elValue.style.padding
            ? this.elValue.style.padding + 'vh'
            : false,
        paddingRight:
          this.elValue.style.align == 'center'
            ? this.elValue.style.padding + 'vh'
            : this.elValue.style.padding && this.grid.wdth > this.respWidth.md
            ? '10%'
            : this.grid.wdth > this.respWidth.md
            ? '10%'
            : this.elValue.style.padding
            ? this.elValue.style.padding + 'vh'
            : false,
        textAlign: this.elValue.style.align ? this.elValue.style.align : 'center',
        width:
          !this.elValue.style.width && !this.elValue.style.widthUnit
            ? '100%'
            : (this.elValue.style.widthUnit == 'vw'
                ? this.grid.wdth * (this.elValue.style.width / 100)
                : this.elValue.style.width) +
              (this.elValue.style.widthUnit == 'vw'
                ? 'px'
                : this.elValue.style.widthUnit
                ? this.elValue.style.widthUnit
                : 'px'),
      };
    },
  },
};
</script>

<style>
.headline {
  position: relative;
}
.headline-input input {
  height: 100%;
  border: none;
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
