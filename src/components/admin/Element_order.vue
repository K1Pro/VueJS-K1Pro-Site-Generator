<template>
  <div class="element-order">
    <div class="element-order-mode-buttons">
      <button title="Add" @click="modeChng" class="fa-solid fa-plus element-order-mode-button"></button>
      <button title="Delete" @click="modeChng" class="fa-solid fa-minus element-order-mode-button"></button>
      <button title="Order" @click="modeChng" class="fa-solid fa-up-down element-order-mode-button"></button>
      <button title="Disable" @click="modeChng" class="fa-solid fa-pause element-order-mode-button"></button>
      <button
        title="Individual edit mode"
        v-if="slctd.indEdtIndx === null"
        @click="modeChng"
        class="fa-solid fa-magnifying-glass-plus element-order-mode-button"
      ></button>
      <button
        title="Individual edit mode"
        v-else
        @click="modeChng"
        class="fa-solid fa-magnifying-glass-minus element-order-mode-button"
      ></button>
      <button title="Rename" @click="modeChng" class="fa-solid fa-pen-to-square element-order-mode-button"></button>
      <button
        :title="slctd.page + ' is the default page'"
        v-if="slctd.page.toLowerCase() == site.defaultPage[slctd.type]"
        class="fa-solid fa-house-circle-check element-order-mode-button"
      ></button>
      <button
        :title="'Set ' + slctd.page + ' to default'"
        v-if="slctd.page.toLowerCase() != site.defaultPage[slctd.type]"
        @click="site.defaultPage[slctd.type] = slctd.page.toLowerCase()"
        class="fa-solid fa-house fa-regular fa-house element-order-mode-button"
      ></button>
      <button
        title="Logged in"
        v-if="Object.keys(site.pages.loggedin).includes(slctd.page)"
        @click="changeLogInOut(false)"
        class="fa-solid fa-lock element-order-mode-button"
      ></button>
      <button
        title="Logged out"
        v-if="Object.keys(site.pages.loggedout).includes(slctd.page)"
        @click="changeLogInOut(true)"
        class="fa-solid fa-lock-open element-order-mode-button"
      ></button>
      <button class="fa-solid fa-floppy-disk element-order-mode-button" @click="patchSite"></button>
      <button class="fa-solid fa-rotate-left element-order-mode-button" @click="getSite"></button>
      <button class="fa-solid fa-rotate-right element-order-mode-button"></button>
    </div>
    <hr />
    <select
      v-if="!['Rename'].includes(slctd.edtMd)"
      :style="{ width: ['Add', 'Delete'].includes(slctd.edtMd) ? 'calc(100% - 30px)' : '100%' }"
      style="margin-right: 10px"
      @change="selectPg"
    >
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
    <input v-if="slctd.edtMd == 'Rename'" type="text" style="width: 100%" :value="slctd.page" @change="renamePg" />
    <i v-if="slctd.edtMd == 'Add'" class="fa-solid fa-square-plus element-order-btn" @click="addPg"></i>
    <i v-if="slctd.edtMd == 'Delete'" class="fa-solid fa-square-minus element-order-btn" @click="deletePg"></i>
    <hr />
    <div class="element-order-list">
      <div
        v-for="(el, elIndx) in site.pages[slctd.type][slctd.page]"
        class="element-order-items"
        :style="{
          backgroundColor:
            (slctd.indEdtIndx === null && el[1]) || elIndx === slctd.indEdtIndx ? 'lightgrey' : '#e8e8e8',
        }"
        @mouseover="el[1] && slctd.edtMd !== 'Order' ? mouseoverPageEl(elIndx) : false"
        @mouseout="el[1] && slctd.edtMd !== 'Order' ? mouseoutPageEl(elIndx) : false"
        :draggable="
          el[0] == 'new_element' ||
          defaults?.htmlElmnts?.[site?.htmlElmnts?.[el?.[0]]?.type]?.info?.position !== undefined ||
          slctd.indEdtIndx !== null
            ? false
            : true
        "
        @dragstart="slctd.indEdtIndx === null ? drag($event, elIndx) : false"
        @drop.prevent="slctd.indEdtIndx === null ? drop($event, elIndx) : false"
        @dragover.prevent
        @dragenter.prevent
      >
        <template v-if="el[0] == 'new_element'">
          <select
            @change="tmpEls[elIndx] = $event.target.value"
            :style="{ width: tmpEls[elIndx] ? 'calc(50% - 13px)' : 'calc(100% - 26px)' }"
          >
            <option disabled selected>Add element</option>
            <template v-for="[dfltHtmlEl, dfltHtmlElVal] in Object.entries(defaults.htmlElmnts).sort()">
              <option
                v-if="
                  (!pageElTypes.includes(dfltHtmlEl) || !dfltHtmlElVal?.info?.unique?.site) &&
                  (!pageElTypes.includes(dfltHtmlEl) || !dfltHtmlElVal?.info?.unique?.page) &&
                  !pageElPositions.includes(dfltHtmlElVal?.info?.position) &&
                  !dfltHtmlElVal?.info?.required
                "
                :value="dfltHtmlEl"
              >
                {{ dfltHtmlEl.replaceAll('_', ' ') }}
              </option>
            </template>
          </select>
          <select v-if="tmpEls[elIndx]" @change="addEl($event.target.value, elIndx)" style="width: calc(50% - 13px)">
            <option disabled selected>Choose {{ tmpEls[elIndx].replaceAll('_', ' ') }}</option>
            <option
              v-if="!siteElmnts.includes(tmpEls[elIndx]) || !defaults.htmlElmnts[tmpEls[elIndx]]?.info?.unique?.site"
              value="new_element"
            >
              new {{ tmpEls[elIndx].replaceAll('_', ' ') }}
            </option>
            <option
              v-for="[htmlElmntKey, htmlElmntVal] in Object.entries(site.htmlElmnts)
                .filter(([elKey, elVal]) => {
                  return elVal.type == tmpEls[elIndx];
                })
                .sort()"
              :value="htmlElmntKey"
            >
              {{ htmlElmntKey.replaceAll('_', ' ') }}
            </option>
          </select>
          <i
            class="fa-solid fa-square-minus element-order-btn"
            @click="site.pages[slctd.type][slctd.page].splice(elIndx, 1)"
          ></i>
        </template>
        <template v-else>
          <i
            v-if="
              slctd.edtMd == 'Add' &&
              (defaults?.htmlElmnts?.[site?.htmlElmnts?.[el?.[0]]?.type]?.info?.position === undefined ||
                (defaults?.htmlElmnts?.[
                  site?.htmlElmnts?.[site?.pages?.[slctd?.type]?.[slctd?.page]?.[elIndx + 1]?.[0]]?.type
                ]?.info?.position === undefined &&
                  site?.pages?.[slctd?.type]?.[slctd.page]?.[elIndx + 1]))
            "
            class="fa-solid fa-square-plus element-order-btn"
            :style="{
              float: 'right',
            }"
            @click="site.pages[slctd.type][slctd.page].splice(elIndx + 1, 0, ['new_element', true])"
          ></i>
          <i
            v-if="slctd.edtMd == 'Delete' && !defaults?.htmlElmnts?.[site?.htmlElmnts?.[el?.[0]]?.type]?.info?.required"
            class="fa-solid fa-square-minus element-order-btn"
            :style="{
              float: 'right',
            }"
            @click="deleteEl(el[0], elIndx)"
          ></i>
          <input
            v-if="slctd.edtMd == 'Individual edit mode'"
            type="radio"
            style="float: right"
            :checked="elIndx === slctd.indEdtIndx"
            name="individEdit"
            @click="slctd.indEdtIndx = elIndx"
          />
          <input
            style="float: right"
            type="checkbox"
            v-if="slctd.edtMd == 'Disable'"
            :checked="el[1]"
            @change="disableEl($event.target.checked, el[0], elIndx)"
          />
          <i
            v-if="
              slctd.edtMd == 'Order' &&
              elIndx != site.pages[slctd.type][slctd.page].length - 1 &&
              defaults?.htmlElmnts?.[site?.htmlElmnts?.[el?.[0]]?.type]?.info?.position === undefined &&
              defaults?.htmlElmnts?.[site?.htmlElmnts?.[site.pages[slctd.type][slctd.page][elIndx + 1][0]]?.type]?.info
                ?.position === undefined
            "
            class="fa-solid fa-square-caret-down"
            @click="orderEl(elIndx, 1)"
          ></i>
          <i
            v-if="
              slctd.edtMd == 'Order' &&
              elIndx != 0 &&
              defaults?.htmlElmnts?.[site?.htmlElmnts?.[el?.[0]]?.type]?.info?.position === undefined &&
              defaults?.htmlElmnts?.[site?.htmlElmnts?.[site.pages[slctd.type][slctd.page][elIndx - 1][0]]?.type]?.info
                ?.position === undefined
            "
            class="fa-solid fa-square-caret-up"
            @click.prevent="orderEl(elIndx, -1)"
          ></i>
          <input
            v-if="slctd.edtMd == 'Rename'"
            type="text"
            :value="el[0]"
            style="width: 100%"
            @change="renameEl($event, elIndx)"
          />
          <span
            v-else
            v-on:dblclick="highlightPageEl(elIndx)"
            :style="{ color: (slctd.indEdtIndx === null && el[1]) || elIndx === slctd.indEdtIndx ? 'black' : 'grey' }"
            :title="site.htmlElmnts[el[0]].type ? site.htmlElmnts[el[0]].type : false"
            >{{ el[0].replaceAll('_', ' ') }}</span
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Element Order',

  inject: [
    'defaults',
    'getSite',
    'pageElPositions',
    'pageElTypes',
    'patchSite',
    'showMsg',
    'site',
    'siteElmnts',
    'slctd',
  ],

  data() {
    return {
      tmpEls: {},
      tmpBckgrnd: null,
    };
  },

  watch: {
    'slctd.page'() {
      this.tmpEls = {};
    },
  },

  methods: {
    modeChng(event) {
      console.log(event.target.title);
      this.tmpEls = {};
      this.slctd.indEdtIndx = null;
      this.slctd.edtMd = event.target.title;
    },
    changeLogInOut(event) {
      if (event) {
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
          confirm('A loggedout page with the same name already exists. Replace?') === true
        ) {
          this.site.pages['loggedout'][this.slctd.page] = this.site.pages['loggedin'][this.slctd.page];
          this.slctd.type = 'loggedout';
          delete this.site.pages['loggedin'][this.slctd.page];
        }
      }
    },
    mouseoverPageEl(elIndx) {
      if (document.getElementById('site_page_el_' + elIndx)) {
        if (document.getElementById('site_page_el_' + elIndx).style.backgroundColor)
          this.tmpBckgrnd = document.getElementById('site_page_el_' + elIndx).style.backgroundColor;
      }
    },
    highlightPageEl(elIndx) {
      if (document.getElementById('site_page_el_' + elIndx)) {
        document.getElementById('site_page_el_' + elIndx).style.backgroundColor = '#87CEFA50';
        document.getElementById('site_page_el_' + elIndx).scrollIntoView();
      }
    },
    mouseoutPageEl(elIndx) {
      if (document.getElementById('site_page_el_' + elIndx))
        document.getElementById('site_page_el_' + elIndx).style.backgroundColor = this.tmpBckgrnd
          ? this.tmpBckgrnd
          : '#87CEFA00';
      this.tmpBckgrnd = null;
    },
    drag(event, elIndx) {
      event.dataTransfer.setData('text', elIndx);
    },
    drop(event, elIndx) {
      if (
        this.defaults?.htmlElmnts?.[
          this.site?.htmlElmnts?.[this.site.pages[this.slctd.type][this.slctd.page][elIndx][0]]?.type
        ]?.info?.position === undefined
      ) {
        const draggedEl = this.site.pages[this.slctd.type][this.slctd.page][event.dataTransfer.getData('text')];
        if (Number(event.dataTransfer.getData('text')) > elIndx) {
          this.site.pages[this.slctd.type][this.slctd.page].splice(elIndx, 0, draggedEl);
          this.site.pages[this.slctd.type][this.slctd.page].splice(Number(event.dataTransfer.getData('text')) + 1, 1);
        } else {
          this.site.pages[this.slctd.type][this.slctd.page].splice(elIndx + 1, 0, draggedEl);
          this.site.pages[this.slctd.type][this.slctd.page].splice(Number(event.dataTransfer.getData('text')), 1);
        }
      }
    },
    selectPg(event) {
      this.slctd.indEdtIndx = null;
      this.slctd.type = event.target.value.split(',')[0];
      this.slctd.page = event.target.value.split(',')[1];
    },
    addPg() {
      let existingPgs = [];
      Object.keys(this.site.pages[this.slctd.type]).forEach((pgKey) => {
        if (pgKey.slice(0, 5) == 'Page ' && !pgKey.slice(5).replace(/[0-9]/g, '')) existingPgs.push(pgKey.slice(5));
      });
      const newPgName = existingPgs.length > 0 ? 'Page ' + (Math.max(...existingPgs) + 1) : 'Page 1';
      this.site.pages[this.slctd.type][newPgName] = [];
      Object.values(this.site.pages[this.slctd.type])[0].forEach((pg) => {
        if (this.defaults.htmlElmnts[this.site.htmlElmnts[pg[0]].type]?.info?.newPageCopy)
          this.site.pages[this.slctd.type][newPgName].push([pg[0], true]);
      });
      if (this.site.pages[this.slctd.type][newPgName].length === 0)
        this.site.pages[this.slctd.type][newPgName].push(['new_element', true]);
      this.slctd.page = newPgName;
    },
    deletePg() {
      delete this.site.pages[this.slctd.type][this.slctd.page];
      this.slctd.page = Object.keys(this.site.pages[this.slctd.type])[0];
    },
    renamePg(event) {
      if (JSON.stringify(this.site.pages[this.slctd.type]).includes('"' + event.target.value + '"')) {
        this.showMsg('This name already exists!');
        event.target.value = this.slctd.page;
      } else {
        this.site.pages[this.slctd.type][event.target.value] = this.site.pages[this.slctd.type][this.slctd.page];
        delete this.site.pages[this.slctd.type][this.slctd.page];
        this.slctd.page = event.target.value;
      }
    },
    addEl(event, elementIndex) {
      let newElName = event;
      let compTp = this?.site?.htmlElmnts?.[event]?.type;
      if (event === 'new_element') {
        compTp = this.tmpEls[elementIndex];
        const CompNm = compTp + '_';
        let existingEls = [];
        Object.entries(this.site.htmlElmnts).forEach(([elKey, elVal], htmlElIndx) => {
          const existCompNm = elKey.slice(0, CompNm.length);
          if (elVal.type == compTp && existCompNm == CompNm && !elKey.slice(CompNm.length).replace(/[0-9]/g, ''))
            existingEls.push(Number(elKey.slice(CompNm.length)));
        });
        newElName = existingEls.length > 0 ? compTp + '_' + (Math.max(...existingEls) + 1) : compTp + '_1';
        this.site.htmlElmnts[newElName] = JSON.parse(JSON.stringify(this.defaults.htmlElmnts[compTp]));
      }
      const pageElIndx =
        this?.defaults?.htmlElmnts?.[compTp]?.info?.position !== undefined
          ? this.defaults.htmlElmnts[compTp].info.position
          : elementIndex;
      this.site.pages[this.slctd.type][this.slctd.page].splice(pageElIndx, 1, [newElName, true]);
    },
    deleteEl(pageEl, elementIndex) {
      if (!this?.defaults?.htmlElmnts?.[this?.site?.htmlElmnts?.[pageEl]?.type]?.info?.required) {
        this.site.pages[this.slctd.type][this.slctd.page].splice(elementIndex, 1);
        if (this.site.pages[this.slctd.type][this.slctd.page].length === 0)
          this.site.pages[this.slctd.type][this.slctd.page] = [['new_element', true]]; // might be able to improve this
      }
    },
    orderEl(elementIndex, newIndex) {
      const chosenElement = this.site.pages[this.slctd.type][this.slctd.page][elementIndex];
      this.site.pages[this.slctd.type][this.slctd.page].splice(elementIndex, 1);
      this.site.pages[this.slctd.type][this.slctd.page].splice(elementIndex + newIndex, 0, chosenElement);
    },
    disableEl(event, elmnt, indx) {
      if (this.defaults.htmlElmnts[this.site.htmlElmnts[elmnt].type]?.info?.newPageCopy) {
        // disables unique element on all pages
        for (const [pageKey, pageVal] of Object.entries(this.site.pages[this.slctd.type])) {
          pageVal.forEach((element, elIndex) => {
            if (elmnt == element[0]) this.site.pages[this.slctd.type][pageKey][elIndex][1] = event;
          });
        }
      } else {
        // disables non-unique element only on selected page
        this.site.pages[this.slctd.type][this.slctd.page][indx][1] = event;
      }
    },
    renameEl(event, elIndx) {
      const crrntElName = this.site.pages[this.slctd.type][this.slctd.page][elIndx][0];
      if (JSON.stringify(this.site.pages).includes('"' + event.target.value + '"')) {
        this.showMsg('This name already exists!');
        event.target.value = crrntElName;
      } else {
        this.site.htmlElmnts[event.target.value] = this.site.htmlElmnts[crrntElName];
        this.site.pages = JSON.parse(
          JSON.stringify(this.site.pages).replaceAll('"' + crrntElName + '"', '"' + event.target.value + '"')
        );
        delete this.site.htmlElmnts[crrntElName];
      }
    },
  },
};
</script>

<style>
.element-order-items {
  color: black;
  padding: 3px;
  margin-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 26px;
}
.element-order-btn {
  font-size: 18px;
}
.element-order-list {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
.element-order-items i {
  padding-left: 2px;
  float: right;
}
.element-order-mode-buttons {
  height: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 0px;
  overflow: hidden;
}
.element-order-mode-button {
  border-width: 1px 0.5px;
  border-color: darkgrey;
  border-style: solid;
  height: 100%;
  width: 25px;
  font-size: 15px;
  background-color: #f0f0f0;
}
.element-order-mode-button:hover {
  background-color: lightblue;
}
.element-order-mode-button:focus {
  background-color: lightgrey;
}
.element-order span {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
