<template>
  <div class="element-order">
    <select v-if="!addingPage" v-model="page.slctd" style="width: calc(100% - 40px)">
      <option v-for="page in Object.keys(site.pages)">{{ page }}</option>
    </select>
    <input v-if="addingPage" ref="newPageName" type="text" style="width: calc(100% - 40px)" placeholder="Page name" />
    <i
      v-if="!addingPage"
      class="fa-solid fa-circle-plus"
      style="padding-left: 2px; color: limegreen"
      @click="addPage"
    ></i>
    <i
      v-if="addingPage"
      class="fa-solid fa-floppy-disk"
      style="padding-left: 2px; padding-right: 2px; color: limegreen"
      @click="addPage"
    ></i>
    <i
      class="fa-solid fa-circle-minus"
      :style="{
        color: page.slctd == 'Home' && !addingPage ? 'grey' : '#ff0000',
        cursor: page.slctd == 'Home' && !addingPage ? 'not-allowed' : 'pointer',
      }"
      style="padding-left: 2px"
      @click="deletePage(page.slctd)"
    ></i>

    <div v-for="(pageElmnt, pageElmntIndx) in site.pages[page.slctd]" class="element-order-items">
      <input
        :ref="'renameInput' + pageElmntIndx"
        type="text"
        v-show="pageElmntIndx == renamingPos"
        style="width: calc(100% - 20px)"
        :value="pageElmnt[0].replaceAll('_', ' ')"
        v-on:blur="isHoverRenameSave ? (renamingPos = pageElmntIndx) : (renamingPos = null)"
      />
      <i
        v-if="pageElmntIndx == renamingPos"
        class="fa-solid fa-floppy-disk"
        @click="renameEl(pageElmnt, pageElmntIndx)"
        @mouseover="isHoverRenameSave = true"
        @mouseout="isHoverRenameSave = false"
      ></i>
      <i
        v-if="renamingPos != pageElmntIndx"
        class="fa-solid fa-circle-minus"
        style="color: #ff0000; float: right"
        @click="deletePageEl(pageElmntIndx)"
      ></i>
      <input
        type="radio"
        style="float: right"
        name="individEdit"
        :checked="pageElmntIndx === this.individEdit.elmnt"
        @click="enabledIndivEdit(pageElmntIndx)"
      />
      <input
        style="float: right"
        type="checkbox"
        v-if="renamingPos != pageElmntIndx"
        :disabled="this.individEdit.elmnt !== null"
        v-model="pageElmnt[1]"
      />
      <i
        v-if="
          pageElmntIndx != site.pages[page.slctd].length - 1 &&
          !site.htmlElmnts[pageElmnt[0]].position &&
          !site.htmlElmnts?.[site.pages[page.slctd][pageElmntIndx + 1][0]]?.position &&
          renamingPos != pageElmntIndx
        "
        class="fa-solid fa-circle-down"
        @click="moveDown(pageElmntIndx)"
      ></i>
      <i
        v-if="
          pageElmntIndx != 0 &&
          !site.htmlElmnts[pageElmnt[0]].position &&
          !site.htmlElmnts?.[site.pages[page.slctd][pageElmntIndx - 1][0]]?.position &&
          renamingPos != pageElmntIndx
        "
        class="fa-solid fa-circle-up"
        @click.prevent="moveUp(pageElmntIndx)"
      ></i>
      <span v-on:dblclick="revealRenameInput(pageElmnt, pageElmntIndx)">{{
        pageElmntIndx != renamingPos ? pageElmnt[0].replaceAll('_', ' ') : ''
      }}</span>
    </div>
    <hr />
    <button
      v-for="[elmntButtonKey, elmntButtonVal] in Object.entries(elmntButtons)"
      :style="{
        backgroundColor: elmntButtonKey == slctdElmntButton ? 'darkgrey' : '#eee',
      }"
      @click="slctdElmntButton = elmntButtonKey"
    >
      <i :class="elmntButtonVal"></i>
    </button>
    <select style="width: calc(100% - 75px)" @change="createCopyDeleteEl">
      <option disabled selected>{{ slctdElmntButton }} element</option>
      <template v-if="slctdElmntButton == 'Add'" v-for="htmlElmnt in Object.keys(content.htmlElmnts).sort()">
        <option
          v-if="
            (!siteElTypes.includes(htmlElmnt) || !content.htmlUniqSiteElmnts.includes(htmlElmnt)) &&
            (!pageElTypes.includes(htmlElmnt) || !content.htmlUniqPageElmnts.includes(htmlElmnt))
          "
          :value="htmlElmnt"
        >
          {{ htmlElmnt.replaceAll('_', ' ') }}
        </option>
      </template>
      <template v-if="slctdElmntButton == 'Copy' && Object.keys(site.htmlElmnts).length > 0">
        <template v-for="[htmlElmntKey, htmlElmntVal] in Object.entries(site.htmlElmnts).sort()">
          <option
            v-if="
              (!siteElTypes.includes(htmlElmntVal.type) || !content.htmlUniqSiteElmnts.includes(htmlElmntVal.type)) &&
              (!pageElTypes.includes(htmlElmntVal.type) || !content.htmlUniqPageElmnts.includes(htmlElmntVal.type))
            "
            :value="htmlElmntKey"
          >
            {{ htmlElmntKey.replaceAll('_', ' ') }}
          </option>
        </template>
      </template>
      <template v-if="slctdElmntButton == 'Delete' && Object.keys(site.htmlElmnts).length > 0">
        <option v-for="htmlElmnt in Object.keys(site.htmlElmnts).sort()" :value="htmlElmnt">
          {{ htmlElmnt.replaceAll('_', ' ') }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Element Order',

  inject: [
    'content',
    'endPts',
    'individEdit',
    'page',
    'pageElPositions',
    'pageElTypes',
    'showMsg',
    'site',
    'siteElTypes',
  ],

  data() {
    return {
      elmntButtons: { Add: 'fa-solid fa-plus', Copy: 'fa-regular fa-copy', Delete: 'fa-solid fa-trash' },
      slctdElmntButton: 'Add',
      addingPage: false,
      renamingPos: null,
      isHoverRenameSave: false,
    };
  },

  methods: {
    enabledIndivEdit(indx) {
      if (this.individEdit.elmnt == indx) {
        this.site.pages[this.page.slctd] = JSON.parse(this.individEdit.elmnts);
        this.individEdit.elmnt = null;
        // event.target.checked = false;
      } else if (this.individEdit.elmnt === null) {
        this.individEdit.elmnts = JSON.stringify(this.site.pages[this.page.slctd]);
        this.individEdit.elmnt = indx;
        this.site.pages[this.page.slctd].forEach((page, pageIndex) => {
          page[1] = indx !== pageIndex ? false : true;
        });
      } else {
        this.individEdit.elmnt = indx;
        this.site.pages[this.page.slctd].forEach((page, pageIndex) => {
          page[1] = indx !== pageIndex ? false : true;
        });
      }
    },

    createCopyDeleteEl(event) {
      const elmnt = event.target.value;
      if (this.slctdElmntButton == 'Delete') {
        if (
          confirm(
            'Are you sure you would like to permanently delete the "' +
              elmnt.replaceAll('_', ' ') +
              '" element from your website?'
          ) == true
        ) {
          let filteredPageEl;
          let filteredPages = {};
          Object.entries(this.site.pages).forEach(([page, pageEl]) => {
            filteredPageEl = pageEl.filter((a) => {
              return a[0] !== elmnt;
            });
            filteredPages[page] = filteredPageEl;
          });
          this.site.pages = filteredPages;
          delete this.site.htmlElmnts[elmnt];
        }
      } else {
        const elPosition =
          this.slctdElmntButton == 'Copy'
            ? this.site.htmlElmnts[elmnt]?.position
            : this.content.htmlElmnts[elmnt]?.position;
        let newElPosition;
        if (0 < elPosition) {
          newElPosition = this.pageElPositions.findLastIndex((el) => 0 < el && el < elPosition);
          newElPosition++;
        }
        if (0 > elPosition) {
          newElPosition = this.pageElPositions.findIndex((el) => 0 > el && el > elPosition);
          newElPosition = 0 > newElPosition ? this.site.pages[this.page.slctd].length : newElPosition;
        }
        if (elPosition === undefined) {
          newElPosition = this.pageElPositions.findIndex((el) => 0 > el);
          newElPosition = 0 > newElPosition ? this.site.pages[this.page.slctd].length : newElPosition;
        }

        if (this.content.htmlAllElmnts.includes(elmnt)) {
          const newElName = elmnt + '_' + new Date().getTime();
          this.site.htmlElmnts[newElName] = this.content.htmlElmnts[elmnt];
          this.site.pages[this.page.slctd].splice(newElPosition, 0, [newElName, true]);
        } else {
          this.site.pages[this.page.slctd].splice(newElPosition, 0, [elmnt, true]);
        }
      }
      event.srcElement.selectedIndex = 0;
    },
    revealRenameInput(pageElmnt, pageElmntIndx) {
      this.renamingPos = pageElmntIndx;
      setTimeout(() => {
        this.$refs['renameInput' + pageElmntIndx][0].focus();
      }, 1);
    },
    renameEl(pageElmnt, pageElmntIndx) {
      const newPageElName = this.$refs['renameInput' + pageElmntIndx][0].value
        .trim()
        .replaceAll(' ', '_')
        .split('_')
        .filter(function (n) {
          return n;
        })
        .join('_');

      const pagesLowerCase = [];
      Object.keys(this.site.pages).map((key) => pagesLowerCase.push(key.toLowerCase()));
      const htmlElmntsLowerCase = [];
      Object.keys(this.site.htmlElmnts).map((key) => htmlElmntsLowerCase.push(key.toLowerCase()));
      const contentHtmlElmntsLowerCase = [];
      Object.keys(this.content.htmlElmnts).map((key) => contentHtmlElmntsLowerCase.push(key.toLowerCase()));

      if (
        pagesLowerCase.includes(newPageElName.toLowerCase()) ||
        htmlElmntsLowerCase.includes(newPageElName.toLowerCase()) ||
        contentHtmlElmntsLowerCase.includes(newPageElName.toLowerCase())
      ) {
        this.showMsg('This name already exists!');
        this.$refs['renameInput' + pageElmntIndx][0].value = pageElmnt[0];
      } else {
        this.site.htmlElmnts[newPageElName] = this.site.htmlElmnts[pageElmnt[0]];
        let stringifiedPages = JSON.stringify(this.site.pages).replaceAll(
          '"' + pageElmnt[0] + '"',
          '"' + newPageElName + '"'
        );
        this.site.pages = JSON.parse(stringifiedPages);
        delete this.site.htmlElmnts[pageElmnt[0]];
        this.renamingPos = null;
      }
    },
    addPage() {
      if (this.addingPage) {
        this.site.pages[this.$refs.newPageName.value] = [];
        this.page.slctd = this.$refs.newPageName.value;
        this.addingPage = !this.addingPage;
      } else {
        this.addingPage = !this.addingPage;
      }
    },
    deletePage(slctdPage) {
      if (this.addingPage) {
        this.addingPage = !this.addingPage;
      } else {
        this.page.slctd = 'Home';
        delete this.site.pages[slctdPage];
      }
    },
    deletePageEl(elementIndex) {
      this.site.pages[this.page.slctd].splice(elementIndex, 1);
    },
    moveDown(elementIndex) {
      const chosenElement = this.site.pages[this.page.slctd][elementIndex];
      this.site.pages[this.page.slctd].splice(elementIndex, 1);
      this.site.pages[this.page.slctd].splice(elementIndex + 1, 0, chosenElement);
    },
    moveUp(elementIndex) {
      const chosenElement = this.site.pages[this.page.slctd][elementIndex];
      this.site.pages[this.page.slctd].splice(elementIndex, 1);
      this.site.pages[this.page.slctd].splice(elementIndex - 1, 0, chosenElement);
    },
  },
};
</script>

<style>
.element-order-items {
  background-color: lightgrey;
  color: black;
  padding: 3px;
  margin-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 26px;
}

.element-order select {
  height: 25px;
}
.element-order button {
  border-width: 1px 0px 1px 1px;
  border-color: black;
  border-style: solid;
  height: 25px;
  width: 25px;
}

.element-order-items i {
  cursor: pointer;
  padding-left: 2px;
  float: right;
}
</style>
