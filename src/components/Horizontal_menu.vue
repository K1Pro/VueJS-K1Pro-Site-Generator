<template>
  <div
    v-if="elKey == 'horizontal-menu'"
    :name="elValue.name"
    :class="elKey"
    :style="{
      backgroundColor: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']
        ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']
        : '#808080',
      height:
        windowWidth < this.respWidth && this.site.params.htmlElements[elIndex]['horizontal-menu']['responsive']
          ? 50 * this.site.params.htmlElements[this.elIndex]['horizontal-menu']['menu-items'].length +
            Number(this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']) +
            'px'
          : this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
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
            'margin-top':
              Number(this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']) / 2 - 10 + 'px',
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
              type="range"
              min="50"
              max="150"
              :name="'horizontal_menu' + menuChange"
              v-model="this.site.params.htmlElements[elIndex]['horizontal-menu']['style'][menuChange]"
            />{{ this.site.params.htmlElements[elIndex]['horizontal-menu']['style'][menuChange] }}</template
          >
        </template>
      </template>
    </template>
    <!-- Rendered Menu -->
    <template v-else>
      <!-- Menu Logo -->
      <div
        class="logo"
        :style="{
          height: Number(this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']) - 20 + 'px',
        }"
      >
        <img :src="this.endPts.servrURL + '../protected/' + this.site.site + '/logo/logo.png'" alt="" />
      </div>
      <!-- Menu Logo -->

      <div class="horizontal-menu-alignment">
        <div
          v-if="
            windowWidth > this.respWidth ||
            (windowWidth < this.respWidth && this.site.params.htmlElements[elIndex]['horizontal-menu']['responsive'])
          "
          class="horizontal-menu-items"
        >
          <!-- Menu Items -->
          <template v-for="(menuItem, index) in elValue['menu-items']">
            <a
              :href="'#' + menuItem"
              :style="{
                color: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']
                  ? this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']
                  : '#000000',
                height:
                  windowWidth < this.respWidth &&
                  this.site.params.htmlElements[elIndex]['horizontal-menu']['responsive']
                    ? '50px'
                    : this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
                'line-height':
                  windowWidth < this.respWidth &&
                  this.site.params.htmlElements[elIndex]['horizontal-menu']['responsive']
                    ? '50px'
                    : this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
              }"
              @mouseover="highlightMenuItem(true, $event)"
              @mouseout="highlightMenuItem(false, $event)"
              >{{ menuItem }}</a
            >
          </template>
          <!-- Menu Items -->
        </div>
      </div>

      <!-- Menu Hamburger Button -->
      <template v-if="windowWidth < this.respWidth">
        <a @click.prevent="toggleRespMenu" class="horizontal-menu-icon"
          ><i
            class="fa fa-bars"
            :style="{
              color: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['color'],
              height: this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
              'line-height': this.site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
            }"
            style="padding-left: 16px; padding-right: 16px; margin-right: -16px; margin-left: -16px"
            @mouseover="highlightMenuItem(true, $event)"
            @mouseout="highlightMenuItem(false, $event)"
          ></i></a
      ></template>
      <!-- Menu Hamburger Button -->
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
      'respWidth',
      'site',
      'endPts',
      'onScreenResize',
      'updateScreenWidth',
    ]),
  },

  data() {
    return { menuChange: '' };
  },

  methods: {
    toggleRespMenu() {
      this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'] =
        !this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'];
    },
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
  created() {
    if (this.windowWidth < this.respWidth)
      this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'] = false;
  },

  watch: {
    windowWidth(newWindowWidth, oldWindowWidth) {
      if (
        (newWindowWidth > this.respWidth && oldWindowWidth < this.respWidth) ||
        (newWindowWidth < this.respWidth && oldWindowWidth > this.respWidth)
      )
        this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'] = false;
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
  text-align: left;
}

.horizontal-menu button {
  margin: 7px 7px 7px 0px;
  padding: 6px;
}

.horizontal-menu {
  overflow: hidden;
  position: relative;
}

.horizontal-menu a {
  cursor: pointer;
  float: none; /* change this dynamic alignment */
  display: block;
  padding-left: 16px;
  padding-right: 16px;
  text-decoration: none;
  font-size: 18px;
  /* transition: width 2s, height 2s, transform 2s; */
}

.horizontal-menu a.active {
  background-color: #04aa6d;
  color: white;
}

.horizontal-menu-icon {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

.horizontal-menu-items {
  display: block;
}

.logo {
  padding: 10px;
}

img {
  height: 100%;
}

@media only screen and (min-width: 650px) {
  .horizontal-menu a {
    float: left;
  }
  .logo {
    float: left;
  }
  .horizontal-menu-alignment {
    float: right;
  }
}
</style>
