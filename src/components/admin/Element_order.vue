<template>
  <div class="element-order">
    <select v-if="!addingPage" style="width: calc(100% - 40px)" @change="pageSlctdChange" @focus="pageSlctdFocus">
      <template v-for="siteType in Object.keys(site.pages)">
        <option disabled>==={{ siteType }}===</option>
        <option
          v-for="sitePage in Object.keys(site.pages[siteType])"
          :value="[siteType, sitePage]"
          :selected="siteType == slctd.type && sitePage == slctd.page"
        >
          {{ sitePage }}
        </option>
      </template>
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
        color: (slctd.page == 'Home' && !addingPage) || defaults.reqrdPages.includes(slctd.page) ? 'grey' : '#ff0000',
        cursor:
          (slctd.page == 'Home' && !addingPage) || defaults.reqrdPages.includes(slctd.page) ? 'not-allowed' : 'pointer',
      }"
      style="padding-left: 2px"
      @click="deletePage(slctd.page)"
    ></i>

    <div v-if="!defaults.reqrdPages.includes(slctd.page) && !addingPage">
      Default:<input
        type="checkbox"
        :disabled="slctd.page.toLowerCase() == site.defaultPage[slctd.type]"
        :checked="slctd.page.toLowerCase() == site.defaultPage[slctd.type]"
        @change="site.defaultPage[slctd.type] = slctd.page.toLowerCase()"
      />
      Logged in:<input
        type="checkbox"
        :checked="slctd.type == 'loggedin' && Object.keys(site.pages.loggedin).includes(slctd.page)"
        @change="changeLogInOut"
      />
    </div>

    <div class="element-order-list">
      <div
        v-for="(pageElmnt, pageElmntIndx) in site.pages[slctd.type][slctd.page]"
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
            color:
              individEdit.elmnts === null && !defaults.htmlReqrdPageElmnts.includes(pageElmnt[0]) ? '#ff0000' : 'grey',
            cursor:
              individEdit.elmnts === null && !defaults.htmlReqrdPageElmnts.includes(pageElmnt[0])
                ? 'pointer'
                : 'default',
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
          :disabled="individEdit.elmnts !== null || defaults.htmlReqrdPageElmnts.includes(pageElmnt[0])"
          :checked="pageElmnt[1]"
          @change="toggleElmnt($event.target.checked, pageElmnt[0], pageElmntIndx)"
        />
        <i
          v-if="
            pageElmntIndx != site.pages[slctd.type][slctd.page].length - 1 &&
            !site.htmlElmnts[pageElmnt[0]].position &&
            !site.htmlElmnts?.[site.pages[slctd.type][slctd.page][pageElmntIndx + 1][0]]?.position &&
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
            !site.htmlElmnts?.[site.pages[slctd.type][slctd.page][pageElmntIndx - 1][0]]?.position &&
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
    <button title="Add"><i class="fa-solid fa-plus"></i></button>
    <button title="Copy"><i class="fa-solid fa-copy"></i></button>
    <button title="Order"><i class="fa-solid fa-up-down"></i></button>
    <button title="Enable"><i class="fa-solid fa-play"></i></button>
    <button title="Disable"><i class="fa-solid fa-pause"></i></button>
    <button title="Individual edit mode"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
    <button title="Individual edit mode"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
    <button title="Rename"><i class="fa-solid fa-pen-to-square"></i></button>
    <button title="Default"><i class="fa-solid fa-file-circle-check"></i></button>
    <button title="Default"><i class="fa-solid fa-file-circle-xmark"></i></button>
    <button title="Logged in"><i class="fa-solid fa-file-circle-plus"></i></button>
    <button title="Logged in "><i class="fa-solid fa-file-circle-minus"></i></button>
    <button title="Delete "><i class="fa-solid fa-trash"></i></button>
    <hr />
    <button
      v-for="[elmntButtonKey, elmntButtonVal] in Object.entries(elmntButtons)"
      :style="{
        backgroundColor: elmntButtonKey == slctdElmntButton ? 'darkgrey' : '#eee',
      }"
      @click="
        slctdElmntButton = elmntButtonKey;
        copyingElmnt = null;
      "
    >
      <i :class="elmntButtonVal"></i>
    </button>
    <select style="width: calc(100% - 75px)" @change="addCopyDeleteEl($event)" @focusout="copyingElmnt = null">
      <option v-if="!copyingElmnt" disabled selected>{{ slctdElmntButton }} element</option>
      <template v-if="slctdElmntButton == 'Add'" v-for="htmlElmnt in Object.keys(defaults.htmlElmnts).sort()">
        <option
          v-if="
            (!siteElmnts.includes(htmlElmnt) || !defaults.htmlUniqSiteElmnts.includes(htmlElmnt)) &&
            (!pageElTypes.includes(htmlElmnt) || !defaults.htmlUniqPageElmnts.includes(htmlElmnt)) &&
            !defaults.htmlReqrdPageElmnts.includes(htmlElmnt)
          "
          :value="htmlElmnt"
        >
          {{ htmlElmnt.replaceAll('_', ' ') }}
        </option>
      </template>
      <template v-if="slctdElmntButton == 'Copy' && Object.keys(site.htmlElmnts).length > 0">
        <option v-if="copyingElmnt" disabled selected>Choose to copy this element</option>
        <template v-if="!copyingElmnt" v-for="siteUniqElType in siteUniqElTypes.sort()">
          <option
            v-if="
              (!siteElmnts.includes(siteUniqElType) || !defaults.htmlUniqSiteElmnts.includes(siteUniqElType)) &&
              (!pageElTypes.includes(siteUniqElType) || !defaults.htmlUniqPageElmnts.includes(siteUniqElType)) &&
              !defaults.htmlReqrdPageElmnts.includes(siteUniqElType)
            "
            :value="siteUniqElType"
          >
            {{ siteUniqElType.replaceAll('_', ' ') }}
          </option>
        </template>
        <template v-else v-for="[htmlElmntKey, htmlElmntVal] in Object.entries(site.htmlElmnts).sort()">
          <option
            v-if="
              htmlElmntVal.type == copyingElmnt &&
              (!siteElmnts.includes(htmlElmntVal.type) || !defaults.htmlUniqSiteElmnts.includes(htmlElmntVal.type)) &&
              (!pageElTypes.includes(htmlElmntVal.type) || !defaults.htmlUniqPageElmnts.includes(htmlElmntVal.type)) &&
              !defaults.htmlReqrdPageElmnts.includes(htmlElmntKey)
            "
            :value="htmlElmntKey"
          >
            {{ htmlElmntKey.replaceAll('_', ' ') }}
          </option>
        </template>
      </template>

      <template v-if="slctdElmntButton == 'Delete' && Object.keys(site.htmlElmnts).length > 0">
        <template v-for="htmlElmnt in Object.keys(site.htmlElmnts).sort()">
          <option v-if="!defaults.htmlReqrdPageElmnts.includes(htmlElmnt)" :value="htmlElmnt">
            {{ htmlElmnt.replaceAll('_', ' ') }}
          </option>
        </template>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Element Order',

  inject: [
    'defaults',
    'endPts',
    'individEdit',
    'pageElPositions',
    'pageElTypes',
    'showMsg',
    'site',
    'siteElmnts',
    'siteUniqElTypes',
    'slctd',
  ],

  data() {
    return {
      elmntButtons: { Add: 'fa-solid fa-plus', Copy: 'fa-regular fa-copy', Delete: 'fa-solid fa-trash' },
      slctdElmntButton: 'Add',
      addingPage: false,
      copyingElmnt: null,
      renamingPos: null,
      isHoverRenameSave: false,
      pageSlctd: 'Home',
      typeSlctd: 'loggedout',
    };
  },

  methods: {
    changeLogInOut(event) {
      if (event.target.checked) {
        if (
          !this.site.pages['loggedin'][this.slctd.page] ||
          confirm('A loggedin page with the same name already exists. Replace?') === true
        ) {
          this.site.pages['loggedin'][this.slctd.page] = this.site.pages['loggedout'][this.slctd.page];
          this.slctd.type = 'loggedin';
          delete this.site.pages['loggedout'][this.slctd.page];
        }
      } else {
        if (
          !this.site.pages['loggedout'][this.slctd.page] ||
          confirm('A loggedin page with the same name already exists. Replace?') === true
        ) {
          this.site.pages['loggedout'][this.slctd.page] = this.site.pages['loggedin'][this.slctd.page];
          this.slctd.type = 'loggedout';
          delete this.site.pages['loggedin'][this.slctd.page];
        }
      }
    },
    drag(event, pageElmntIndx) {
      event.dataTransfer.setData('text', pageElmntIndx);
    },
    drop(event, pageElmntIndx) {
      if (this.individEdit.elmntIndx) {
        this.site.pages[this.slctd.type][this.slctd.page] = JSON.parse(this.individEdit.elmnts);
        this.individEdit.elmntIndx = null;
        this.individEdit.elmnts = null;
      }
      if (
        this.site.htmlElmnts[this.site.pages[this.slctd.type][this.slctd.page][pageElmntIndx][0]].position === undefined
      ) {
        const draggedEl = this.site.pages[this.slctd.type][this.slctd.page][event.dataTransfer.getData('text')];
        if (Number(event.dataTransfer.getData('text')) > pageElmntIndx) {
          this.site.pages[this.slctd.type][this.slctd.page].splice(pageElmntIndx, 0, draggedEl);
          this.site.pages[this.slctd.type][this.slctd.page].splice(Number(event.dataTransfer.getData('text')) + 1, 1);
        } else {
          this.site.pages[this.slctd.type][this.slctd.page].splice(pageElmntIndx + 1, 0, draggedEl);
          this.site.pages[this.slctd.type][this.slctd.page].splice(Number(event.dataTransfer.getData('text')), 1);
        }
      }
    },
    toggleIndivEdit(indx) {
      if (this.individEdit.elmntIndx == indx) {
        this.site.pages[this.slctd.type][this.slctd.page] = JSON.parse(this.individEdit.elmnts);
        this.individEdit.elmntIndx = null;
        this.individEdit.elmnts = null;
      } else if (this.individEdit.elmntIndx === null) {
        this.individEdit.elmntIndx = indx;
        this.individEdit.elmnts = JSON.stringify(this.site.pages[this.slctd.type][this.slctd.page]);
        this.site.pages[this.slctd.type][this.slctd.page].forEach((page, pageIndex) => {
          page[1] = indx !== pageIndex ? false : true;
        });
      } else {
        this.individEdit.elmntIndx = indx;
        this.site.pages[this.slctd.type][this.slctd.page].forEach((page, pageIndex) => {
          page[1] = indx !== pageIndex ? false : true;
        });
      }
    },

    toggleElmnt(event, elmnt, indx) {
      if (this.defaults.htmlUniqSiteElmnts.includes(elmnt)) {
        // toggles unique element on all pages
        for (const [pageKey, pageVal] of Object.entries(this.site.pages[this.slctd.type])) {
          pageVal.forEach((element, elIndex) => {
            if (elmnt == element[0]) {
              this.site.pages[this.slctd.type][pageKey][elIndex][1] = event;
            }
          });
        }
      } else {
        // toggles non-unique element only on selected page
        this.site.pages[this.slctd.type][this.slctd.page][indx][1] = event;
      }
    },

    toggleLogInOut(newLogStatus, oldLogStatus) {
      !this.site.pages[this.slctd.type][newLogStatus]
        ? (this.site.pages[this.slctd.type][newLogStatus] = {
            [this.slctd.page]: this.site.pages[this.slctd.type][oldLogStatus][this.slctd.page],
          })
        : (this.site.pages[this.slctd.type][newLogStatus][this.slctd.page] =
            this.site.pages[this.slctd.type][oldLogStatus][this.slctd.page]);
      this.slctd.type = newLogStatus;
      delete this.site.pages[this.slctd.type][oldLogStatus][this.slctd.page];
    },
    pageSlctdFocus(event) {
      this.typeSlctd = event.target.value.split(',')[0];
      this.pageSlctd = event.target.value.split(',')[1];
    },
    pageSlctdChange(event) {
      this.slctd.type = event.target.value.split(',')[0];
      this.slctd.page = event.target.value.split(',')[1];
      // We might be able to get rid of the below since we are not using v-model anymore
      if (this.individEdit.elmnts !== null) {
        this.site.pages[this.typeSlctd][this.pageSlctd] = JSON.parse(this.individEdit.elmnts);
        this.individEdit.elmntIndx = null;
        this.individEdit.elmnts = null;
        this.typeSlctd = this.slctd.type;
        this.pageSlctd = this.slctd.page;
      } else {
        this.typeSlctd = this.slctd.type;
        this.pageSlctd = this.slctd.page;
      }
    },

    addCopyDeleteEl(event) {
      console.log('===============================');
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
          Object.entries(this.site.pages[this.slctd.type]).forEach(([page, pageEl]) => {
            filteredPageEl = pageEl.filter((a) => {
              return a[0] !== elmnt;
            });
            filteredPages[page] = filteredPageEl;
          });
          this.site.pages[this.slctd.type] = filteredPages;
          delete this.site.htmlElmnts[elmnt];
        }
      } else {
        console.log(this.slctdElmntButton + 'ing');
        console.log(this.copyingElmnt);
        if (this.slctdElmntButton == 'Copy' && !this.copyingElmnt) {
          console.log('step1');
          this.copyingElmnt = elmnt;
        } else {
          console.log('step2');
          const elPosition =
            this.slctdElmntButton == 'Copy'
              ? this.site.htmlElmnts[elmnt]?.position
              : this.defaults.htmlElmnts[elmnt]?.position;
          let newElPosition;
          if (0 < elPosition) {
            console.log('step3');
            newElPosition = this.pageElPositions.findLastIndex((el) => 0 < el && el < elPosition);
            newElPosition++;
          }
          if (0 > elPosition) {
            console.log('step4');
            newElPosition = this.pageElPositions.findIndex((el) => 0 > el && el > elPosition);
            newElPosition =
              0 > newElPosition ? this.site.pages[this.slctd.type][this.slctd.page].length : newElPosition;
          }
          if (elPosition === undefined) {
            console.log('step5');
            newElPosition = this.pageElPositions.findIndex((el) => 0 > el);
            newElPosition =
              0 > newElPosition ? this.site.pages[this.slctd.type][this.slctd.page].length : newElPosition;
          }
          if (this.defaults.htmlUniqSiteElmnts.includes(elmnt)) {
            console.log('step6');
            console.log(elmnt);
            if (!this.site.htmlElmnts[elmnt]) this.site.htmlElmnts[elmnt] = this.defaults.htmlElmnts[elmnt];
            Object.keys(this.site.pages).forEach((slctdType) => {
              for (const [pageKey, pageVal] of Object.entries(this.site.pages[slctdType])) {
                !JSON.stringify(pageVal).includes('["' + elmnt + '",') &&
                  this.site.pages[slctdType][pageKey].splice(newElPosition, 0, [elmnt, true]);
              }
            });
          } else if (this.defaults.htmlAllElmnts.includes(elmnt)) {
            console.log('step7');
            const newElName = elmnt + '_' + new Date().getTime();
            this.site.htmlElmnts[newElName] = JSON.parse(JSON.stringify(this.defaults.htmlElmnts[elmnt]));
            this.site.pages[this.slctd.type][this.slctd.page].splice(newElPosition, 0, [newElName, true]);
          } else {
            console.log('step8');
            this.site.pages[this.slctd.type][this.slctd.page].splice(newElPosition, 0, [elmnt, true]);
          }
          this.copyingElmnt = null;
        }
      }
      if (event?.srcElement?.selectedIndex) event.srcElement.selectedIndex = 0;
    },
    revealRenameInput(pageElmnt, pageElmntIndx) {
      if (!this.defaults.htmlUniqSiteElmnts.includes(pageElmnt[0])) {
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
      Object.keys(this.site.pages[this.slctd.type]).map((key) => pagesLowerCase.push(key.toLowerCase()));
      const htmlElmntsLowerCase = [];
      Object.keys(this.site.htmlElmnts).map((key) => htmlElmntsLowerCase.push(key.toLowerCase()));
      const contentHtmlElmntsLowerCase = [];
      Object.keys(this.defaults.htmlElmnts).map((key) => contentHtmlElmntsLowerCase.push(key.toLowerCase()));

      if (
        pagesLowerCase.includes(newPageElName.toLowerCase()) ||
        htmlElmntsLowerCase.includes(newPageElName.toLowerCase()) ||
        contentHtmlElmntsLowerCase.includes(newPageElName.toLowerCase())
      ) {
        this.showMsg('This name already exists!');
        this.$refs['renameInput' + pageElmntIndx][0].value = pageElmnt[0];
      } else {
        this.site.htmlElmnts[newPageElName] = this.site.htmlElmnts[pageElmnt[0]];
        let stringifiedPages = JSON.stringify(this.site.pages[this.slctd.type]).replaceAll(
          '"' + pageElmnt[0] + '"',
          '"' + newPageElName + '"'
        );
        this.site.pages[this.slctd.type] = JSON.parse(stringifiedPages);
        delete this.site.htmlElmnts[pageElmnt[0]];
        this.renamingPos = null;
      }
    },
    addPage() {
      if (this.addingPage) {
        this.site.pages[this.slctd.type][this.$refs.newPageName.value] = [];
        this.slctd.page = this.$refs.newPageName.value;
        this.siteElmnts.forEach((elType) => {
          if (this.defaults.htmlUniqSiteElmnts.includes(elType)) {
            this.slctdElmntButton = 'Copy';
            this.copyingElmnt = elType;
            this.addCopyDeleteEl(elType);
          }
        });
        this.slctdElmntButton = 'Add';
        this.addingPage = !this.addingPage;
      } else {
        this.addingPage = !this.addingPage;
      }
    },
    deletePage(slctdPage) {
      if (!this.defaults.reqrdPages.includes(slctdPage)) {
        if (this.addingPage) {
          this.addingPage = !this.addingPage;
        } else {
          this.slctd.page = 'Home';
          delete this.site.pages[this.slctd.type][slctdPage];
        }
      }
    },
    deletePageEl(elementIndex) {
      if (
        this.individEdit.elmnts === null &&
        !this.defaults.htmlReqrdPageElmnts.includes(this.site.pages[this.slctd.type][this.slctd.page][elementIndex][0])
      ) {
        this.site.pages[this.slctd.type][this.slctd.page].splice(elementIndex, 1);
      }
    },
    moveDown(elementIndex) {
      if (this.individEdit.elmnts === null) {
        const chosenElement = this.site.pages[this.slctd.type][this.slctd.page][elementIndex];
        this.site.pages[this.slctd.type][this.slctd.page].splice(elementIndex, 1);
        this.site.pages[this.slctd.type][this.slctd.page].splice(elementIndex + 1, 0, chosenElement);
      }
    },
    moveUp(elementIndex) {
      if (this.individEdit.elmnts === null) {
        const chosenElement = this.site.pages[this.slctd.type][this.slctd.page][elementIndex];
        this.site.pages[this.slctd.type][this.slctd.page].splice(elementIndex, 1);
        this.site.pages[this.slctd.type][this.slctd.page].splice(elementIndex - 1, 0, chosenElement);
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
  max-height: calc(100vh - 250px);
  overflow-y: auto;
}

.element-order-items i {
  padding-left: 2px;
  float: right;
}
</style>
