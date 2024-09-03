<template>
  <div
    class="headline"
    :style="{
      fontSize: elValue.style.textSize + 'px',
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
  padding: 30px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
