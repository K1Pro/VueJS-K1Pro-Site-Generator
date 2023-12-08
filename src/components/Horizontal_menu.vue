<template>
  <div
    v-if="elKey == 'horizontal-menu'"
    :name="elValue.name"
    :class="respToggle ? elKey : elKey + ' responsive'"
    :style="{
      backgroundColor: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']
        ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']
        : '#808080',
    }"
  >
    <template v-for="(menuItem, index) in elValue['menu-items']">
      <template v-if="loggedIn === null"></template>
      <template v-else-if="loggedIn"
        ><input
          type="text"
          :name="menuItem"
          v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['menu-items'][index]"
          :style="{
            width: this.site.params.htmlElements[elIndex]['horizontal-menu']['menu-items'][index].length * 9 + 'px',
          }"
        />
        <template v-if="index > 1">
          <button class="fa-solid fa-trash-can" @click.prevent="deleteMenuItem(index)"></button>
        </template>
        <template v-if="index === elValue['menu-items'].length - 1">
          <select name="menuChange" v-model="menuChange">
            <option value="" disabled selected>Change Menu</option>
            <option value="color">Text Color</option>
            <option value="backgroundColor">Background Color</option>
            <option value="addItem">Add Menu Item</option>
            <option value="deleteMenu">Delete Menu</option>
          </select>
          <template v-if="menuChange.toLowerCase().includes('color')">
            <span
              :style="{
                color: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor'],
              }"
              style="filter: invert(100%)"
              >Text Color:</span
            ><input
              type="color"
              :name="'horizontal_menu' + menuChange"
              v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['style'][menuChange]"
          /></template>
        </template>
      </template>
      <template v-else
        ><a
          :href="'#' + menuItem"
          :style="{
            color: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']
              ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']
              : '#000000',
          }"
          >{{ menuItem }}</a
        >
        <template v-if="index === elValue['menu-items'].length - 1">
          <a class="icon" @click.prevent="respToggle = !respToggle"
            ><i
              class="fa fa-bars"
              :style="{
                color: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor'],
              }"
              style="filter: invert(100%)"
            ></i></a></template
      ></template>
    </template>
  </div>
</template>

<script>
// style="color: #ffffff"
export default {
  name: 'Horizontal_menu',

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'site']),
  },

  data() {
    return { respToggle: true, menuChange: '' };
  },

  methods: {
    deleteMenuItem(menuItemIndex) {
      this.site.params.htmlElements[this.elIndex]['horizontal-menu']['menu-items'].splice(menuItemIndex, 1);
    },
  },
};
</script>

<style>
/* span {
  cursor: pointer;
} */
/* .number {
  margin: 100px;
} */
.minus {
  margin-left: 10px;
  margin-right: -10px;
}
.plus {
  margin-left: -10px;
  margin-right: 10px;
}
.minus,
.plus {
  cursor: pointer;
  width: 10px;
  /* height: 0px; */
  background: #ffffff;
  /* border-radius: 4px; */
  padding: 4.5px;
  border: 1px solid #000000;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}

/* input {
  height: 34px;
  width: 100px;
  text-align: center;
  font-size: 26px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
} */

.horizontal-menu select {
  margin: 7px 8px 7px 16px;
  padding: 5px;
}

.horizontal-menu input[type='text'] {
  margin: 7px -1px 7px 8px;
  padding: 5px;
  /* width: auto; */
  /* height: 20px; */
  text-align: left;
}

.horizontal-menu button {
  margin: 7px 7px 7px 0px;
  padding: 6px;
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
