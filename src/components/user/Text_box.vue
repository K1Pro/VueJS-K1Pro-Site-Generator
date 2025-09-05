<template>
  <div class="text-box">Text box</div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['endPts', 'respWidth', 'site', 'slctd', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.text-box {
}
</style>
