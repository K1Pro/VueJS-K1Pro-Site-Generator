<template>
  <div
    :id="'site_page_el_' + elIndex"
    class="top-menu"
    :style="[style.primaryColor.backgroundColor, style.outline.borderColor, elUl]"
  >
    <edit_menu :elKey="elKey" :options="['height', 'align', 'links']" @slctd-opt="slctdOpt = $event"></edit_menu>
    <span class="dim" :style="[style.primaryColor.outline.color]">{{ grid.wdth }} px * {{ grid.hght }} px</span>
    <div :style="style.respPadding">
      <div class="top-menu-logo" :style="logoImg">
        <img
          :src="
            elValue.logo.includes('http://') || elValue.logo.includes('https://')
              ? elValue.logo
              : endPts.imagesURL + elValue.logo
          "
          alt="logo"
        />
      </div>

      <div class="top-menu-cntnr" :style="[style.primaryColor.outline.borderColor]">
        <template v-for="(menuLink, menuLinkIndex) in elValue[slctd.type]">
          <div class="top-menu-links" :style="[style.primaryColor.outline.borderColor, elLi]">
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
            <span
              contenteditable="plaintext-only"
              v-on:blur="menuLink.title = $event.target.innerHTML"
              style="padding: 10px"
              >{{ menuLink.title }}</span
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top Menu',

  inject: ['endPts', 'grid', 'site', 'slctd', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { inputType: 'page', inputIndex: null, newLink: { title: '', link: '' }, slctdOpt: null };
  },
  mounted() {
    if (!this.elValue.mod) this.elValue.mod = 'titles';
  },

  computed: {
    elUl() {
      return {
        height: this.elValue.style.height,
      };
    },
    elLi() {
      return {
        height: this.elValue.style.height,
        // textAlign: this.elValue.style?.align
      };
    },
    logoImg() {
      return {
        padding: '10px',
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
  width: 100%;
  position: relative;
  z-index: 4;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.top-menu-cntnr {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 0px;
  overflow: hidden;
  justify-content: flex-end;
  border-style: dashed;
  border-width: 0px 3px 0px 0px;
}
.top-menu-logo {
  float: left;
}
.top-menu-logo img {
  height: 100%;
}
.top-menu-links {
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  border-style: dashed;
  border-width: 0px 0px 0px 3px;
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
