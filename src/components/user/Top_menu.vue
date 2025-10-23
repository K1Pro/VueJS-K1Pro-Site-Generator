<template>
  <div class="top-menu" :style="[style.primaryColor, { borderBottom: '1px solid ' + site.body.style.textColor }]">
    <div :class="{ 'resp-padding': wndw.wdth > respWidth.md }">
      <ul class="top-menu-cntnr" :style="[style.primaryColor, elUl]">
        <li :style="logoLi">
          <img
            :src="
              elValue.logo.includes('http://') || elValue.logo.includes('https://')
                ? elValue.logo
                : endPts.imagesURL + elValue.logo
            "
            alt="logo"
          />
        </li>
        <template v-if="wndw.wdth > respWidth.md || (wndw.wdth < respWidth.md && responsive)">
          <template v-for="(menuLink, menuLinkIndex) in elValue[slctd.type]">
            <li
              :class="{ 'top-menu-push': menuLinkIndex === 0 && wndw.wdth >= respWidth.md }"
              @mouseover="highlightMenuItem($event, true)"
              @mouseout="highlightMenuItem($event, false)"
            >
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
    </div>
    <a v-if="wndw.wdth < respWidth.md" class="top-menu-icon" :style="logoA" @click="toggleRespMenu">
      <i :class="responsive ? 'fa fa-xmark' : 'fa fa-bars'"></i>
    </a>
  </div>
  <div :style="{ height: elValue.style.height }"></div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['endPts', 'respWidth', 'site', 'slctd', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      pageClick: false,
      responsive: false,
      protocol: protocol,
      topMenuMount: 0,
    };
  },

  computed: {
    elUl() {
      return {
        height: this.wndw.wdth < this.respWidth.md ? 'auto' : this.elValue.style.height,
      };
    },
    logoLi() {
      return {
        height: this.elValue.style.height,
      };
    },
    logoA() {
      return {
        color: this.site.body.style.textColor,
        height: this.elValue.style.height,
      };
    },
    linksA() {
      return {
        color: this.site.body.style.textColor,
        height: this.wndw.wdth < this.respWidth.md ? 16 + 30 + 'px' : this.elValue.style.height,
      };
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
}
.top-menu-cntnr {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap: 0px;
  overflow: hidden;
}
.top-menu-cntnr a {
  text-decoration: none;
  user-select: none;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
}
.top-menu i {
  width: 16px;
}
.top-menu-cntnr img {
  /* cursor: pointer; */
  padding: 10px;
  height: 100%;
}
.top-menu-icon {
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px;
}
.top-menu-push {
  margin-left: auto;
}
@media only screen and (min-width: 650px) {
  .top-menu-cntnr {
    flex-direction: row;
  }
}
</style>
