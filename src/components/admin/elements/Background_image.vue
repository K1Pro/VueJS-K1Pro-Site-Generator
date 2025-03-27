<template>
  <div
    class="background-image"
    :style="{ height: elValue.style.height + 'vh', marginBottom: '-' + elValue.style.height + 'vh' }"
  >
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="['height']"></edit_menu>
    <img
      :style="{ height: elValue.style.height + 'vh' }"
      :width="grid.wdth + 'px'"
      :src="
        elValue.src.includes('http://') || elValue.src.includes('https://')
          ? elValue.src
          : endPts.imagesURL + elValue.src
      "
      @drop.prevent="drop"
      @dragover.prevent
      @dragenter.prevent
    />
  </div>
</template>

<script>
export default {
  name: 'Background Image',

  inject: ['endPts', 'grid', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {
    drop(event) {
      this.site.htmlElmnts[this.elKey].src = event.dataTransfer.getData('text');
    },
  },

  created() {
    if (!this.elValue?.style) this.site.htmlElmnts[this.elKey].style = { height: 75 };
    if (!this.elValue?.style?.height) this.site.htmlElmnts[this.elKey].style.height = 75;
  },
};
</script>

<style>
.background-image {
  position: relative;
}
.background-image img {
  object-fit: cover;
  width: 100%;
}
</style>
