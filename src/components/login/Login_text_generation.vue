<template>
  <div class="text-generation">Text Generation</div>
</template>

<script>
export default {
  name: 'Text Generation',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },

  created() {
    console.log('Text Generation');
  },
};
</script>

<style>
.text-generation {
  padding: 10px;
}
</style>
