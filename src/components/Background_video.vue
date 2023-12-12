<template>
  <div v-if="elKey == 'background-video'" :class="elKey"></div>
</template>

<script>
export default {
  name: 'Background_video',

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style lang="scss" scoped></style>
