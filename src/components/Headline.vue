<template>
  <div :name="elValue.name" :class="elKey" :style="{ backgroundColor: elValue.style.backgroundColor }">
    <template v-if="loggedIn === true">
      <input
        type="text"
        v-model="site.params.htmlElements[elIndex]['headline']['text']"
        :style="{
          width: site.params.htmlElements[elIndex]['headline']['text'].length * 9 + 'px',
          backgroundColor: site.params.htmlElements[elIndex]['headline']['style']['backgroundColor'],
          color: site.params.htmlElements[elIndex]['headline']['style']['color'],
        }"
        style="border-style: dashed"
      />
      <element_select :selectKey="elKey" :selectIndex="elIndex">{{ elValue.text }}</element_select>
    </template>
    <template v-else>{{ elValue.text }}</template>
  </div>
</template>

<script>
import Element_select from './login/Login_element_select.vue';

export default {
  name: 'Headline',

  components: { Element_select },

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'site']),
  },

  created() {},
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

.headline input[type='text'] {
  padding: 5px;
  text-align: center;
}
</style>
