<template>
  <li v-for="(menuItem, index) in elValue['menu-items']">
    <template v-if="loggedIn == null"></template>
    <template v-else-if="loggedIn"
      ><input
        type="text"
        name="email"
        v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['menu-items'][index]"
    /></template>
    <template v-else
      ><a href="#">{{ menuItem }}</a></template
    >
  </li>
</template>

<script>
export default {
  name: 'Horizontal_menu',

  props: ['elIndex', 'elValue'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'site']),
  },
};
</script>

<style>
.horizontal-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.horizontal-menu li {
  float: left;
}

.horizontal-menu li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.horizontal-menu li a:hover:not(.active) {
  background-color: #111;
}

.horizontal-menu .active {
  background-color: #04aa6d;
}

.horizontal-menu li input {
  margin: 7px 8px;
  padding: 5px;
  width: 40px;
}
</style>
