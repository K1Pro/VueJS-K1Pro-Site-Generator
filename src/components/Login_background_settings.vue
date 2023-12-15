<template>
  <div class="body-background">
    <select name="bodyBackgroundChange" v-model="bodyBackgroundChange" @change="bodyBackgroundAction">
      <option value="" disabled selected>Change Background</option>
      <option value="color">Text Color</option>
      <option value="backgroundColor">Background Color</option>
      <option value="font">Font</option>
    </select>
    <template v-if="bodyBackgroundChange.toLowerCase().includes('color')">
      <input
        type="color"
        :name="'body-background' + bodyBackgroundChange"
        v-model="site.params.body.style[bodyBackgroundChange]"
        @input="backgroundColorChange"
    /></template>
  </div>
</template>

<script>
export default {
  name: 'Body background',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },

  data() {
    return { bodyBackgroundChange: '' };
  },

  methods: {
    bodyBackgroundAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
    },
    backgroundColorChange(event) {
      document.body.style.backgroundColor = event.target.value;
    },
  },
};
</script>

<style>
.body-background select {
  /* margin: 7px 8px 7px 0px; */
  padding: 5px;
}
</style>
