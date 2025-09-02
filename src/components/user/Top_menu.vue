<template>
  <ul class="top-menu" :style="[style.primaryColor, elUl]">
    <li :style="logoLi" @mouseover="highlightMenuItem($event, true)" @mouseout="highlightMenuItem($event, false)">
      <img
        :src="
          elValue.logo.includes('http://') || elValue.logo.includes('https://')
            ? elValue.logo
            : endPts.imagesURL + elValue.logo
        "
        alt="logo"
        class="top-menu-logo-img"
      />
      <a class="top-menu-icon" v-if="this.wndw.wdth < this.respWidth.md" :style="logoA" @click="toggleRespMenu">
        <i :class="responsive ? 'fa fa-xmark' : 'fa fa-bars'"></i>
      </a>
    </li>
    <template v-if="wndw.wdth > respWidth.md || (wndw.wdth < respWidth.md && responsive)">
      <template v-for="menuLink in menuLinks">
        <li :style="linksLi" @mouseover="highlightMenuItem($event, true)" @mouseout="highlightMenuItem($event, false)">
          <a
            v-if="menuLink.page"
            :ref="menuLink.title.toLowerCase()"
            :style="[linksA]"
            :href="slctd.href + '/' + menuLink.page.toLowerCase()"
            >{{ menuLink.title }}</a
          >
          <a
            v-else-if="menuLink.anchor"
            :ref="menuLink.title.toLowerCase()"
            :style="[linksA]"
            :href="slctd.href + '/' + menuLink.anchor.toLowerCase()"
            >{{ menuLink.title }}</a
          >
          <a
            v-else-if="menuLink.link"
            :ref="menuLink.title.toLowerCase()"
            target="_blank"
            :style="[linksA]"
            :href="menuLink.link.toLowerCase()"
            >{{ menuLink.title }}</a
          >
        </li>
      </template>
    </template>
  </ul>
  <div :style="{ height: elValue.style.height }"></div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['endPts', 'respWidth', 'site', 'slctd', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      menuLinksRev:
        this.elValue.style?.align == 'right'
          ? Array.from(this.elValue[this.slctd.type]).reverse()
          : this.elValue[this.slctd.type],
      pageClick: false,
      responsive: false,
      protocol: protocol,
      topMenuMount: 0,
    };
  },

  computed: {
    elUl() {
      return {
        borderBottom: '0.1vh solid ' + this.site.body.style.textColor,
      };
    },
    logoLi() {
      return {
        float: this.wndw.wdth < this.respWidth.md ? 'none' : 'left',
        height: this.elValue.style.height,
      };
    },
    logoA() {
      return {
        color: this.site.body.style.textColor,
        height: this.elValue.style.height,
        padding:
          'calc(' +
          this.elValue.style.height?.replace(/\D/g, '') / 2 +
          this.elValue.style.height?.replace(/[0-9]/g, '') +
          ' - 1vh) 20px',
      };
    },
    linksLi() {
      return {
        float: this.wndw.wdth < this.respWidth.md ? 'none' : this.elValue.style?.align,
      };
    },
    linksA() {
      return {
        color: this.site.body.style.textColor,
        padding:
          this.wndw.wdth < this.respWidth.md
            ? '15px'
            : 'calc(' +
              this.elValue.style.height?.replace(/\D/g, '') / 2 +
              this.elValue.style.height?.replace(/[0-9]/g, '') +
              ' - 1vh) 20px',
        height: this.wndw.wdth < this.respWidth.md ? 16 + 30 + 'px' : this.elValue.style.height,
      };
    },
    menuLinks() {
      return this.elValue.style?.align == 'right' && this.wndw.wdth < this.respWidth.md
        ? this.elValue[this.slctd.type]
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
          event.target.style.backgroundColor =
            event.target.textContent.toLowerCase() == this.slctd.first_url_segment
              ? event.target.parentElement.parentElement.style.backgroundColor
              : '';
          event.target.style.filter =
            event.target.textContent.toLowerCase() == this.slctd.first_url_segment ? 'brightness(95%)' : 'none';
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

  updated() {
    if (this.topMenuMount === 0) {
      if (Object.keys(this.$refs).includes(this.slctd.first_url_segment)) {
        this.$refs[this.slctd.first_url_segment][0].style.backgroundColor =
          this.$refs[this.slctd.first_url_segment][0].parentElement.parentElement.style.backgroundColor;
        this.$refs[this.slctd.first_url_segment][0].style.filter = 'brightness(95%)';
      }
      this.topMenuMount++;
    }
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
.top-menu li {
  padding: 0px;
  margin: 0px;
  border: 0px;
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
  height: 100%;
}
</style>
