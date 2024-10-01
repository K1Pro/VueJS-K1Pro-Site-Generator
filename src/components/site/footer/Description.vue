<template>
  <div class="description">
    <h2>Description</h2>
    <p>{{ this.site.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'Description',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],
};
</script>

<style></style>
