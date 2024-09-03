<template>
  <ul class="top-menu" :style="[elUl]">
    <li :style="logoLi" @mouseover="highlightMenuItem($event, true)" @mouseout="highlightMenuItem($event, false)">
      <img :src="endPts.siteURL + site.logo" alt="logo" :style="logoImg" class="top-menu-logo-img" />
      <a class="top-menu-icon" v-if="this.wndw.wdth < this.respWidth.md" :style="logoA" @click="toggleRespMenu">
        <i :class="responsive ? 'fa fa-xmark' : 'fa fa-bars'"></i>
      </a>
    </li>
    <template v-if="wndw.wdth > respWidth.md || (wndw.wdth < respWidth.md && responsive)">
      <li
        v-for="(menuItem, menuItemIndex) in menuItems"
        :style="elLi"
        @mouseover="highlightMenuItem($event, true)"
        @mouseout="highlightMenuItem($event, false)"
      >
        <a
          v-if="menuTypes[menuItemIndex] == 'Page'"
          :style="[elA]"
          :href="endPts.href + '/' + menuItem.toLowerCase()"
          >{{ menuItem }}</a
        >
        <a
          v-else-if="menuTypes[menuItemIndex] == 'Anchor'"
          :style="[elA]"
          :href="endPts.href + '/' + menuItem.toLowerCase()"
          >{{ menuItem }}</a
        >
        <a
          v-else-if="menuTypes[menuItemIndex] == 'Link'"
          target="_blank"
          :style="[elA]"
          :href="'https://' + menuLinks[menuItemIndex].toLowerCase()"
          >{{ menuItem }}</a
        >
      </li>
    </template>
  </ul>
  <div :style="{ height: elValue.style.height * 2 + (this.elValue.style.fontSize + 6) + 'px' }"></div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['wndw', 'respWidth', 'site', 'endPts'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      menuItemsRev:
        this.elValue.style?.alignment == 'right' ? Array.from(this.elValue.items).reverse() : this.elValue.items,
      menuTypesRev:
        this.elValue.style?.alignment == 'right' ? Array.from(this.elValue.types).reverse() : this.elValue.types,
      menuLinksRev:
        this.elValue.style?.alignment == 'right' ? Array.from(this.elValue.links).reverse() : this.elValue.links,
      pageClick: false,
      responsive: false,
    };
  },

  computed: {
    elUl() {
      return {
        backgroundColor: this.site.body.style.primaryColor,
      };
    },
    elLi() {
      return {
        float: this.wndw.wdth < this.respWidth.md ? 'none' : this.elValue.style?.alignment,
      };
    },
    elA() {
      return {
        color: this.site.body.style.textColor,
        padding: this.wndw.wdth < this.respWidth.md ? '15px' : this.elValue.style.height + 1 + 'px 20px',
        fontSize: this.elValue.style.fontSize + 'px',
      };
    },
    logoLi() {
      return { float: this.wndw.wdth < this.respWidth.md ? 'none' : 'left' };
    },
    logoImg() {
      return {
        height: this.elValue.style.height * 2 + this.elValue.style.fontSize + 1 + 'px',
      };
    },
    logoA() {
      return { fontSize: this.elValue.style.fontSize + 'px', padding: this.elValue.style.height + 1 + 'px 20px' };
    },
    menuItems() {
      return this.elValue.style?.alignment == 'right' && this.wndw.wdth < this.respWidth.md
        ? this.elValue.items
        : this.menuItemsRev;
    },
    menuTypes() {
      return this.elValue.style?.alignment == 'right' && this.wndw.wdth < this.respWidth.md
        ? this.elValue.types
        : this.menuTypesRev;
    },
    menuLinks() {
      return this.elValue.style?.alignment == 'right' && this.wndw.wdth < this.respWidth.md
        ? this.elValue.links
        : this.menuLinksRev;
    },
  },

  methods: {
    toggleRespMenu() {
      if (!this.responsive) this.responsive = true;
    },
    highlightMenuItem(event, isHovering) {
      if (event.target.nodeName == 'A') {
        if (isHovering) {
          event.target.style.backgroundColor = event.target.parentElement.parentElement.style.backgroundColor;
          event.target.style.filter = 'brightness(90%)';
        } else {
          event.target.style.backgroundColor = '';
          event.target.style.filter = 'none';
        }
      }
    },
    handleScroll() {
      this.responsive = false;
      this.pageClick = false;
    },
    handleClick() {
      if (this.responsive === true) {
        if (this.pageClick === true) {
          this.responsive = false;
          this.pageClick = false;
        } else {
          this.pageClick = true;
        }
      }
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('click', this.handleClick);
  },

  watch: {
    'wndw.wdth'(newWindowWidth, oldWindowWidth) {
      if (
        (newWindowWidth > this.respWidth.md && oldWindowWidth < this.respWidth.md) ||
        (newWindowWidth < this.respWidth.md && oldWindowWidth > this.respWidth.md)
      ) {
        this.responsive = false;
        this.pageClick = false;
      }
    },
  },
};
</script>

<style>
.top-menu {
  width: 100%;
  position: fixed;
  z-index: 4;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.top-menu a {
  display: block;
  text-decoration: none;
  user-select: none;
}
.top-menu i {
  width: 16px;
}
.top-menu img {
  cursor: pointer;
}
.top-menu-icon {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
}
.top-menu-logo-img {
  padding: 10px;
}
</style>
