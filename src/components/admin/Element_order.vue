<template>
  <div class="element-order">
    <select
      v-if="!addingPage"
      v-model="page.slctd"
      @focus="pageSlctd = $event.target.value"
      @change="pageSlctdChange"
      style="width: calc(100% - 40px)"
    >
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

    <div class="element-order-list">
      <div
        v-for="(pageElmnt, pageElmntIndx) in site.pages[page.slctd]"
        class="element-order-items"
        :draggable="site.htmlElmnts[pageElmnt[0]].position ? false : true"
        @dragstart="drag($event, pageElmntIndx)"
        @drop.prevent="drop($event, pageElmntIndx)"
        @dragover.prevent
        @dragenter.prevent
      >
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
          :style="{
            color: individEdit.elmnts === null ? '#ff0000' : 'grey',
            cursor: individEdit.elmnts === null ? 'pointer' : 'default',
            float: 'right',
          }"
          @click="deletePageEl(pageElmntIndx)"
        ></i>
        <input
          type="radio"
          style="float: right"
          name="individEdit"
          :checked="pageElmntIndx === individEdit.elmntIndx"
          @click="toggleIndivEdit(pageElmntIndx)"
        />
        <input
          style="float: right"
          type="checkbox"
          v-if="renamingPos != pageElmntIndx"
          :disabled="individEdit.elmnts !== null"
          :checked="pageElmnt[1]"
          @change="toggleElmnt($event.target.checked, pageElmnt[0], pageElmntIndx)"
        />
        <i
          v-if="
            pageElmntIndx != site.pages[page.slctd].length - 1 &&
            !site.htmlElmnts[pageElmnt[0]].position &&
            !site.htmlElmnts?.[site.pages[page.slctd][pageElmntIndx + 1][0]]?.position &&
            renamingPos != pageElmntIndx
          "
          class="fa-solid fa-circle-down"
          :style="{
            color: individEdit.elmnts === null ? 'black' : 'grey',
            cursor: individEdit.elmnts === null ? 'pointer' : 'default',
          }"
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
          :style="{
            color: individEdit.elmnts === null ? 'black' : 'grey',
            cursor: individEdit.elmnts === null ? 'pointer' : 'default',
          }"
          @click.prevent="moveUp(pageElmntIndx)"
        ></i>
        <span v-on:dblclick="revealRenameInput(pageElmnt, pageElmntIndx)">{{
          pageElmntIndx != renamingPos ? pageElmnt[0].replaceAll('_', ' ') : ''
        }}</span>
      </div>
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
    <select style="width: calc(100% - 75px)" @change="createCopyDeleteEl(event)">
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
      pageSlctd: 'Home',
    };
  },

  methods: {
    drag(event, pageElmntIndx) {
      event.dataTransfer.setData('text', pageElmntIndx);
    },
    drop(event, pageElmntIndx) {
      if (this.individEdit.elmntIndx) {
        this.site.pages[this.page.slctd] = JSON.parse(this.individEdit.elmnts);
        this.individEdit.elmntIndx = null;
        this.individEdit.elmnts = null;
      }
      if (this.site.htmlElmnts[this.site.pages[this.page.slctd][pageElmntIndx][0]].position === undefined) {
        const draggedEl = this.site.pages[this.page.slctd][event.dataTransfer.getData('text')];
        if (Number(event.dataTransfer.getData('text')) > pageElmntIndx) {
          this.site.pages[this.page.slctd].splice(pageElmntIndx, 0, draggedEl);
          this.site.pages[this.page.slctd].splice(Number(event.dataTransfer.getData('text')) + 1, 1);
        } else {
          this.site.pages[this.page.slctd].splice(pageElmntIndx + 1, 0, draggedEl);
          this.site.pages[this.page.slctd].splice(Number(event.dataTransfer.getData('text')), 1);
        }
      }
    },
    toggleIndivEdit(indx) {
      if (this.individEdit.elmntIndx == indx) {
        this.site.pages[this.page.slctd] = JSON.parse(this.individEdit.elmnts);
        this.individEdit.elmntIndx = null;
        this.individEdit.elmnts = null;
      } else if (this.individEdit.elmntIndx === null) {
        this.individEdit.elmntIndx = indx;
        this.individEdit.elmnts = JSON.stringify(this.site.pages[this.page.slctd]);
        this.site.pages[this.page.slctd].forEach((page, pageIndex) => {
          page[1] = indx !== pageIndex ? false : true;
        });
      } else {
        this.individEdit.elmntIndx = indx;
        this.site.pages[this.page.slctd].forEach((page, pageIndex) => {
          page[1] = indx !== pageIndex ? false : true;
        });
      }
    },

    toggleElmnt(event, elmnt, indx) {
      if (this.content.htmlUniqSiteElmnts.includes(elmnt)) {
        // toggles unique element on all pages
        for (const [pageKey, pageVal] of Object.entries(this.site.pages)) {
          pageVal.forEach((element, elIndex) => {
            if (elmnt == element[0]) {
              this.site.pages[pageKey][elIndex][1] = event;
            }
          });
        }
      } else {
        // toggles non-unique element only on selected page
        this.site.pages[this.page.slctd][indx][1] = event;
      }
    },

    pageSlctdChange() {
      if (this.individEdit.elmnts !== null) {
        this.site.pages[this.pageSlctd] = JSON.parse(this.individEdit.elmnts);
        this.individEdit.elmntIndx = null;
        this.individEdit.elmnts = null;
        this.pageSlctd = this.page.slctd;
      } else {
        this.pageSlctd = this.page.slctd;
      }
    },

    createCopyDeleteEl(event) {
      const elmnt = event?.target?.value ? event.target.value : event;
      if (this.slctdElmntButton == 'Delete') {
        // still need to properly delete unique elements here!!!!!!!!!!!
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

        if (this.content.htmlUniqSiteElmnts.includes(elmnt)) {
          this.site.htmlElmnts[elmnt] = this.content.htmlElmnts[elmnt];
          for (const [pageKey, pageVal] of Object.entries(this.site.pages)) {
            this.site.pages[pageKey].splice(newElPosition, 0, [elmnt, true]);
          }
        } else if (this.content.htmlAllElmnts.includes(elmnt)) {
          const newElName = elmnt + '_' + new Date().getTime();
          this.site.htmlElmnts[newElName] = this.content.htmlElmnts[elmnt];
          this.site.pages[this.page.slctd].splice(newElPosition, 0, [newElName, true]);
        } else {
          this.site.pages[this.page.slctd].splice(newElPosition, 0, [elmnt, true]);
        }
      }
      if (event?.srcElement?.selectedIndex) event.srcElement.selectedIndex = 0;
    },
    revealRenameInput(pageElmnt, pageElmntIndx) {
      if (!this.content.htmlUniqSiteElmnts.includes(pageElmnt[0])) {
        this.renamingPos = pageElmntIndx;
        setTimeout(() => {
          this.$refs['renameInput' + pageElmntIndx][0].focus();
        }, 1);
      }
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

        // console.log(this.site.htmlElmnts);
        this.siteElTypes.forEach((elType) => {
          if (this.content.htmlUniqSiteElmnts.includes(elType)) {
            console.log(elType);
            this.slctdElmntButton = 'Copy';
            this.createCopyDeleteEl(elType);
          }
        });

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
      if (this.individEdit.elmnts === null) {
        this.site.pages[this.page.slctd].splice(elementIndex, 1);
      }
    },
    moveDown(elementIndex) {
      if (this.individEdit.elmnts === null) {
        const chosenElement = this.site.pages[this.page.slctd][elementIndex];
        this.site.pages[this.page.slctd].splice(elementIndex, 1);
        this.site.pages[this.page.slctd].splice(elementIndex + 1, 0, chosenElement);
      }
    },
    moveUp(elementIndex) {
      if (this.individEdit.elmnts === null) {
        const chosenElement = this.site.pages[this.page.slctd][elementIndex];
        this.site.pages[this.page.slctd].splice(elementIndex, 1);
        this.site.pages[this.page.slctd].splice(elementIndex - 1, 0, chosenElement);
      }
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

.element-order-list {
  max-height: calc(100vh - 175px);
  overflow-y: auto;
}

.element-order-items i {
  padding-left: 2px;
  float: right;
}
</style>
