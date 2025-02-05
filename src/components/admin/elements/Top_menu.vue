<template>
  <div
    :id="elKey"
    class="top-menu"
    :style="[style.primaryColor.backgroundColor, style.outline.borderColor, elUl]"
    ref="topMenu"
  >
    <span class="dim" :style="[style.primaryColor.outline.color]">{{ grid.wdth }} px * {{ grid.hght }} px</span>
    <div class="top-menu-logo" :style="logoImg">
      <img :src="endPts.appApiUrl + site.logo" alt="logo" />
    </div>
    <div :style="[elLi]">
      <template v-for="(menuItem, menuItemIndex) in elValue.items">
        <div
          v-if="site.pages[slctd.type][menuItem]"
          class="top-menu-links"
          :style="[style.primaryColor.outline.borderColor]"
        >
          <i
            class="fa-solid fa-circle-minus redWhiteMinus"
            style="position: absolute; right: 10px"
            :style="{ top: elValue.style.height / 3.5 + 'vh' }"
            @click="removeItem(menuItemIndex)"
          ></i>
          <div class="top-menu-link">{{ menuItem }}</div>

          <div class="top-menu-link-items">
            <select
              v-model="site.htmlElmnts[elKey].items[menuItemIndex]"
              :ref="'menuItemsSelect' + menuItemIndex"
              :style="[allInputs]"
            >
              <option value="Choose page" selected>Choose page</option>
              <option v-for="page in Object.keys(site.pages[slctd.type])">
                {{ page }}
              </option>
            </select>
          </div>
        </div>
      </template>

      <div class="top-menu-links" :style="[style.primaryColor.outline.borderColor]" style="vertical-align: top">
        <i
          @click="addItem"
          class="fa-solid fa-circle-plus greenWhitePlus"
          :style="{
            margin: 'calc(' + elValue.style.height / 2 + 'vh - 8px)' + ' 20px',
          }"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['endPts', 'grid', 'site', 'slctd', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    allInputs() {
      return {
        height: '2vh',
        margin: 'calc(' + this.elValue.style.height / 2 + 'vh - 1vh) 0px',
        // padding: '2px',
        border: '0px',
      };
    },
    elUl() {
      return {
        height: this.elValue.style.height + 'vh',
        // 'border-bottom': '0.1vh solid ' + this.site.body.style.textColor,
      };
    },
    elLi() {
      return { textAlign: this.elValue.style?.alignment };
    },
    logoImg() {
      return {
        padding: '10px',
        height: this.elValue.style.height + 'vh',
      };
    },
  },
  methods: {
    addItem() {
      this.site.htmlElmnts[this.elKey].items = [
        ...this.site.htmlElmnts[this.elKey].items,
        this.site.htmlElmnts[this.elKey].items[this.site.htmlElmnts[this.elKey].items.length - 1],
      ];
    },
    removeItem(menuItemIndex) {
      this.site.htmlElmnts[this.elKey].items.splice(menuItemIndex, 1);
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
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
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
.top-menu-link-items {
  display: flex;
}
.top-menu-link-items input,
.top-menu-link-items select {
  flex-grow: 1;
  width: 0;
  border-style: none;
  background: transparent;
}
</style>
