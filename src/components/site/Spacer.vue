<template>
  <div
    class="spacer"
    :style="{
      height: elValue.style.heightVH + 'vh',
    }"
  ></div>
</template>

<script>
export default {
  name: 'Spacer',

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.spacer {
  position: relative;
  padding: 0%;
  margin: 0%;
}
</style>
