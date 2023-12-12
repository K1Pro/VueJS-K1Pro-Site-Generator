<template>
  <div
    v-if="elKey == 'horizontal-menu'"
    :name="elValue.name"
    :class="elKey"
    :style="{
      backgroundColor: site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']
        ? site.params.htmlElements[elIndex]['horizontal-menu']['style']['backgroundColor']
        : '#808080',
      height:
        windowWidth < respWidth && site.params.htmlElements[elIndex]['horizontal-menu']['responsive']
          ? 50 * site.params.htmlElements[elIndex]['horizontal-menu']['menu-items'].length +
            Number(site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']) +
            'px'
          : site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
      'overflow-x': loggedIn ? 'scroll' : 'hidden',
      'white-space': loggedIn ? 'nowrap' : 'normal',
    }"
  >
    <template v-if="loggedIn === null"></template>
    <template v-else-if="loggedIn">
      <template v-for="(menuItem, index) in elValue['menu-items']">
        <input
          type="text"
          :name="menuItem"
          v-model="site.params.htmlElements[elIndex]['horizontal-menu']['menu-items'][index]"
          :style="{
            width: site.params.htmlElements[elIndex]['horizontal-menu']['menu-items'][index].length * 9 + 'px',
            'margin-top':
              Number(site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']) / 2 - 10 + 'px',
          }"
        />
        <template v-if="index > 1">
          <button class="fa-solid fa-trash-can" @click.prevent="deleteMenuItem(index)"></button>
        </template>
        <template v-if="index === elValue['menu-items'].length - 1">
          <select name="menuChange" v-model="menuChange" @change="menuAction">
            <option value="" disabled selected>Change Menu</option>
            <option value="color">Text Color</option>
            <option value="backgroundColor">Background Color</option>
            <option value="height">Menu Height</option>
            <option value="alignment">Menu Alignment</option>
            <option value="addItem">Add Menu Item</option>
            <!-- <option value="deleteMenu">Delete Menu</option> -->
          </select>
          <template v-if="menuChange.toLowerCase().includes('color')">
            <input
              type="color"
              :name="'horizontal_menu' + menuChange"
              v-model="site.params.htmlElements[elIndex]['horizontal-menu']['style'][menuChange]"
          /></template>
          <template v-if="menuChange == 'height'">
            <input
              type="range"
              min="50"
              max="150"
              :name="'horizontal_menu' + menuChange"
              v-model="site.params.htmlElements[elIndex]['horizontal-menu']['style'][menuChange]"
            />{{ site.params.htmlElements[elIndex]['horizontal-menu']['style'][menuChange] }}
          </template>
          <template v-if="menuChange == 'alignment'">
            <input type="radio" name="menu-alignment" value="left" checked @click="changeMenuAlignment" /><label
              for="left"
              >Left</label
            >
            <input type="radio" name="menu-alignment" value="right" @click="changeMenuAlignment" /><label for="right"
              >Right</label
            >
          </template>
        </template>
      </template>
    </template>
    <!-- Rendered Menu -->
    <template v-else>
      <!-- Menu Logo -->
      <div
        class="logo"
        :style="{
          height: Number(site.params.htmlElements[elIndex]['horizontal-menu']['style']['height']) - 20 + 'px',
        }"
      >
        <img :src="endPts.servrURL + site.params.logo" alt="logo" />
      </div>
      <!-- Menu Logo -->

      <div
        class="horizontal-menu-alignment"
        :style="{
          float:
            windowWidth > respWidth
              ? site.params.htmlElements[elIndex]['horizontal-menu']['style']['alignment']
              : 'none',
        }"
      >
        <div
          v-if="
            windowWidth > respWidth ||
            (windowWidth < respWidth && site.params.htmlElements[elIndex]['horizontal-menu']['responsive'])
          "
          class="horizontal-menu-items"
        >
          <!-- Menu Items -->
          <template v-for="(menuItem, index) in elValue['menu-items']">
            <a
              :href="'#' + menuItem"
              :style="{
                color: site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']
                  ? site.params.htmlElements[elIndex]['horizontal-menu']['style']['color']
                  : '#000000',
                height:
                  windowWidth < respWidth && site.params.htmlElements[elIndex]['horizontal-menu']['responsive']
                    ? '50px'
                    : site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
                'line-height':
                  windowWidth < respWidth && site.params.htmlElements[elIndex]['horizontal-menu']['responsive']
                    ? '50px'
                    : site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
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
      <template v-if="windowWidth < respWidth">
        <a @click.prevent="toggleRespMenu" class="horizontal-menu-icon"
          ><i
            class="fa fa-bars"
            :style="{
              color: site.params.htmlElements[elIndex]['horizontal-menu']['style']['color'],
              height: site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
              'line-height': site.params.htmlElements[elIndex]['horizontal-menu']['style']['height'] + 'px',
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
      'message',
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
    toggleRespMenu() {
      this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'] =
        !this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'];
    },
    deleteMenuItem(menuItemIndex) {
      this.site.params.htmlElements[this.elIndex]['horizontal-menu']['menu-items'].splice(menuItemIndex, 1);
    },
    menuAction(event) {
      if (event.srcElement.selectedOptions[0].value == 'addItem') {
        if (this.site.params.htmlElements[this.elIndex]['horizontal-menu']['menu-items'].length < 10) {
          this.site.params.htmlElements[this.elIndex]['horizontal-menu']['menu-items'].push('');
          this.menuChange = '';
        } else {
          this.menuChange = '';
          this.message = 'Maximum 10 menu items';
        }
      }
    },
    changeMenuAlignment(event) {
      this.site.params.htmlElements[this.elIndex]['horizontal-menu']['style']['alignment'] = event.target.value;
    },
  },
  created() {
    if (this.windowWidth < this.respWidth)
      if (this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'])
        this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'] = false;
  },

  watch: {
    windowWidth(newWindowWidth, oldWindowWidth) {
      if (
        (newWindowWidth > this.respWidth && oldWindowWidth < this.respWidth) ||
        (newWindowWidth < this.respWidth && oldWindowWidth > this.respWidth)
      )
        if (this.site.params.htmlElements[this.elIndex]['horizontal-menu']['responsive'])
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
  min-width: 30px;
  margin: 7px -1px 7px 8px;
  padding: 5px;
  text-align: left;
}

.horizontal-menu button {
  margin: 7px 7px 7px 0px;
  padding: 6px;
}

.horizontal-menu {
  overflow-y: hidden;
  position: relative;
}

.horizontal-menu a {
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
    /* float: right; */
  }
}
</style>
