<template>
  <div class="text-generation">Text Generation</div>
</template>

<script>
export default {
  name: 'Text Generation',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },
};
</script>

<style>
.text-generation {
  padding: 10px;
}
</style>
