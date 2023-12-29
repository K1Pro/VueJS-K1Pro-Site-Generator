<template>
  <div class="body-background">
    <div>Logo:</div>
    <input type="file" />
    <hr />
    <div>Icon:</div>
    <input type="file" />
    <hr />
    <div>Background:</div>
    <input type="color" v-model="site.params.body.style.backgroundColor" />
    <hr />
    <div>Text Color:</div>
    <input type="color" />
    <hr />
    <div>Font:</div>
    <select name="Font">
      <option value="Arial">Arial</option>
      <option value="Courier">Courier</option>
      <option value="Times New Roman">Times New Roman</option>
    </select>
    <hr />
    <div>Order:</div>
    <element_order></element_order>
  </div>
</template>

<script>
import Element_order from './Element_order.vue';

export default {
  name: 'Background Settings',

  components: { Element_order },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['message', 'pathname', 'site', 'endPts']),
  },

  methods: {},
};
</script>

<style>
.body-background select {
  /* margin: 7px 8px 7px 0px; */
  padding: 5px;
}
</style>
