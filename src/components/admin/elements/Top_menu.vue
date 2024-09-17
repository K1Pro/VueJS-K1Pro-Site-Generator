<template>
  <div
    :id="elKey"
    class="top-menu"
    :style="[style.primaryColor.backgroundColor, style.primaryColor.outline.borderColor, elUl]"
    ref="topMenu"
  >
    <span class="dim" :style="[style.primaryColor.outline.color]">{{ grid.wdth }} px * {{ grid.hght }} px</span>
    <div class="top-menu-logo" :style="logoImg">
      <img :src="endPts.siteURL + site.logo" alt="logo" />
    </div>
    <div :style="[elLi]">
      <div
        v-for="(menuItem, menuItemIndex) in elValue.items"
        class="top-menu-links"
        :style="[elA, style.primaryColor.outline.borderColor]"
      >
        <i
          class="fa-solid fa-circle-minus redWhiteMinus"
          style="position: absolute; right: 10px; top: -3px"
          @click="removeItem(menuItemIndex)"
        ></i>
        <div class="top-menu-link">{{ menuItem }}</div>

        <div class="top-menu-link-items">
          <input
            v-if="site.htmlElmnts[elKey].types[menuItemIndex] == 'Link'"
            type="text"
            v-model="site.htmlElmnts[elKey].items[menuItemIndex]"
            :style="[allInputs]"
          />
          <select
            v-else
            v-model="site.htmlElmnts[elKey].items[menuItemIndex]"
            :ref="'menuItemsSelect' + menuItemIndex"
            :style="[allInputs]"
          >
            <option value="Choose page" selected>Choose page</option>
            <option v-for="page in Object.keys(site.pages)">
              {{ page }}
            </option>
          </select>
        </div>

        <div class="top-menu-link-type">
          <select
            v-model="site.htmlElmnts[elKey].types[menuItemIndex]"
            @change="changeLink($event, menuItemIndex)"
            :style="[allInputs]"
          >
            <option>Page</option>
            <!-- <option>Anchor</option> -->
            <option>Link</option>
          </select>
        </div>

        <div class="top-menu-link-links">
          <input
            type="text"
            :style="[allInputs]"
            :placeholder="site.htmlElmnts[elKey].types[menuItemIndex] == 'Link' ? 'Link text...' : ''"
            :disabled="site.htmlElmnts[elKey].types[menuItemIndex] != 'Link'"
            v-model="site.htmlElmnts[elKey].links[menuItemIndex]"
          />
        </div>
      </div>
      <div class="top-menu-links" :style="[elA, style.primaryColor.outline.borderColor]" style="vertical-align: top">
        <i
          @click="addItem"
          class="fa-solid fa-circle-plus greenWhitePlus"
          :style="{
            padding: elValue.style.height + 'vh 20px',
          }"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['endPts', 'grid', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    allInputs() {
      return {
        fontSize: '2vh',
        height: (this.elValue.style.height * 2 + 2 + 0.05) / 3 + 'vh',
        padding: '2px',
        margin: '0px',
        border: '0px',
      };
    },
    elUl() {
      return {
        'border-bottom': '0.1vh solid ' + this.site.body.style.textColor,
      };
    },
    elLi() {
      return { textAlign: this.elValue.style?.alignment };
    },
    elA() {
      return {
        // padding: this.elValue.style.height + 'px 20px',
      };
    },
    logoImg() {
      return {
        padding: '10px',
        height: this.elValue.style.height * 2 + 2 + 0.05 + 'vh',
      };
    },
  },
  methods: {
    addItem() {
      this.site.htmlElmnts[this.elKey].items = [...this.site.htmlElmnts[this.elKey].items, 'Choose page'];
      this.site.htmlElmnts[this.elKey].types = [...this.site.htmlElmnts[this.elKey].types, 'Page'];
      this.site.htmlElmnts[this.elKey].links = [...this.site.htmlElmnts[this.elKey].links, ''];
    },
    removeItem(menuItemIndex) {
      this.site.htmlElmnts[this.elKey].items.splice(menuItemIndex, 1);
      this.site.htmlElmnts[this.elKey].types.splice(menuItemIndex, 1);
      this.site.htmlElmnts[this.elKey].links.splice(menuItemIndex, 1);
    },
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
  position: relative;
  z-index: 4;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  border-style: dashed;
  border-width: 3px;
}
.top-menu-logo {
  float: left;
}
.top-menu-logo img {
  height: 100%;
}
.top-menu-links {
  position: relative;
  display: inline-block;
  text-align: left;
  border-style: dashed;
  border-width: 0px 0px 0px 3px;
}
.top-menu-link {
  height: 0px;
  padding: 0px 25px 0px 2px;
  color: #000; /*  Fallback for older browsers */
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
