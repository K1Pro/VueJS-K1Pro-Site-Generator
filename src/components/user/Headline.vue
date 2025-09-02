<template>
  <div class="resp-padding">
    <template v-if="slctd.hash && Object.values(site.pages[slctd.type])[0][elIndex][2]">
      <a
        :id="Object.values(site.pages[slctd.type])[0][elIndex][2]"
        style="display: block; margin-top: -100px; margin-bottom: 100px"
      ></a>
    </template>
    <div :style="divStyle">
      <component
        class="headline"
        :is="elValue.style.url ? 'a' : 'div'"
        :href="elValue.style.url ? elValue.style.url : false"
        :style="inputStyle"
      >
        {{ elValue.text }}
      </component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['wndw', 'respWidth', 'site', 'slctd'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    divStyle() {
      return {
        position: 'relative',
        display: 'flex',
        paddingTop: this.elValue.style.margin,
        paddingBottom: this.elValue.style.margin,
        justifyContent: this.elValue.style['align-content'],
      };
    },
    inputStyle() {
      return {
        background: this.elValue.style.background,
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
            : this.elValue.style['font-size'],
        height: this.elValue.style.height,
        lineHeight: !this.elValue.style.padding ? this.elValue.style.height : false,
        padding: this.elValue.style.padding,
        textAlign: this.elValue.style['text-align'],
        width: this.elValue.style.width ? this.elValue.style.width : '100%',
      };
    },
  },
};
</script>

<style>
.headline {
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-decoration: none;
}
</style>
