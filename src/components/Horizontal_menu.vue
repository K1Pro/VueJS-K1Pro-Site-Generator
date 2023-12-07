<template>
  <div
    v-if="elKey == 'horizontal-menu'"
    :name="elValue.name"
    :class="respToggle ? elKey : elKey + ' responsive'"
    :style="{
      backgroundColor: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor'],
    }"
  >
    <template v-for="(menuItem, index) in elValue['menu-items']">
      <template v-if="loggedIn === null"></template>
      <template v-else-if="loggedIn"
        ><input
          type="text"
          name="email"
          v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['menu-items'][index]" />
        <template v-if="index === elValue['menu-items'].length - 1"
          ><span>Text Color:</span
          ><input
            type="color"
            name="horizontal_menuColor"
            v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']" /><span
            >Background Color:</span
          ><input
            type="color"
            name="horizontal_menuBackgroundColor"
            v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']" /></template
      ></template>
      <template v-else
        ><a
          :href="'#' + menuItem"
          :style="{
            color: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color'],
          }"
          >{{ menuItem }}</a
        >
        <template v-if="index === elValue['menu-items'].length - 1">
          <a class="icon" @click.prevent="respToggle = !respToggle"><i class="fa fa-bars"></i></a></template
      ></template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Horizontal_menu',

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'site']),
  },

  data() {
    return { respToggle: true };
  },

  methods: {},
};
</script>

<style>
.horizontal-menu input {
  margin: 7px 8px;
  padding: 5px;
  width: 40px;
}

.horizontal-menu span {
  /* -webkit-text-stroke: 1px rgb(255, 255, 255); */
}

.horizontal-menu {
  overflow: hidden;
  /* background-color: #333; */
}

.horizontal-menu a {
  float: left;
  display: block;
  /* color: #f2f2f2; */
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.horizontal-menu a:hover {
  background-color: #ddd;
  color: black;
}

.horizontal-menu a.active {
  background-color: #04aa6d;
  color: white;
}

.horizontal-menu .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .horizontal-menu a:not(:first-child) {
    display: none;
  }
  .horizontal-menu a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .horizontal-menu.responsive {
    position: relative;
  }
  .horizontal-menu.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .horizontal-menu.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
