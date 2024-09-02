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

    <div
      v-for="(pageElmnt, pageElmntIndx) in site.pages[page.slctd]"
      class="element-order-items"
      v-on:dblclick="revealRenameInput(pageElmnt, pageElmntIndx)"
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
        style="color: #ff0000; float: right"
        @click="deletePageEl(pageElmntIndx)"
      ></i>
      <input
        style="float: right"
        type="checkbox"
        v-if="renamingPos != pageElmntIndx"
        :checked="pageElmnt[1]"
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
      {{ pageElmntIndx != renamingPos ? pageElmnt[0].replaceAll('_', ' ') : '' }}
    </div>
    <hr />
    <select style="width: 100%" @change="createCopyDeleteEl">
      <option disabled selected>Create element</option>
      <template v-for="htmlElmnt in Object.keys(content.htmlElmnts).sort()">
        <option
          v-if="!siteElTypes.includes(htmlElmnt) || !content.htmlUniqElmnts.includes(htmlElmnt)"
          :value="'create*' + htmlElmnt"
        >
          {{ htmlElmnt.replaceAll('_', ' ') }}
        </option>
      </template>
      <option disabled v-if="Object.keys(site.htmlElmnts).length > 0"></option>
      <option disabled v-if="Object.keys(site.htmlElmnts).length > 0">Copy existing element</option>
      <template v-if="Object.keys(site.htmlElmnts).length > 0">
        <template v-for="[htmlElmntKey, htmlElmntVal] in Object.entries(site.htmlElmnts).sort()">
          <option
            v-if="!siteElTypes.includes(htmlElmntVal.type) || !content.htmlUniqElmnts.includes(htmlElmntVal.type)"
            :value="'copy*' + htmlElmntKey"
          >
            {{ htmlElmntKey.replaceAll('_', ' ') }}
          </option>
        </template>
      </template>
      <option disabled v-if="Object.keys(site.htmlElmnts).length > 0"></option>
      <option disabled v-if="Object.keys(site.htmlElmnts).length > 0">Delete existing element</option>
      <template v-if="Object.keys(site.htmlElmnts).length > 0">
        <option v-for="htmlElmnt in Object.keys(site.htmlElmnts).sort()" :value="'delete*' + htmlElmnt">
          {{ htmlElmnt.replaceAll('_', ' ') }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Element Order',

  inject: ['content', 'page', 'showMsg', 'site', 'endPts'],

  computed: {
    siteElTypes() {
      const siteElTypesArray = [];
      this.site.pages[this.page.slctd].forEach((el) => {
        siteElTypesArray.push(this.site.htmlElmnts[el[0]].type);
      });
      return siteElTypesArray;
    },
    siteElPositions() {
      const siteElPositionsArray = [];
      this.site.pages[this.page.slctd].forEach((el) => {
        siteElPositionsArray.push(this.site.htmlElmnts[el[0]]?.position);
      });
      return siteElPositionsArray;
    },
  },

  data() {
    return {
      addingPage: false,
      renamingPos: null,
      isHoverRenameSave: false,
    };
  },

  methods: {
    createCopyDeleteEl(event) {
      const action = event.target.value.split('*')[0];
      const elmnt = event.target.value.split('*')[1];
      if (action == 'delete') {
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
          action == 'copy' ? this.site.htmlElmnts[elmnt]?.position : this.content.htmlElmnts[elmnt]?.position;
        let newElPosition;
        if (0 < elPosition) {
          newElPosition = this.siteElPositions.findLastIndex((el) => 0 < el && el < elPosition);
          newElPosition++;
        }
        if (0 > elPosition) {
          newElPosition = this.siteElPositions.findIndex((el) => 0 > el && el > elPosition);
          newElPosition = 0 > newElPosition ? this.site.pages[this.page.slctd].length : newElPosition;
        }
        if (elPosition === undefined) {
          newElPosition = this.siteElPositions.findIndex((el) => 0 > el);
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

.element-order-items i {
  cursor: pointer;
  padding-left: 2px;
  float: right;
}
</style>
