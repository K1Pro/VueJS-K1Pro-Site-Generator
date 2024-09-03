<template>
  <div class="top-menu" :style="[elUl]">
    <span class="dimensions">{{ grid.wdth }} px</span>
    <div class="top-menu-logo">
      <img :src="endPts.siteURL + site.logo" alt="logo" :style="logoImg" />
    </div>
    <div :style="[elLi]">
      <div v-for="(menuItem, menuItemIndex) in elValue.items" class="top-menu-links" :style="[elA]">
        <span class="top-menu-link" :style="{ fontSize: elValue.style.fontSize + 'px' }">{{ menuItem }}</span>
        <div class="top-menu-link-items">
          <template v-if="site.htmlElmnts[elKey].types[menuItemIndex] == 'Link'">
            <input type="text" v-model="site.htmlElmnts[elKey].items[menuItemIndex]" :style="[items]" />
          </template>
          <template v-else>
            <select
              v-model="site.htmlElmnts[elKey].items[menuItemIndex]"
              :ref="'menuItemsSelect' + menuItemIndex"
              :style="[items]"
            >
              <option value="Choose page" selected>Choose page</option>
              <option v-for="page in Object.keys(site.pages)">
                {{ page }}
              </option>
            </select></template
          >
        </div>
        <div class="top-menu-link-type">
          <select
            v-model="site.htmlElmnts[elKey].types[menuItemIndex]"
            :style="[typeAndLinks]"
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
            :placeholder="site.htmlElmnts[elKey].types[menuItemIndex] == 'Link' ? 'Link text...' : ''"
            :style="[typeAndLinks]"
            :disabled="site.htmlElmnts[elKey].types[menuItemIndex] != 'Link'"
            v-model="site.htmlElmnts[elKey].links[menuItemIndex]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['endPts', 'grid', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {};
  },

  computed: {
    elUl() {
      return {
        backgroundColor: this.site.body.style.primaryColor,
        height: this.elValue.style.height * 2 + (this.elValue.style.fontSize * 3 + 20) + 'px',
        borderBottom: '1px solid black',
      };
    },
    elLi() {
      return {
        textAlign: this.elValue.style?.alignment,
      };
    },
    elA() {
      return {
        padding: this.elValue.style.height + 'px 20px',
        fontSize: this.elValue.style.fontSize + 'px',
      };
    },
    logoImg() {
      return {
        padding: this.elValue.style.fontSize + 19 + 'px 10px',
        height: this.elValue.style.height * 2 + (this.elValue.style.fontSize * 3 + 19) + 'px',
      };
    },
    items() {
      return {
        fontSize: this.elValue.style.fontSize + 'px',
        marginTop: '-' + (this.elValue.style.fontSize + 4) + 'px',
      };
    },
    typeAndLinks() {
      return { fontSize: this.elValue.style.fontSize + 'px' };
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
  width: 100%;
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
  color: #000; /* Fallback for older browsers */
  color: rgba(0, 0, 0, 0);
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
  border-style: none;
  background: transparent;
}
</style>
