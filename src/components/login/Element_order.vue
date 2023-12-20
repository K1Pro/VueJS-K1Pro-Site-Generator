<template>
  <div class="element-order">
    <template v-for="(element, elementIndex) in site.params.htmlElements">
      <div v-for="elementName in Object.keys(element)" :name="elementName" class="element-order-items">
        {{ elementName.charAt(0).toUpperCase() }}{{ elementName.slice(1).replaceAll('-', ' ') }}
        <span v-if="elementName !== 'footer'" :name="elementIndex"
          ><i class="fa-solid fa-circle-minus" style="color: #ff0000"></i
        ></span>
        <span v-if="elementName !== 'footer'" :name="elementIndex">
          <input type="checkbox" checked="checked" />
        </span>
        <span
          v-if="elementName !== 'top-menu' && elementName !== 'background-image' && elementName !== 'footer'"
          :name="elementIndex"
          ><i class="fa-solid fa-circle-down"></i
        ></span>
        <span
          v-if="elementName !== 'top-menu' && elementName !== 'background-image' && elementName !== 'footer'"
          :name="elementIndex"
          ><i class="fa-solid fa-circle-up"></i
        ></span></div
    ></template>
  </div>
</template>

<script>
export default {
  name: 'Element Order',
  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'message', 'site', 'endPts']),
  },
};
</script>

<style>
.element-order-items {
  background-color: lightgrey;
  color: black;
  padding: 5px;
  margin-top: 5px;
}

.element-order-items span {
  float: right;
  padding-right: 5px;
}
</style>
