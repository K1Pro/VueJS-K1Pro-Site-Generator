<template>
  <div class="resp-padding">
    <div class="text-box"><span v-html="elValue.text"></span></div>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.text-box {
  position: relative;
}
</style>
