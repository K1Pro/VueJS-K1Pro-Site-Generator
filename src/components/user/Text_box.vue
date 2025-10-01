<template>
  <div :class="{ 'resp-padding': !isSubComp }">
    <div class="text-box"><span v-html="elValue.text" class="text-box-main-span" :style="[spanStyle]"></span></div>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    isSubComp() {
      return String(this.elIndex).includes('.');
    },
    spanStyle() {
      return {
        color: this.elValue.style.color ? this.elValue.style.color : 'black',
        fontSize:
          !this.elValue.style['font-size'] && !this.site.body.style['font-size']
            ? '12px'
            : !this.elValue.style['font-size'] && this.site.body.style['font-size']
            ? this.site.body.style['font-size']
            : this.elValue.style['font-size'].includes('vw')
            ? this.grid.wdth * (this.elValue.style['font-size']?.replace(/\D/g, '') / 100) + 'px'
            : this.elValue.style['font-size'],
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'left',
      };
    },
  },
};
</script>

<style>
.text-box {
  position: relative;
}
.text-box-main-span {
  display: block;
}
</style>
