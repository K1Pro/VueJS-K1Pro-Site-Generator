<template>
  <div
    :class="elKey"
    :style="{
      backgroundColor: elValue.style.backgroundColor + elValue.style.opacity,
      height:
        windowWidth < respWidth.md && elValue.responsive
          ? 50 * elValue['menu-items'].length +
            Number(elValue.style.height) +
            'px'
          : elValue.style.height + 'px',
      'overflow-x': loggedIn ? 'scroll' : 'hidden',
      'white-space': loggedIn ? 'nowrap' : 'normal',
      position: loggedIn ? 'relative' : 'fixed',
      'margin-bottom': loggedIn ? '-' + elValue.style.height + 'px' : '0px',
      'text-align': loggedIn ? elValue.style.alignment : 'left',
      'border-width': loggedIn ? '1px 1px 1px 1px' : '0px 0px 1px 0px',
      'border-style': loggedIn ? 'dashed' : 'solid',
      'border-color': loggedIn ? 'black' : 'black',
    }"
  >
    <template v-if="loggedIn === null"></template>
    <template v-else-if="loggedIn">
      <!-- Menu Logo -->
      <div
        v-if="windowWidth > respWidth.md"
        class="logo"
        :style="{
          height: Number(elValue.style.height) - 20 + 'px',
        }"
      >
        <img :src="endPts.siteURL + site.params.logo" alt="logo" />
      </div>
      <!-- Menu Logo -->
      <template v-for="(menuItem, index) in elValue['menu-items']">
        <template v-if="index > 1 && menuChange != 'links'">
          <button
            v-if="index < elValue['menu-items'].length"
            class="minus"
            style="position: absolute"
            :style="{
              'margin-top': Number(elValue.style.height) / 2 - 25 + 'px',
              'margin-left':
                elValue['menu-items'][index].length > 4
                  ? elValue['menu-items'][index].length * 9 + 'px'
                  : '36px',
            }"
            @click.prevent="deleteMenuItem(index)"
          ></button>
        </template>
        <input
          v-if="menuChange != 'links'"
          type="text"
          :id="'top-menu-item-' + index"
          :style="{
            width: elValue['menu-items'][index].length * 9 + 'px',
            'margin-top': Number(elValue.style.height) / 2 - 10 + 'px',
            backgroundColor:
              elValue['menu-items'][index].length < 1 ? '#FFFFFF' : '#FFFFFF00',
            color: elValue.style.color,
            border:
              elValue['menu-items'][index].length < 1
                ? '2px solid rgba(0, 0, 0, 1)'
                : 'none',
            'border-radius': '5px',
          }"
          v-model="
            site.params.htmlElements[elIndex]['top-menu']['menu-items'][index]
          "
        />
        <input
          v-else="menuChange == 'links'"
          type="text"
          :id="'top-menu-item-' + index"
          :style="{
            width: elValue.style.links[index].length * 9 + 'px',
            'margin-top': Number(elValue.style.height) / 2 - 10 + 'px',
            backgroundColor:
              site.params.htmlElements[elIndex]['top-menu']['menu-items'][
                index
              ] == 'Blog' ||
              site.params.htmlElements[elIndex]['top-menu']['menu-items'][
                index
              ] == 'Home'
                ? 'lightgrey'
                : 'white',
            color: elValue.style.color,
            border: '1px solid rgba(0, 0, 0, 1)',
            'border-radius': '0px',
          }"
          :placeholder="
            site.params.htmlElements[elIndex]['top-menu']['menu-items'][
              index
            ] == 'Blog' ||
            site.params.htmlElements[elIndex]['top-menu']['menu-items'][
              index
            ] == 'Home'
              ? site.params.htmlElements[elIndex]['top-menu']['menu-items'][
                  index
                ]
              : '#' +
                site.params.htmlElements[elIndex]['top-menu']['menu-items'][
                  index
                ]
          "
          v-model="
            site.params.htmlElements[elIndex]['top-menu'].style.links[index]
          "
          :disabled="
            site.params.htmlElements[elIndex]['top-menu']['menu-items'][
              index
            ] == 'Blog' ||
            site.params.htmlElements[elIndex]['top-menu']['menu-items'][
              index
            ] == 'Home'
          "
          @keyup="removeAnchor"
        />
        <button
          v-if="
            index === elValue['menu-items'].length - 1 && menuChange != 'links'
          "
          class="plus"
          style="margin: 0px 20px"
          @click.prevent="addItem"
        ></button>

        <template v-if="index === elValue['menu-items'].length - 1">
          <!-- Modify element select and options -->
          <div class="modPosition">
            <select name="menuChange" v-model="menuChange" @change="menuAction">
              <option value="" disabled selected>
                Modify {{ elKey.charAt(0).toUpperCase()
                }}{{ elKey.slice(1).toLowerCase().replaceAll('_', ' ') }}
              </option>
              <element_select
                :selectKey="elKey"
                :selectIndex="elIndex"
              ></element_select>
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
          height: Number(elValue.style.height) - 20 + 'px',
        }"
      >
        <img :src="endPts.siteURL + site.params.logo" alt="logo" />
      </div>
      <!-- Menu Logo -->
      <div
        class="top-menu-alignment"
        :style="{
          float: windowWidth > respWidth.md ? elValue.style.alignment : 'none',
        }"
      >
        <div
          v-if="
            windowWidth > respWidth.md ||
            (windowWidth < respWidth.md && elValue.responsive)
          "
          class="top-menu-items"
        >
          <!-- Menu Items -->
          <template v-for="(menuItem, menuIndex) in elValue['menu-items']">
            <a
              v-if="elValue.style.links[menuIndex] == ''"
              :href="menuItem != 'Blog' ? '#' + menuItem : 'javascript:void(0)'"
              :style="{
                color: elValue.style.color ? elValue.style.color : '#000000',
                height:
                  windowWidth < respWidth.md && elValue.responsive
                    ? '50px'
                    : elValue.style.height + 'px',
                'line-height':
                  windowWidth < respWidth.md && elValue.responsive
                    ? '50px'
                    : elValue.style.height + 'px',
              }"
              @mouseover="highlightMenuItem(true, $event)"
              @mouseout="highlightMenuItem(false, $event)"
              @click="clickMenuItem"
              >{{ menuItem }}</a
            >
            <a
              v-else
              :href="elValue.style.links[menuIndex]"
              :style="{
                color: elValue.style.color ? elValue.style.color : '#000000',
                height:
                  windowWidth < respWidth.md && elValue.responsive
                    ? '50px'
                    : elValue.style.height + 'px',
                'line-height':
                  windowWidth < respWidth.md && elValue.responsive
                    ? '50px'
                    : elValue.style.height + 'px',
              }"
              @mouseover="highlightMenuItem(true, $event)"
              @mouseout="highlightMenuItem(false, $event)"
              target="_blank"
              >{{ menuItem }}</a
            >
          </template>
          <!-- Menu Items -->
        </div>
      </div>

      <!-- Menu Hamburger Button -->
      <template v-if="windowWidth < respWidth.md">
        <a @click.prevent="toggleRespMenu" class="top-menu-icon"
          ><i
            :class="elValue.responsive ? 'fa fa-xmark' : 'fa fa-bars'"
            :style="{
              color: elValue.style.color,
              height: elValue.style.height + 'px',
              'line-height': elValue.style.height + 'px',
            }"
            style="
              padding-left: 16px;
              padding-right: 16px;
              margin-right: -16px;
              margin-left: -16px;
            "
            @mouseover="highlightMenuItem(true, $event)"
            @mouseout="highlightMenuItem(false, $event)"
          ></i></a
      ></template>
      <!-- Menu Hamburger Button -->
    </template>
  </div>
</template>

<script>
import Element_select from './../login/Element_select.vue';
import Element_select_options from './../login/Element_select_options.vue';

export default {
  name: 'Top Menu',

  props: ['elKey', 'elValue', 'elIndex'],

  components: { Element_select, Element_select_options },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'msg',
      'windowWidth',
      'respWidth',
      'site',
      'endPts',
    ]),
  },

  data() {
    return { menuChange: '', menuItemAdded: false };
  },

  methods: {
    addItem() {
      this.menuItemAdded = true;
      if (
        this.site.params.htmlElements[this.elIndex]['top-menu']['menu-items']
          .length < 10
      ) {
        this.site.params.htmlElements[this.elIndex]['top-menu'][
          'menu-items'
        ].push('');
        this.menuChange = '';
      } else {
        this.menuChange = '';
        this.msg.snackBar = 'Maximum 10 menu items';
      }
    },
    highlightMenuItem(isHovering, event) {
      if (isHovering) {
        event.target.style.backgroundColor =
          this.site.params.htmlElements[this.elIndex][
            'top-menu'
          ].style.backgroundColor;
        this.site.params.htmlElements[this.elIndex]['top-menu'].style
          .backgroundColor == '#000000'
          ? (event.target.style.backgroundColor = '#878787')
          : (event.target.style.filter = 'brightness(90%)');
      } else {
        if (
          this.site.params.htmlElements[this.elIndex]['top-menu'].style
            .opacity != ''
        ) {
          event.target.style.backgroundColor =
            this.site.params.htmlElements[this.elIndex]['top-menu'].style
              .backgroundColor + '00';
        } else {
          event.target.style.backgroundColor =
            this.site.params.htmlElements[this.elIndex][
              'top-menu'
            ].style.backgroundColor;
        }
        event.target.style.filter = 'none';
      }
    },
    clickMenuItem(event) {
      this.toggleRespMenu();
      console.log(event.target);
      if (event.target.innerHTML == 'Blog') {
        this.site.isValid = 'blog';
        window.history.pushState(null, null, this.endPts.href + '/blog');
      } else {
        this.site.isValid = 'true';
        window.history.pushState(null, null, this.endPts.href);
      }
    },
    toggleRespMenu() {
      this.site.params.htmlElements[this.elIndex]['top-menu'].responsive =
        !this.site.params.htmlElements[this.elIndex]['top-menu'].responsive;
    },
    deleteMenuItem(menuItemIndex) {
      this.site.params.htmlElements[this.elIndex]['top-menu'][
        'menu-items'
      ].splice(menuItemIndex, 1);
    },
    menuAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
    },
    removeAnchor(event) {
      if (
        this.site.params.anchors.includes(event.target.placeholder.slice(1))
      ) {
        const existingAnchors = this.site.params.anchors.filter(
          (el) => el !== event.target.placeholder.slice(1)
        );
        this.site.params.anchors = existingAnchors;
        this.site.params.htmlElements.forEach((el, index) => {
          if (
            event.target.placeholder.slice(1) ==
            Object.entries(el)[0][1]?.style?.anchor
          ) {
            this.site.params.htmlElements[index][
              Object.entries(el)[0][0]
            ].style.anchor = '';
          }
        });
      }
    },
  },
  created() {
    if (this.windowWidth < this.respWidth.md)
      this.site.params.htmlElements[this.elIndex][
        'top-menu'
      ].responsive = false;
  },

  updated() {
    if (
      this.menuItemAdded &&
      this.site.params.htmlElements[this.elIndex]['top-menu']['menu-items']
        .length < 10
    ) {
      document
        .getElementById(
          `top-menu-item-${
            this.site.params.htmlElements[this.elIndex]['top-menu'][
              'menu-items'
            ].length - 1
          }`
        )
        .focus();
      this.menuItemAdded = false;
    }
  },

  watch: {
    windowWidth(newWindowWidth, oldWindowWidth) {
      // This closes the responsive menu if window width changes from mobile to full and vice-versa.
      if (
        (newWindowWidth > this.respWidth.md &&
          oldWindowWidth < this.respWidth.md) ||
        (newWindowWidth < this.respWidth.md &&
          oldWindowWidth > this.respWidth.md)
      )
        this.site.params.htmlElements[this.elIndex][
          'top-menu'
        ].responsive = false;
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
  margin: 7px 0px 7px 8px;
  padding: 5px;
  text-align: left;
}

.top-menu button {
  /* margin-left: 55px;
  margin-top: 30px; */
  cursor: pointer;
}

.top-menu {
  overflow-y: hidden;
  z-index: 4;
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
