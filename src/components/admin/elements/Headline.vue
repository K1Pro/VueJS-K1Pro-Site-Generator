<template>
  <div class="headline" :style="[style.outline.borderColor]" ref="comp">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="defaults.htmlElmnts[elValue.type].info.opts"></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ comp.hght }}px x {{ comp.wdth }}px</span>
    <div class="headline-input" :style="[style.outline.borderColor, divStyle]">
      <input type="text" :style="inputStyle" v-model="site.htmlElmnts[elKey].text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['defaults', 'grid', 'respWidth', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      comp: { hght: 0, wdth: 0 },
    };
  },

  mounted() {
    this.comp.hght = this.$refs?.comp?.scrollHeight;
    this.comp.wdth = this.$refs?.comp?.scrollWidth;
  },

  updated() {
    this.comp.hght = this.$refs?.comp?.scrollHeight;
    this.comp.wdth = this.$refs?.comp?.scrollWidth;
  },

  computed: {
    divStyle() {
      return {
        paddingTop: this.elValue.style.margin ? this.elValue.style.margin : '0px',
        paddingBottom: this.elValue.style.margin ? this.elValue.style.margin : '0px',
        paddingLeft: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
        paddingRight: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
        justifyContent: this.elValue.style['align-content'],
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
          !this.elValue.style['font-size'] && !this.site.body.style['font-size']
            ? '12px'
            : !this.elValue.style['font-size'] && this.site.body.style['font-size']
            ? this.site.body.style['font-size']
            : String(this.elValue.style['font-size']).includes('vw')
            ? this.grid.wdth * (this.elValue.style['font-size']?.replace(/\D/g, '') / 100) + 'px'
            : this.elValue.style['font-size'],
        height: this.elValue.style.height ? this.elValue.style.height : 'initial',
        padding: !this.elValue.style.padding
          ? '0px'
          : String(this.elValue?.style?.padding)?.includes('vw')
          ? this.grid.wdth * (this.elValue.style.padding?.replace(/\D/g, '') / 100) + 'px'
          : this.elValue.style.padding,
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'initial',
        width:
          this.grid.wdth < this.respWidth.xs
            ? '100%'
            : !this.elValue.style.width
            ? 'initial'
            : this.elValue.style.width.includes('vw')
            ? this.grid.wdth * (this.elValue.style.width?.replace(/\D/g, '') / 100) + 'px'
            : this.elValue.style.width,
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
