<template>
  <div class="text-box" :style="textBoxStyle">
    <template v-for="column in site.htmlElmnts[elKey].style.gridTemplateColumns">
      <div
        v-if="site.htmlElmnts[elKey]?.['box' + column]?.txt"
        class="text-box-txt-item"
        v-html="site.htmlElmnts[elKey]['box' + column].txt"
      ></div>
      <img
        v-else
        class="text-box-img-item"
        :style="{ height: site.htmlElmnts[elKey].style.height * 0.75 + 'vh' }"
        :src="site.htmlElmnts[elKey]['box' + column].img"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['wndw', 'respWidth', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {},

  computed: {
    textBoxStyle() {
      if (!this.site.htmlElmnts[this.elKey].style.gridTemplateColumns)
        this.site.htmlElmnts[this.elKey].style = { gridTemplateColumns: 2 };
      if (!this.site.htmlElmnts[this.elKey].style.align) this.site.htmlElmnts[this.elKey].style.align = 'center';
      if (!this.site.htmlElmnts[this.elKey].style.height) this.site.htmlElmnts[this.elKey].style.height = 10;
      const gridTemplateColumns =
        this.site.htmlElmnts[this.elKey].style.align == 'left'
          ? '30% repeat(' +
            (this.site.htmlElmnts[this.elKey].style.gridTemplateColumns - 1) +
            ', ' +
            70 / (this.site.htmlElmnts[this.elKey].style.gridTemplateColumns - 1) +
            '%)'
          : this.site.htmlElmnts[this.elKey].style.align == 'center'
          ? 'repeat(' +
            this.site.htmlElmnts[this.elKey].style.gridTemplateColumns +
            ', ' +
            100 / this.site.htmlElmnts[this.elKey].style.gridTemplateColumns +
            '%)'
          : 'repeat(' +
            (this.site.htmlElmnts[this.elKey].style.gridTemplateColumns - 1) +
            ', ' +
            70 / (this.site.htmlElmnts[this.elKey].style.gridTemplateColumns - 1) +
            '%) 30%';
      return {
        'grid-template-rows': this.site.htmlElmnts[this.elKey].style.height * 0.75 + 'vh',
        'grid-template-columns': gridTemplateColumns,
        padding: this.wndw.wdth > this.respWidth.md ? '0px 10%' : '0px',
      };
    },
  },
};
</script>

<style>
.text-box {
  position: relative;
  display: grid;
}
.text-box-items {
}
.text-box-txt-item {
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
}
.text-box-img-item {
  padding: 10px;
  object-fit: cover;
  width: 100%;
}
</style>
