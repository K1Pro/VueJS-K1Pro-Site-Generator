<template>
  <div :name="elValue.name" :class="elKey">
    <div class="grid-container">
      <div v-for="icon in elValue['icon-slider-items']" class="grid-item">
        <i :class="icon[1]"></i>
        <p>{{ icon[0] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Image Slider',

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },

  created() {
    console.log(this.elValue);
  },
};
</script>

<style>
.icon-slider {
  position: relative;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  /* background-color: #2196f300; */
  padding: 10px;
  column-gap: 10px;
}

.grid-item {
  background-color: rgb(255, 255, 255);
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
.grid-item p {
  font-size: 20px;
  margin-bottom: -10px;
}
</style>
