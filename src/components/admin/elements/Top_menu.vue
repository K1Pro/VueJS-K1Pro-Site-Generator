<template>
  <div
    :id="'site_page_el_' + elIndex"
    class="top-menu"
    :style="[style.primaryColor.backgroundColor, style.outline.borderColor, elDiv]"
  >
    <edit_menu
      :elKey="elKey"
      :options="['flex-direction', 'height', 'justify-content', 'links', 'logo', 'mobile', 'width']"
      @slctd-opt="slctdOpt = $event"
    ></edit_menu>
    <span class="dim" :style="[style.primaryColor.outline.color]">{{ grid.wdth }} px * {{ grid.hght }} px</span>
    <div :style="style.respPadding">
      <div v-if="elValue.logo" class="top-menu-logo" :style="elImg">
        <img :src="endPts.imagesURL + 'top_menu/logo.png'" alt="logo" />
      </div>

      <div class="top-menu-cntnr" :style="[style.primaryColor.outline.borderColor, elUl]">
        <template v-for="(menuLink, menuLinkIndex) in elValue[slctd.type]">
          <div
            class="top-menu-links"
            :style="[
              style.primaryColor.outline.borderColor,
              elLi,
              {
                borderWidth:
                  menuLinkIndex + 1 === elValue[slctd.type].length && elValue.style['flex-direction'] == 'row'
                    ? '0px 3px 0px 3px'
                    : menuLinkIndex === 0 && elValue.style['flex-direction'] == 'row-reverse'
                    ? '0px 3px 0px 3px'
                    : '0px 0px 0px 3px',
              },
            ]"
          >
            <button
              class="top-menu-add-rem"
              :style="{ right: elValue[slctd.type].length > 1 ? '15px' : '0px' }"
              @click="addItem(menuLinkIndex)"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            <button
              class="top-menu-add-rem"
              v-if="elValue[slctd.type].length > 1"
              style="right: 0px"
              @click="removeItem(menuLinkIndex)"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <links
              v-if="slctdOpt == 'links'"
              :elKey="elKey"
              :elValue="elValue"
              :elIndex="elIndex"
              :itemKey="slctd.type"
              :itemVal="menuLink"
              :itemIndx="menuLinkIndex"
            ></links>

            <input type="text" v-model="menuLink.title" class="top-menu-text" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['defaults', 'endPts', 'grid', 'site', 'slctd', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { slctdOpt: null };
  },
  updated() {
    Object.entries(this.defaults.htmlElmnts[this.elValue.type]).forEach(([optKey, optVal]) => {
      if (optKey == 'style') {
        Object.entries(optVal).forEach(([styleKey, styleVal]) => {
          if (this.elValue?.style?.[styleKey] === undefined)
            this.site.htmlElmnts[this.elKey].style[styleKey] = styleVal;
        });
      } else if (this.elValue[optKey] === undefined) {
        this.site.htmlElmnts[this.elKey][optKey] = optVal;
      }
    });
  },
  mounted() {
    if (!this.elValue.mod) this.elValue.mod = 'titles';
  },

  computed: {
    elUl() {
      return {
        flexDirection: this.elValue.style['flex-direction'],
        justifyContent: this.elValue.style['justify-content'],
      };
    },
    elLi() {
      return {
        height: this.elValue.style.height,
        width: this.elValue.style.width,
      };
    },
    elImg() {
      return {
        height: this.elValue.style.height,
      };
    },
    elDiv() {
      return {
        height: this.elValue.style.height,
      };
    },
  },
  methods: {
    addItem(menuLinkIndex) {
      this.site.htmlElmnts[this.elKey][this.slctd.type].splice(menuLinkIndex + 1, 0, {
        title: 'Example',
        link: 'https://example.com',
      });
    },
    removeItem(menuLinkIndex) {
      this.site.htmlElmnts[this.elKey][this.slctd.type].splice(menuLinkIndex, 1);
    },
  },
};
</script>

<style>
.top-menu {
  position: relative;
  width: 100%;
  z-index: 4;
  min-height: 35px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.top-menu-logo {
  float: left;
}
.top-menu-logo img {
  padding: 10px;
  height: 100%;
}
.top-menu-cntnr {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0px;
  overflow: hidden;
}
.top-menu-links {
  position: relative;
  display: flex;
  align-items: center;
  border-style: dashed;
}
.top-menu-text {
  padding: 5px;
  border-style: none;
  background: transparent;
  width: 100%;
  text-align: center;
}
.top-menu-add-rem {
  position: absolute;
  top: 0;
  width: 15px;
  height: 15px;
}
.top-menu-add-rem i {
  position: absolute;
  top: 2px;
  left: 3px;
  font-size: 8px;
}
</style>
