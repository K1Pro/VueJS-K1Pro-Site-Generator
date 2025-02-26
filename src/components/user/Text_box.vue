<template>
  <template v-if="slctd.hash && Object.values(site.pages[slctd.type])[0][elIndex][2]">
    <a :id="Object.values(site.pages[slctd.type])[0][elIndex][2]"></a>
  </template>

  <div class="text-box" :style="textBoxStyle">
    <template v-for="box in elValue.boxes">
      <div v-if="box?.txt" class="text-box-txt-item" v-html="box.txt"></div>
      <img v-else class="text-box-img-item" :style="{ height: elValue.style.height * 0.75 + 'vh' }" :src="box.img" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['wndw', 'respWidth', 'site', 'slctd', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {},

  computed: {
    textBoxStyle() {
      if (!this.elValue.style.align) this.site.htmlElmnts[this.elKey].style.align = 'center';
      if (!this.elValue.style.height) this.site.htmlElmnts[this.elKey].style.height = 10;
      const gridTemplateColumns =
        this.elValue.style.align == 'left'
          ? '30% repeat(' + (this.elValue.boxes.length - 1) + ', ' + 70 / (this.elValue.boxes.length - 1) + '%)'
          : this.elValue.style.align == 'center'
          ? 'repeat(' + this.elValue.boxes.length + ', ' + 100 / this.elValue.boxes.length + '%)'
          : 'repeat(' + (this.elValue.boxes.length - 1) + ', ' + 70 / (this.elValue.boxes.length - 1) + '%) 30%';
      return {
        'grid-template-rows': this.elValue.style.height * 0.75 + 'vh',
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
  /* overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  line-clamp: 8;
  -webkit-box-orient: vertical; */
}
.text-box-img-item {
  padding: 10px;
  object-fit: cover;
  width: 100%;
}
</style>
