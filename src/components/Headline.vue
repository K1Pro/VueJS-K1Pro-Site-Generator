<template>
  <div :name="elValue.name" :class="elKey" :style="{ backgroundColor: elValue.backgroundColor }">
    {{ elValue.text }}
  </div>
</template>

<script>
export default {
  name: 'Headline',

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },

  created() {
    console.log('headline');
  },
};
</script>

<style>
.headline {
  position: relative;
  text-align: center;
  padding: 10px;
  /* background-color: rgb(174, 46, 142); */
  font-size: 2.5vw;
}
</style>
