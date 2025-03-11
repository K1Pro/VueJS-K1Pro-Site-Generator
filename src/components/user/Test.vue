<template>
  <div class="test">
    <img :src="slctd.assets_url + '/src/assets/images/' + slctd.type + '/' + slctd.job + '/Academic+Transcript.jpg'" />
  </div>
</template>

<script>
export default {
  name: 'Test',

  inject: ['endPts', 'respWidth', 'wndw', 'site', 'slctd', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.test {
}
</style>
