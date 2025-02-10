<template>
  <div
    :id="elKey"
    class="top-menu"
    :style="[style.primaryColor.backgroundColor, style.outline.borderColor, elUl]"
    ref="topMenu"
  >
    <input class="font-size-input" type="number" step="0.01" v-model="site.htmlElmnts[elKey].style.height" />
    <span class="dim" :style="[style.primaryColor.outline.color]">{{ grid.wdth }} px * {{ grid.hght }} px</span>
    <div class="top-menu-logo" :style="logoImg">
      <img :src="endPts.appApiUrl + site.logo" alt="logo" />
    </div>
    <div :style="[elLi]">
      <template v-for="(menuLink, menuLinkIndex) in elValue.links">
        <div class="top-menu-links" :style="[style.primaryColor.outline.borderColor]">
          <i
            v-if="menuLinkIndex !== inputIndex"
            class="fa-solid fa-circle-minus redWhiteMinus"
            style="position: absolute; right: 10px"
            :style="{ top: elValue.style.height / 3.5 + 'vh' }"
            @click="removeItem(menuLinkIndex)"
          ></i>
          <i
            v-else-if="menuLinkIndex === inputIndex"
            class="fa-solid fa-floppy-disk greenWhitePlus"
            style="position: absolute; right: 10px"
            :style="{ top: elValue.style.height / 3.5 + 'vh' }"
            @click="inputType == 'title' ? (inputType = 'URL') : saveLink()"
          ></i>
          <div class="top-menu-link">{{ elValue.items[menuLinkIndex] }}</div>

          <div class="top-menu-link-items">
            <select
              v-if="menuLinkIndex !== inputIndex"
              :style="[allInputs]"
              @change="changeItem($event.target.value, menuLinkIndex)"
            >
              <template v-for="siteType in Object.keys(site.pages)">
                <option value="Choose page" disabled>
                  ==={{ siteType.charAt(0).toUpperCase() + siteType.slice(1) }} pages===
                </option>
                <option
                  v-for="sitePage in Object.keys(site.pages[siteType])"
                  :selected="menuLink == 'Page' && sitePage == elValue.items[menuLinkIndex]"
                >
                  {{ sitePage }}
                </option>
              </template>
              <option value="Choose link" disabled>===Links===</option>
              <option value="top-menu-link-opt">New link</option>
              <template v-for="(exstngMenuLink, exstngMenuLinkIndex) in elValue.links">
                <option
                  v-if="exstngMenuLink != 'Page' && !exstngMenuLink.includes('#')"
                  :selected="
                    (exstngMenuLink.includes('http://') || exstngMenuLink.includes('https://')) &&
                    menuLink == exstngMenuLink
                  "
                >
                  {{ elValue.items[exstngMenuLinkIndex] }}
                </option>
              </template>
              <option value="Choose anchor" disabled>===Anchors===</option>
            </select>
            <input
              v-else-if="menuLinkIndex === inputIndex"
              type="text"
              placeholder="Enter title"
              :style="[allInputs]"
              v-model="link[inputType]"
            />
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

  data() {
    return { inputType: 'page', inputIndex: null, link: { title: '', URL: '' }, linkTitle: '', linkURL: '' };
  },

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
      this.site.htmlElmnts[this.elKey].items = [...this.site.htmlElmnts[this.elKey].items, 'Example'];
      this.site.htmlElmnts[this.elKey].links = [...this.site.htmlElmnts[this.elKey].links, 'https://example.com'];
    },
    changeItem(event, menuLinkIndex) {
      console.log(event);
      console.log(menuLinkIndex);
      if (event == 'top-menu-link-opt') {
        this.inputType = 'title';
        this.inputIndex = menuLinkIndex;
      } else if (event.includes('#')) {
      } else {
        this.site.htmlElmnts[this.elKey].items[menuLinkIndex] = event;
        this.site.htmlElmnts[this.elKey].links[menuLinkIndex] = 'Page';
      }
    },
    saveLink() {
      this.elValue.items[this.inputIndex] = this.link.title;
      this.elValue.links[this.inputIndex] = this.link.URL;
      this.inputType = 'page';
      this.inputIndex = null;
      this.link.title = '';
      this.link.URL = '';
    },
    removeItem(menuLinkIndex) {
      this.site.htmlElmnts[this.elKey].links.splice(menuLinkIndex, 1);
      this.site.htmlElmnts[this.elKey].items.splice(menuLinkIndex, 1);
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
