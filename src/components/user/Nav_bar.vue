<template>
  <div class="nav-bar" ref="navBar" :style="[style.primaryColor, elDiv]">
    <div :class="{ 'resp-padding': wndw.wdth > respWidth.md }">
      <div v-if="elValue.logo" class="nav-bar-logo" :style="elImg">
        <img :src="endPts.imagesURL + 'nav_bar/logo.png'" alt="logo" />
      </div>
      <ul class="nav-bar-cntnr" :style="[style.primaryColor, elUl]">
        <template v-if="wndw.wdth > respWidth.md || !elValue.mobile || (wndw.wdth < respWidth.md && mblMenu)">
          <template v-for="link in elValue[slctd.type]">
            <li :style="[elLi]" @mouseover="hoverLink($event, true)" @mouseout="hoverLink($event, false)">
              <a
                v-if="link.page"
                :ref="link.title.toLowerCase()"
                :style="[elA]"
                :href="slctd.href + '/' + link.page.toLowerCase()"
                >{{ link.title }}</a
              >
              <a
                v-else-if="link.anchor"
                :ref="link.title.toLowerCase()"
                :style="[elA]"
                :href="slctd.href + '/' + link.anchor.toLowerCase()"
                >{{ link.title }}</a
              >
              <a
                v-else-if="link.link"
                :ref="link.title.toLowerCase()"
                target="_blank"
                :style="[elA]"
                :href="link.link.toLowerCase()"
                >{{ link.title }}</a
              >
              <div v-else-if="link.disable" :style="[elA]">{{ link.title }}</div>
            </li>
          </template>
        </template>
      </ul>
    </div>
    <a
      v-if="wndw.wdth < respWidth.md && elValue.mobile"
      class="nav-bar-mbl-icon"
      :style="[elMblA]"
      @click="toggleMblMenu"
    >
      <i :class="mblMenu ? 'fa fa-xmark' : 'fa fa-bars'"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Nav bar',

  inject: ['endPts', 'respWidth', 'site', 'slctd', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      pageClick: false,
      mblMenu: false,
      mblMenuHght: 0,
      protocol: protocol,
      navBarMount: 0,
    };
  },
  computed: {
    elUl() {
      return {
        flexDirection:
          this.wndw.wdth < this.respWidth.md && this.elValue.mobile ? 'column' : this.elValue.style['flex-direction'],
        height: this.wndw.wdth < this.respWidth.md && this.elValue.mobile ? 'auto' : this.elValue.style.height,
        justifyContent: this.elValue.style['justify-content'],
      };
    },
    elLi() {
      return { width: this.wndw.wdth < this.respWidth.md && this.elValue.mobile ? '100%' : this.elValue.style.width };
    },
    elA() {
      return {
        color: this.site.body.style.textColor,
        fontSize: this.elValue.style['font-size'],
        height: this.wndw.wdth < this.respWidth.md && this.elValue.mobile ? 16 + 30 + 'px' : this.elValue.style.height,
        justifyContent: this.wndw.wdth < this.respWidth.md && this.elValue.mobile ? 'flex-start' : 'center',
      };
    },
    elImg() {
      return {
        float: this.wndw.wdth < this.respWidth.md && this.elValue.mobile ? 'none' : 'left',
        height: this.elValue.style.height,
      };
    },
    elDiv() {
      return {
        marginBottom: this.mblMenu ? '-' + this.mblMenuHght + 'px' : '0px',
        borderBottom: '1px solid ' + this.site.body.style.textColor,
      };
    },
    elMblA() {
      return {
        color: this.site.body.style.textColor,
        height: this.wndw.wdth < this.respWidth.md && !this.elValue.logo ? 16 + 30 + 'px' : this.elValue.style.height,
      };
    },
  },
  methods: {
    toggleMblMenu() {
      if (!this.mblMenu) this.mblMenu = true;
      const mblMenuHght = this.$refs.navBar.offsetHeight;
      setTimeout(() => {
        this.mblMenuHght = this.$refs.navBar.offsetHeight - mblMenuHght;
      }, 1);
    },
    hoverLink(event, isHovering) {
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
      this.mblMenu = false;
      this.pageClick = false;
    },
    handleClick() {
      if (this.mblMenu === true) {
        if (this.pageClick === true) {
          this.mblMenu = false;
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
    if (this.navBarMount === 0) {
      if (Object.keys(this.$refs).includes(this.slctd.first_url_segment)) {
        this.$refs[this.slctd.first_url_segment][0].style.backgroundColor =
          this.$refs[this.slctd.first_url_segment][0].parentElement.parentElement.style.backgroundColor;
        this.$refs[this.slctd.first_url_segment][0].style.filter = 'brightness(95%)';
      }
      this.navBarMount++;
    }
  },
  watch: {
    'wndw.wdth'(newWindowWidth, oldWindowWidth) {
      if (
        (newWindowWidth > this.respWidth.md && oldWindowWidth < this.respWidth.md) ||
        (newWindowWidth < this.respWidth.md && oldWindowWidth > this.respWidth.md)
      ) {
        this.mblMenu = false;
        this.pageClick = false;
      }
    },
  },
};
</script>

<style>
.nav-bar {
  position: relative;
  width: 100%;
}
.nav-bar img {
  height: 100%;
}
.nav-bar-logo img {
  padding: 10px;
  height: 100%;
}
.nav-bar-cntnr {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0px;
  overflow: hidden;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.nav-bar-cntnr li {
}
.nav-bar-cntnr a,
.nav-bar-cntnr div {
  text-decoration: none;
  user-select: none;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
}
.nav-bar i {
  width: 16px;
}
.nav-bar-mbl-icon {
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
