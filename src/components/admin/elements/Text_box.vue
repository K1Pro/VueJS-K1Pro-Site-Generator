<template>
  <div :id="elKey" class="text-box" :style="{ 'grid-template-rows': site.htmlElmnts[elKey].style.height + 'vh' }">
    <edit_menu :elKey="elKey" :options="['align', 'height']"></edit_menu>
    <div class="text-box-items">1</div>
    <div class="text-box-items">2</div>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.text-box {
  position: relative;
  display: grid;
  grid-template-columns: 33.33% 66.66%;
  padding: 0px 10%;
}
.text-box-items {
  border: 1px solid black;
  padding: 10px;
  font-size: 30px;
  text-align: center;
}
</style>
