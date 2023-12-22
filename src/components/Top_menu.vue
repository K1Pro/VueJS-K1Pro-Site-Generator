<template>
  <div
    :name="elValue.name"
    :class="elKey"
    :style="{
      backgroundColor:
        site.params.htmlElements[elIndex]['top-menu']['style']['backgroundColor'] +
        site.params.htmlElements[elIndex]['top-menu']['style']['opacity'],
      height:
        windowWidth < respWidth && site.params.htmlElements[elIndex]['top-menu']['responsive']
          ? 50 * site.params.htmlElements[elIndex]['top-menu']['menu-items'].length +
            Number(site.params.htmlElements[elIndex]['top-menu']['style']['height']) +
            'px'
          : site.params.htmlElements[elIndex]['top-menu']['style']['height'] + 'px',
      'overflow-x': loggedIn ? 'scroll' : 'hidden',
      'white-space': loggedIn ? 'nowrap' : 'normal',
      position: loggedIn ? 'relative' : 'absolute',
      marginBottom: loggedIn ? '-' + site.params.htmlElements[elIndex]['top-menu']['style']['height'] + 'px' : '0px',
      'text-align': loggedIn ? site.params.htmlElements[elIndex]['top-menu']['style']['alignment'] : 'left',
      'border-width': loggedIn ? '1px 1px 1px 1px' : 'none',
      'border-style': loggedIn ? 'dashed' : 'none',
      'border-color': loggedIn ? 'black' : 'none',
    }"
  >
    <template v-if="loggedIn === null"></template>
    <template v-else-if="loggedIn">
      <!-- Menu Logo -->
      <div
        v-if="windowWidth > respWidth"
        class="logo"
        :style="{
          height: Number(site.params.htmlElements[elIndex]['top-menu']['style']['height']) - 20 + 'px',
        }"
      >
        <img :src="endPts.servrURL + site.params.logo" alt="logo" />
      </div>
      <!-- Menu Logo -->
      <template v-for="(menuItem, index) in elValue['menu-items']">
        <input
          type="text"
          :name="menuItem"
          v-model="site.params.htmlElements[elIndex]['top-menu']['menu-items'][index]"
          :style="{
            width: site.params.htmlElements[elIndex]['top-menu']['menu-items'][index].length * 9 + 'px',
            'margin-top': Number(site.params.htmlElements[elIndex]['top-menu']['style']['height']) / 2 - 10 + 'px',
            backgroundColor: '#FFFFFF00',
            color: site.params.htmlElements[elIndex]['top-menu']['style']['color'],
          }"
          style="border: none"
        />
        <template v-if="index > 1">
          <button
            class="fa-solid fa-circle-minus"
            style="color: #ff0000"
            @click.prevent="deleteMenuItem(index)"
          ></button>
        </template>
        <template v-if="index === elValue['menu-items'].length - 1">
          <!-- Modify element select and options -->
          <div class="modPosition">
            <select name="menuChange" v-model="menuChange" @change="menuAction">
              <option value="" disabled selected>
                Modify {{ elKey.charAt(0).toUpperCase() }}{{ elKey.slice(1).toLowerCase().replaceAll('_', ' ') }}
              </option>
              <option value="addItem">Add Menu Item</option>
              <element_select :selectKey="elKey" :selectIndex="elIndex"></element_select>
              <!-- Custom select options here -->
            </select>
            <div class="modChange">
              <element_select_options
                :selectKey="elKey"
                :selectIndex="elIndex"
                :selectChange="menuChange"
              ></element_select_options>
            </div>
          </div>
          <!-- Modify element select and options -->
        </template>
      </template>
    </template>
    <!-- Rendered Menu -->
    <template v-else>
      <!-- Menu Logo -->
      <div
        class="logo"
        :style="{
          height: Number(site.params.htmlElements[elIndex]['top-menu']['style']['height']) - 20 + 'px',
        }"
      >
        <img :src="endPts.servrURL + site.params.logo" alt="logo" />
      </div>
      <!-- Menu Logo -->

      <div
        class="top-menu-alignment"
        :style="{
          float: windowWidth > respWidth ? site.params.htmlElements[elIndex]['top-menu']['style']['alignment'] : 'none',
        }"
      >
        <div
          v-if="
            windowWidth > respWidth ||
            (windowWidth < respWidth && site.params.htmlElements[elIndex]['top-menu']['responsive'])
          "
          class="top-menu-items"
        >
          <!-- Menu Items -->
          <template v-for="(menuItem, index) in elValue['menu-items']">
            <a
              :href="'#' + menuItem"
              :style="{
                color: site.params.htmlElements[elIndex]['top-menu']['style']['color']
                  ? site.params.htmlElements[elIndex]['top-menu']['style']['color']
                  : '#000000',
                height:
                  windowWidth < respWidth && site.params.htmlElements[elIndex]['top-menu']['responsive']
                    ? '50px'
                    : site.params.htmlElements[elIndex]['top-menu']['style']['height'] + 'px',
                'line-height':
                  windowWidth < respWidth && site.params.htmlElements[elIndex]['top-menu']['responsive']
                    ? '50px'
                    : site.params.htmlElements[elIndex]['top-menu']['style']['height'] + 'px',
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
        <a @click.prevent="toggleRespMenu" class="top-menu-icon"
          ><i
            class="fa fa-bars"
            :style="{
              color: site.params.htmlElements[elIndex]['top-menu']['style']['color'],
              height: site.params.htmlElements[elIndex]['top-menu']['style']['height'] + 'px',
              'line-height': site.params.htmlElements[elIndex]['top-menu']['style']['height'] + 'px',
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
import Element_select from './login/Login_element_select.vue';
import Element_select_options from './login/Login_element_select_options.vue';

export default {
  name: 'Top Menu',

  props: ['elKey', 'elValue', 'elIndex'],

  components: { Element_select, Element_select_options },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'message', 'windowWidth', 'respWidth', 'site', 'endPts']),
  },

  data() {
    return { menuChange: '' };
  },

  methods: {
    highlightMenuItem(isHovering, event) {
      if (isHovering) {
        event.target.style.backgroundColor =
          this.site.params.htmlElements[this.elIndex]['top-menu']['style']['backgroundColor'];
        this.site.params.htmlElements[this.elIndex]['top-menu']['style']['backgroundColor'] == '#000000'
          ? (event.target.style.backgroundColor = '#878787')
          : (event.target.style.filter = 'brightness(90%)');
      } else {
        if (this.site.params.htmlElements[this.elIndex]['top-menu']['style']['opacity'] != '') {
          event.target.style.backgroundColor =
            this.site.params.htmlElements[this.elIndex]['top-menu']['style']['backgroundColor'] + '00';
        } else {
          event.target.style.backgroundColor =
            this.site.params.htmlElements[this.elIndex]['top-menu']['style']['backgroundColor'];
        }
        event.target.style.filter = 'none';
      }
    },
    toggleRespMenu() {
      this.site.params.htmlElements[this.elIndex]['top-menu']['responsive'] =
        !this.site.params.htmlElements[this.elIndex]['top-menu']['responsive'];
    },
    deleteMenuItem(menuItemIndex) {
      this.site.params.htmlElements[this.elIndex]['top-menu']['menu-items'].splice(menuItemIndex, 1);
    },
    menuAction(event) {
      if (event.srcElement.selectedOptions[0].value == 'addItem') {
        if (this.site.params.htmlElements[this.elIndex]['top-menu']['menu-items'].length < 10) {
          this.site.params.htmlElements[this.elIndex]['top-menu']['menu-items'].push('');
          this.menuChange = '';
        } else {
          this.menuChange = '';
          this.message = 'Maximum 10 menu items';
        }
      }
    },
  },
  created() {
    if (this.windowWidth < this.respWidth)
      this.site.params.htmlElements[this.elIndex]['top-menu']['responsive'] = false;
  },

  watch: {
    windowWidth(newWindowWidth, oldWindowWidth) {
      if (
        (newWindowWidth > this.respWidth && oldWindowWidth < this.respWidth) ||
        (newWindowWidth < this.respWidth && oldWindowWidth > this.respWidth)
      )
        this.site.params.htmlElements[this.elIndex]['top-menu']['responsive'] = false;
    },
  },
};
</script>

<style>
.top-menu select {
  margin: 7px 8px 7px 16px;
  padding: 5px;
}

.top-menu input[type='text'] {
  min-width: 30px;
  margin: 7px -1px 7px 8px;
  padding: 5px;
  text-align: left;
}

.top-menu button {
  margin: 7px 7px 7px 0px;
  padding: 6px;
}

.top-menu {
  overflow-y: hidden;
  /* position: absolute; */
  z-index: 4;
  /* top: 0; */
  width: 100%;
}

.top-menu::-webkit-scrollbar-track {
  background: #ffffff00;
}

.top-menu a {
  float: none; /* change this dynamic alignment */
  display: block;
  padding-left: 16px;
  padding-right: 16px;
  text-decoration: none;
  font-size: 18px;
  /* transition: width 2s, height 2s, transform 2s; */
}

.top-menu a.active {
  background-color: #04aa6d;
  color: white;
}

.top-menu-icon {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

.top-menu-items {
  display: block;
}

.logo {
  padding: 10px;
}

img {
  height: 100%;
}

.modPosition {
  position: absolute;
  top: 0;
  left: 5px;
  text-align: left;
}

.modPosition input[type='color'] {
  width: 150px;
}

.modPosition select {
  width: 150px;
  padding: 3px;
  margin: 0px;
}

.modChange {
  background-color: white;
  width: 150px;
}
.modChange input[type='range'] {
  width: 75%;
}

@media only screen and (min-width: 650px) {
  .top-menu a {
    float: left;
  }
  .logo {
    float: left;
  }
  /* .top-menu-alignment {
    float: right;
  } */
}
</style>
