<template>
  <div
    class="headline"
    :style="{
      fontSize: elValue.style.textSize + 'vh',
    }"
  >
    {{ elValue.text }}
  </div>
</template>

<script>
export default {
  name: 'Headline',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.headline {
  position: relative;
  text-align: center;
  padding: 4vh 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
