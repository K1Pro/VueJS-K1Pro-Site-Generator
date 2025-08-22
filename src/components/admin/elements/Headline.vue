<template>
  <div :id="elKey" class="headline" ref="headline">
    <edit_menu
      :elKey="elKey"
      :elIndex="elIndex"
      :options="[
        'font-size',
        'anchor',
        'background',
        'background-color',
        'color',
        'height',
        'justify-content',
        'margin',
        'padding',
        'text-align',
        'url',
        'width',
      ]"
    ></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ headlineHght }}px x {{ headlineWdth }}px</span>
    <div class="headline-input" :style="[style.outline.borderColor, divStyle]">
      <input type="text" :style="inputStyle" v-model="site.htmlElmnts[elKey].text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['grid', 'respWidth', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      headlineHght: 0,
      headlineWdth: 0,
    };
  },

  mounted() {
    this.headlineHght = this.$refs?.headline?.scrollHeight;
    this.headlineWdth = this.$refs?.headline?.scrollWidth;
  },

  updated() {
    this.headlineHght = this.$refs?.headline?.scrollHeight;
    this.headlineWdth = this.$refs?.headline?.scrollWidth;
  },

  computed: {
    divStyle() {
      return {
        paddingTop:
          this.elValue.style.margin && this.elValue.style['margin-unit']
            ? this.elValue.style.margin + this.elValue.style['margin-unit']
            : '0px',
        paddingBottom:
          this.elValue.style.margin && this.elValue.style['margin-unit']
            ? this.elValue.style.margin + this.elValue.style['margin-unit']
            : '0px',
        paddingLeft: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
        paddingRight: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
        justifyContent: this.elValue.style['justify-content'] ? this.elValue.style['justify-content'] : 'initial',
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
          !this.elValue.style['font-size'] &&
          !this.elValue.style['font-size-unit'] &&
          !this.site.body.style['font-size'] &&
          !this.site.body.style['font-size-unit']
            ? '12px'
            : (!this.elValue.style['font-size'] || !this.elValue.style['font-size-unit']) &&
              this.site.body.style['font-size'] &&
              this.site.body.style['font-size-unit']
            ? this.site.body.style['font-size'] + this.site.body.style['font-size-unit']
            : (this.elValue.style['font-size-unit'] == 'vw'
                ? this.grid.wdth * (this.elValue.style['font-size'] / 100)
                : this.elValue.style['font-size']) +
              (this.elValue.style['font-size-unit'] == 'vw' ? 'px' : this.elValue.style['font-size-unit']),
        height:
          this.elValue.style.height && this.elValue.style['height-unit']
            ? this.elValue.style.height + this.elValue.style['height-unit']
            : 'initial',
        padding:
          !this.elValue.style.padding || !this.elValue.style['padding-unit']
            ? '0px'
            : (this.elValue.style['padding-unit'] == 'vw'
                ? this.grid.wdth * (this.elValue.style.padding / 100)
                : this.elValue.style.padding) +
              (this.elValue.style['padding-unit'] == 'vw' ? 'px' : this.elValue.style['padding-unit']),
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'initial',
        width:
          !this.elValue.style.width || !this.elValue.style['width-unit']
            ? 'initial'
            : (this.elValue.style['width-unit'] == 'vw'
                ? this.grid.wdth * (this.elValue.style.width / 100)
                : this.elValue.style.width) +
              (this.elValue.style['width-unit'] == 'vw' ? 'px' : this.elValue.style['width-unit']),
      };
    },
  },
};
</script>

<style>
.headline {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.headline-input {
  display: flex;
}
.headline-input input {
  border: none;
}
</style>
