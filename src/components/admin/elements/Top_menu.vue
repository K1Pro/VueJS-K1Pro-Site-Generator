<template>
  <div class="top-menu" :style="[elUl, el.Ul]">
    <div class="top-menu-logo">
      <img :src="endPts.siteURL + site.logo" alt="logo" :style="logoImg" />
    </div>
    <div :style="[elLi]">
      <div v-for="(menuItem, menuItemIndex) in elValue.items" class="top-menu-links" :style="[elA, el.A]">
        <span class="top-menu-link" :style="{ fontSize: elValue.style.fontSize + 'px' }">{{ menuItem }}</span>
        <div class="top-menu-link-items">
          <template v-if="site.htmlElmnts[elKey].types[menuItemIndex] == 'Link'">
            <input
              type="text"
              v-model="site.htmlElmnts[elKey].items[menuItemIndex]"
              :style="{
                fontSize: elValue.style.fontSize + 'px',
                'margin-top': '-' + (elValue.style.fontSize + 4) + 'px',
              }"
            />
          </template>
          <template v-else>
            <select
              v-model="site.htmlElmnts[elKey].items[menuItemIndex]"
              :ref="'menuItemsSelect' + menuItemIndex"
              :style="{
                fontSize: elValue.style.fontSize + 'px',
                'margin-top': '-' + (elValue.style.fontSize + 4) + 'px',
              }"
            >
              <option value="Choose page" selected>Choose page</option>
              <option v-for="page in Object.keys(site.pages)">{{ page }}</option>
            </select></template
          >
        </div>
        <div class="top-menu-link-type">
          <select
            v-model="site.htmlElmnts[elKey].types[menuItemIndex]"
            :style="{ fontSize: elValue.style.fontSize + 'px' }"
            @change="changeLink($event, menuItemIndex)"
          >
            <option>Page</option>
            <!-- <option>Anchor</option> -->
            <option>Link</option>
          </select>
        </div>
        <div class="top-menu-link-links">
          <input
            type="text"
            v-model="site.htmlElmnts[elKey].links[menuItemIndex]"
            :style="{ fontSize: elValue.style.fontSize + 'px' }"
            :disabled="site.htmlElmnts[elKey].types[menuItemIndex] != 'Link'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['endPts', 'grid', 'patchSite', 'respWidth', 'site', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {};
  },

  computed: {
    el() {
      const elStyles = {};
      Object.entries(this.elValue.style).forEach(([elStyleKey, elStyleValue]) => {
        if (elStyleKey.includes('-')) {
          elStyles[elStyleKey.split('-')[0]]
            ? (elStyles[elStyleKey.split('-')[0]][elStyleKey.split('-')[1]] = elStyleValue)
            : (elStyles[elStyleKey.split('-')[0]] = { [elStyleKey.split('-')[1]]: elStyleValue });
        }
      });
      return elStyles;
    },
    elUl() {
      return {
        backgroundColor: this.site.body.style.primaryColor,
        width: this.wndw.wdth < this.respWidth.md ? this.grid.wdth + 'px' : this.grid.wdth - 16 + 'px',
        height: this.elValue.style.height * 2 + (this.elValue.style.fontSize * 3 + 20) + 'px',
      };
    },
    elLi() {
      return {
        textAlign: this.elValue.style?.alignment,
      };
    },
    elA() {
      return {
        padding: this.elValue.style.height + 1 + 'px 20px',
        fontSize: this.elValue.style.fontSize + 'px',
      };
    },
    logoImg() {
      return {
        padding: this.elValue.style.fontSize + 19 + 'px 10px',
        height: this.elValue.style.height * 2 + (this.elValue.style.fontSize * 3 + 19) + 'px',
      };
    },
  },
  methods: {
    changeLink(event, menuItemIndex) {
      if (event.target.value == 'Link') {
        this.site.htmlElmnts[this.elKey].items[menuItemIndex] = 'Type text';
      } else if (event.target.value == 'Page') {
        this.site.htmlElmnts[this.elKey].items[menuItemIndex] = 'Choose page';
        this.$refs['menuItemsSelect' + menuItemIndex][0].selectedIndex = 0;
      }
      this.site.htmlElmnts[this.elKey].links[menuItemIndex] = '';
    },
  },
};
</script>

<style>
.top-menu {
  z-index: 4;
  list-style-type: none;
  display: inline-block;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
}
.top-menu select {
  height: 25px;
}
.top-menu-logo {
  float: left;
}
.top-menu-links {
  display: inline-block;
  text-align: left;
}
.top-menu-link {
  padding-left: 2px;
  padding-right: 25px;
}
.top-menu-link-items,
.top-menu-link-links,
.top-menu-link-type {
  display: flex;
}
.top-menu-link-items input,
.top-menu-link-items select,
.top-menu-link-links input,
.top-menu-link-type select {
  flex-grow: 1;
  width: 0;
}
</style>
