<template>
  <div class="element-order">
    <template v-for="(element, elementIndex) in site.params.htmlElements">
      <div v-if="elementIndex === site.params.htmlElements.length - 1" class="element-order-items">
        <select name="addElement">
          <option value="headline">Headline</option>
          <option value="icon-slider">Icon slider</option>
        </select>
        <input type="text" placeholder="Name" />
        <div>
          <i class="fa-solid fa-circle-plus" style="color: green"></i>
        </div>
      </div>
      <div v-for="elementName in Object.keys(element)" :name="elementName" class="element-order-items">
        {{ elementName.charAt(0).toUpperCase() }}{{ elementName.slice(1).replaceAll('-', ' ') }}
        <!-- Delete Button -->
        <div v-if="elementName !== 'footer'" @click.prevent="deleteEl(elementIndex)">
          <i class="fa-solid fa-circle-minus" style="color: #ff0000"></i>
        </div>
        <!-- Enable/Disable Button -->
        <div v-if="elementName !== 'footer'">
          <input type="checkbox" checked="checked" />
        </div>
        <!-- Down Button -->
        <div
          v-if="
            elementName !== 'top-menu' &&
            elementName !== 'background-image' &&
            elementName !== 'footer' &&
            !site.params.htmlElements?.[elementIndex + 1]?.['footer']
          "
          @click.prevent="moveDown(elementIndex)"
        >
          <i class="fa-solid fa-circle-down" :name="elementIndex"></i>
        </div>
        <!-- Up Button -->
        <div
          v-if="
            elementName !== 'top-menu' &&
            elementName !== 'background-image' &&
            elementName !== 'footer' &&
            !site.params.htmlElements?.[elementIndex - 1]?.['background-image'] &&
            !site.params.htmlElements?.[elementIndex - 1]?.['top-menu']
          "
          @click.prevent="moveUp(elementIndex)"
        >
          <i class="fa-solid fa-circle-up" :name="elementIndex"></i>
        </div></div
    ></template>
  </div>
</template>

<script>
export default {
  name: 'Element Order',
  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'message', 'site', 'endPts']),
  },
  methods: {
    deleteEl(elementIndex) {
      console.log(this.site.params.htmlElements);
      console.log(elementIndex);

      this.site.params.htmlElements.splice(elementIndex, 1);
    },
    moveDown(elementIndex) {
      const chosenElement = this.site.params.htmlElements[elementIndex];
      this.site.params.htmlElements.splice(elementIndex, 1);
      this.site.params.htmlElements.splice(elementIndex + 1, 0, chosenElement);
    },
    moveUp(elementIndex) {
      const chosenElement = this.site.params.htmlElements[elementIndex];
      this.site.params.htmlElements.splice(elementIndex, 1);
      this.site.params.htmlElements.splice(elementIndex - 1, 0, chosenElement);
    },
  },
};
</script>

<style>
.element-order-items {
  background-color: lightgrey;
  color: black;
  padding: 2px;
  margin-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 20px;
}

.element-order-items div {
  cursor: pointer;
  float: right;
  padding-right: 2px;
  overflow: hidden;
}

.element-order select {
  width: 80px;
  padding: 0px;
}

.element-order input[type='text'] {
  margin-left: 5px;
  width: 60px;
  padding: 0px;
}
</style>
