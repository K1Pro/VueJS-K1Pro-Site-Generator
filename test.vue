<template>
  <div
    class="top-menu"
    :style="[style.primaryColor.backgroundColor, style.primaryColor.outline.borderColor, elUl]"
    ref="topMenu"
  >
    <span class="dim" :style="[style.primaryColor.outline.color]">{{ grid.wdth }} px</span>
    <div class="top-menu-logo" :style="logoImg">
      <img :src="endPts.siteURL + site.logo" alt="logo" />
    </div>
    <div :style="[elLi]">
      <div
        v-for="(menuItem, menuItemIndex) in elValue.items"
        class="top-menu-links"
        :style="[elA, style.primaryColor.outline.borderColor]"
      >
        <div
          class="top-menu-link"
          :style="[
            allInputs,
            {
              'padding-right': '30px',
              'margin-bottom': '-' + (this.elValue.style.height * 2 + this.elValue.style.fontSize - 4) / 3 + 'px',
            },
          ]"
        >
          {{ menuItem }}
        </div>
        <div class="top-menu-link-items">
          <template v-if="site.htmlElmnts[elKey].types[menuItemIndex] == 'Link'">
            <input type="text" v-model="site.htmlElmnts[elKey].items[menuItemIndex]" :style="[allInputs]" />
          </template>
          <template v-else>
            <select
              v-model="site.htmlElmnts[elKey].items[menuItemIndex]"
              :ref="'menuItemsSelect' + menuItemIndex"
              :style="[allInputs]"
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
            :style="[allInputs]"
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
            :style="[allInputs]"
            :disabled="site.htmlElmnts[elKey].types[menuItemIndex] != 'Link'"
            v-model="site.htmlElmnts[elKey].links[menuItemIndex]"
          />
        </div>
      </div>
      <div
        class="top-menu-links"
        :style="[
          elA,
          style.primaryColor.outline.borderColor,
          {
            padding: elValue.style.height - 4 + 'px 20px',
            'margin-bottom': '-10px',
          },
        ]"
      >
        <!-- <div class="top-menu-link"></div> -->

        <div class="plus"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['endPts', 'grid', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { isMounted: false };
  },

  computed: {
    allInputs() {
      return {
        fontSize: this.elValue.style.fontSize + 'px',
        height: (this.elValue.style.height * 2 + this.elValue.style.fontSize - 4) / 3 + 'px',
        padding: '2px',
        margin: '0px',
        border: '0px',
      };
    },
    elUl() {
      return {
        borderBottom: '1px solid ' + this.site.body.style.textColor,
      };
    },
    elLi() {
      return {
        textAlign: this.elValue.style?.alignment,
      };
    },
    elA() {
      return {
        // padding: this.elValue.style.height + 'px 20px',
      };
    },
    logoImg() {
      return {
        padding: '10px',
        height: this.elValue.style.height * 2 + this.elValue.style.fontSize - 4 + 'px',
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
  mounted() {
    this.isMounted = true;
  },
};
</script>

<style>
.top-menu {
  position: relative;
  /* top: 0px; */
  width: 100%;
  z-index: 4;
  list-style-type: none;
  /* display: inline-block; */
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
  display: inline-block;
  text-align: left;
  border-style: dashed;
  border-width: 0px 0px 0px 3px;
}
.top-menu-link {
  padding-left: 2px;
  padding-right: 25px;
  border: 1px solid grey;
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
