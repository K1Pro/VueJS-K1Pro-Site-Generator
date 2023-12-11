<template>
  <div
    v-if="elKey == 'horizontal-menu'"
    :name="elValue.name"
    :class="elKey"
    :style="{
      backgroundColor: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']
        ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']
        : '#808080',
      height: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']
        ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px'
        : '100px',
    }"
  >
    <template v-if="loggedIn === null"></template>
    <template v-else-if="loggedIn">
      <template v-for="(menuItem, index) in elValue['menu-items']">
        <input
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
            <option value="height">Menu Height</option>
            <option value="addItem">Add Menu Item</option>
            <option value="deleteMenu">Delete Menu</option>
          </select>
          <template v-if="menuChange.toLowerCase().includes('color')">
            <input
              type="color"
              :name="'horizontal_menu' + menuChange"
              v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['style'][menuChange]"
          /></template>
          <template v-if="menuChange == 'height'">
            <input
              type="number"
              :name="'horizontal_menu' + menuChange"
              v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['style'][menuChange]"
          /></template>
        </template>
      </template>
    </template>
    <!-- Rendered Menu Items -->
    <template v-else>
      <div
        class="logo"
        :style="{
          height: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']
            ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px'
            : '100px',
        }"
      >
        <img :src="this.endPts.servrURL + '../protected/' + this.site.site + '/logo/logo.png'" alt="" />
      </div>

      <div class="horizontal-menu-alignment">
        <div
          class="horizontal-menu-items"
          :style="{
            display: respToggle ? 'none' : 'block',
          }"
        >
          <template v-for="(menuItem, index) in elValue['menu-items']">
            <a
              :href="'#' + menuItem"
              :style="{
                color: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']
                  ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']
                  : '#000000',
              }"
              @mouseover="highlightMenuItem(true, $event)"
              @mouseout="highlightMenuItem(false, $event)"
              >{{ menuItem }}</a
            >
          </template>
        </div>
      </div>

      <!-- Responsive Hamburger Menu -->
      <template v-if="windowWidth < 700">
        <a @click.prevent="respToggle = !respToggle" class="horizontal-menu-icon"
          ><i
            class="fa fa-bars"
            :style="{
              color: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor'],
              height: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']
                ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px'
                : '100px',
            }"
            style="filter: invert(100%)"
          ></i></a
      ></template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Horizontal_menu',

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'windowWidth',
      'site',
      'endPts',
      'onScreenResize',
      'updateScreenWidth',
    ]),
  },

  data() {
    return { respToggle: true, menuChange: '' };
  },

  methods: {
    deleteMenuItem(menuItemIndex) {
      this.site.params.htmlElements[this.elIndex]['horizontal-menu']['menu-items'].splice(menuItemIndex, 1);
    },

    highlightMenuItem(isHovering, event) {
      if (isHovering) {
        event.target.style.backgroundColor =
          this.site.params.htmlElements[this.elIndex]['horizontal-menu']['style']['backgroundColor'];
        this.site.params.htmlElements[this.elIndex]['horizontal-menu']['style']['backgroundColor'] == '#000000'
          ? (event.target.style.backgroundColor = '#878787')
          : (event.target.style.filter = 'brightness(90%)');
      } else {
        event.target.style.backgroundColor =
          this.site.params.htmlElements[this.elIndex]['horizontal-menu']['style']['backgroundColor'];
        event.target.style.filter = 'none';
      }
    },
  },

  watch: {
    windowWidth(newWindowWidth, oldWindowWidth) {
      this.respToggle = newWindowWidth > 700 ? false : true;
    },
  },
};
</script>

<style>
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

.horizontal-menu {
  overflow: hidden;
  position: relative;
  /* background-color: #333; */
  /* height: 100px; */
}

.horizontal-menu-items {
  display: none;
}

.horizontal-menu a {
  cursor: pointer;
  float: none; /* change this dynamic alignment */
  display: block;
  /* color: #f2f2f2; */
  /* text-align: center; */
  padding: 14px 16px;
  text-decoration: none;
  font-size: 18px;
  /* height: 100px; */
  /* transition: width 2s, height 2s, transform 2s; */
}

.horizontal-menu-icon {
  /* background: black; */
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

/* .horitzontal-menu-icon {
  display: none;
} */

.horizontal-menu a:hover {
  /* transform: rotate(180deg); */
  /* filter: invert(50%); */
  /* background-color: #ff0000; */
  /* color: black; */
}

.horizontal-menu a.active {
  background-color: #04aa6d;
  color: white;
}

img {
  height: 25%;
  /* max-width: auto; */
}

@media only screen and (min-width: 700px) {
  .horizontal-menu-alignment {
    float: right;
  }
  .horizontal-menu a {
    float: left;
  }
  .horizontal-menu-items {
    display: block;
  }
  .logo {
    float: left;
    /* padding: 5px; */
  }
}

/* @media screen and (max-width: 600px) {
  .horizontal-menu a:not(:first-child) {
    display: none;
  }
  .horizontal-menu a.icon {
    float: left; 
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .horizontal-menu.responsive {
    position: relative;
  }
  .horizontal-menu.responsive .icon {
    position: absolute;
    left: 0; 
    top: 0;
  }
  .horizontal-menu.responsive a {
    float: none;
    display: block;
    text-align: right; 
  }
} */
</style>
