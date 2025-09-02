<template>
  <div :id="elKey" class="top-menu" :style="[style.primaryColor.backgroundColor, style.outline.borderColor, elUl]">
    <edit_menu :elKey="elKey" :options="['height', 'align']"></edit_menu>

    <span class="dim" :style="[style.primaryColor.outline.color]">{{ grid.wdth }} px * {{ grid.hght }} px</span>
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
    <div :style="[elLi]">
      <template v-for="(menuLink, menuLinkIndex) in elValue[slctd.type]">
        <div class="top-menu-links" :style="[style.primaryColor.outline.borderColor]">
          <i
            v-if="menuLinkIndex !== inputIndex"
            class="fa-solid fa-circle-minus redWhiteMinus top-menu-plus-minus"
            :style="topMenuLinksIcon"
            @click="removeItem(menuLinkIndex)"
          ></i>
          <i
            v-else-if="menuLinkIndex === inputIndex"
            class="fa-solid fa-floppy-disk greenWhitePlus top-menu-plus-minus"
            :style="topMenuLinksIcon"
            @click="inputType == 'title' ? (inputType = 'link') : saveLink()"
          ></i>
          <div class="top-menu-link">{{ menuLink.title }}</div>

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
                  :selected="menuLink.page && sitePage == menuLink.title"
                >
                  {{ sitePage }}
                </option>
              </template>
              <option value="Choose anchor" disabled>===Anchors===</option>
              <template v-for="[siteType, sitePages] in Object.entries(site.pages)">
                <template v-for="[sitePage, sitePageEls] in Object.entries(sitePages)">
                  <template v-for="sitePageAnchor in sitePageEls">
                    <option
                      v-if="sitePageAnchor[2] && sitePageAnchor[2] != ''"
                      :value="sitePage.toLowerCase() + '#' + sitePageAnchor[2].toLowerCase()"
                    >
                      {{ sitePageAnchor[2].toLowerCase() }} ({{ sitePage }})
                    </option>
                  </template>
                </template>
              </template>
              <option value="Choose link" disabled>===Links===</option>
              <option value="top-menu-link-opt">New link</option>
              <option v-if="menuLink.link" selected>
                {{ menuLink.title }}
              </option>
            </select>
            <input
              v-else-if="menuLinkIndex === inputIndex"
              type="text"
              :placeholder="'Enter ' + inputType"
              :style="[allInputs]"
              v-model="newLink[inputType]"
            />
          </div>
        </div>
      </template>

      <div class="top-menu-links top-menu-links-add-item" :style="[style.primaryColor.outline.borderColor]">
        <i @click="addItem" class="fa-solid fa-circle-plus greenWhitePlus" :style="topMenuLinksAddItem"></i>
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
    return { inputType: 'page', inputIndex: null, newLink: { title: '', link: '' } };
  },

  computed: {
    allInputs() {
      return {
        height: '2vh',
        margin:
          'calc(' +
          this.elValue.style.height?.replace(/\D/g, '') / 2 +
          this.elValue.style.height?.replace(/[0-9]/g, '') +
          ' - 1vh) 0px',
        border: '0px',
      };
    },
    elUl() {
      return {
        height: this.elValue.style.height,
      };
    },
    elLi() {
      return { textAlign: this.elValue.style?.align };
    },
    logoImg() {
      return {
        padding: '10px',
        height: this.elValue.style.height,
      };
    },
    topMenuLinksIcon() {
      return {
        top: this.elValue.style.height?.replace(/\D/g, '') / 3.5 + this.elValue.style.height?.replace(/[0-9]/g, ''),
      };
    },
    topMenuLinksAddItem() {
      return {
        margin:
          'calc(' +
          this.elValue.style.height?.replace(/\D/g, '') / 2 +
          this.elValue.style.height?.replace(/[0-9]/g, '') +
          ' - 8px)' +
          ' 20px',
      };
    },
  },
  methods: {
    addItem() {
      this.site.htmlElmnts[this.elKey][this.slctd.type].push({ title: 'Example', link: 'https://example.com' });
    },
    changeItem(event, menuLinkIndex) {
      if (event == 'top-menu-link-opt') {
        this.inputType = 'title';
        this.inputIndex = menuLinkIndex;
      } else if (event.includes('#')) {
        this.site.htmlElmnts[this.elKey][this.slctd.type][menuLinkIndex] = {
          title: event.split('#')[1].charAt(0).toUpperCase() + event.split('#')[1].slice(1).replaceAll('-', ' '),
          anchor: event,
        };
        delete this.site.htmlElmnts[this.elKey][this.slctd.type][menuLinkIndex].link;
        delete this.site.htmlElmnts[this.elKey][this.slctd.type][menuLinkIndex].page;
      } else {
        this.site.htmlElmnts[this.elKey][this.slctd.type][menuLinkIndex] = { title: event, page: event };
        delete this.site.htmlElmnts[this.elKey][this.slctd.type][menuLinkIndex].link;
        delete this.site.htmlElmnts[this.elKey][this.slctd.type][menuLinkIndex].anchor;
      }
    },
    removeItem(menuLinkIndex) {
      this.site.htmlElmnts[this.elKey][this.slctd.type].splice(menuLinkIndex, 1);
    },
    saveLink() {
      if (!this.newLink.link.includes('http://') || !this.newLink.link.includes('https://'))
        this.newLink.link = 'https://' + this.newLink.link;
      this.site.htmlElmnts[this.elKey][this.slctd.type][this.inputIndex] = {
        title: this.newLink.title,
        link: this.newLink.link,
      };
      delete this.site.htmlElmnts[this.elKey][this.slctd.type][this.inputIndex].page;
      delete this.site.htmlElmnts[this.elKey][this.slctd.type][this.inputIndex].anchor;
      this.inputType = 'page';
      this.inputIndex = null;
      this.newLink.title = '';
      this.newLink.link = '';
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
.top-menu-links-add-item {
  vertical-align: top;
}
.top-menu-plus-minus {
  position: absolute;
  right: 10px;
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
