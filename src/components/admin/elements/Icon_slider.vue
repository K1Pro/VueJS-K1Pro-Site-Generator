<template>
  <div :id="elKey" class="icon-slider" :style="[style.outline.borderColor]">
    <div
      class="icon-slider-container"
      :style="{
        gridTemplateColumns: grid.wdth >= respWidth.xs ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div>
        <div v-if="showScroll" class="icon-slider-prev">
          <i
            class="fa-solid fa-chevron-left"
            :style="{
              color: 0 < itemStart ? site.body.style.textColor : site.body.style.textColor + '50',
              cursor: 0 < itemStart ? 'pointer' : 'default',
            }"
            @click="0 < itemStart && itemStart--"
          ></i>
        </div>
        <div v-else class="icon-slider-item"></div>
      </div>

      <template v-for="itemIndex in respvItemAmnt">
        <div
          v-if="itemIndex === respvItemAmnt"
          :style="[
            {
              border: '1px solid ' + site.body.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor.backgroundColor,
          ]"
        >
          <div class="icon-slider-modify-container">
            <div class="icon-slider-modify">
              <i class="fa-solid fa-circle-plus greenWhitePlus" @click="addIcon"></i>
            </div>
          </div>
        </div>
        <div v-else style="text-align: right">
          <i
            v-if="itemStart + itemIndex - 1 !== 0"
            class="fa-solid fa-circle-minus redWhiteMinus"
            style="position: absolute; margin-left: -16px"
            @click="removeItem(itemStart + itemIndex - 1)"
          ></i>
          <div
            class="icon-slider-item"
            :style="[
              {
                border: '1px solid ' + site.body.style.borderColor,
                'border-radius': elValue.style.borderRadius + 'px',
              },
              style.primaryColor.backgroundColor,
            ]"
          >
            <div class="icon-slider-icon">
              <i
                :style="{
                  'font-size': elValue.style.iconSize + 'px',
                }"
                :class="elValue.icons[itemStart + itemIndex - 1].icon"
              ></i>
            </div>

            <select v-model="site.htmlElmnts[elKey].icons[itemStart + itemIndex - 1].icon">
              <icon_slider_options></icon_slider_options>
            </select>

            <input
              type="text"
              placeholder="Text here..."
              v-model="site.htmlElmnts[elKey].icons[itemStart + itemIndex - 1].title"
            />
            <select
              v-if="itemStart + itemIndex - 1 !== inputIndex"
              @change="changeLink($event.target.value, itemStart + itemIndex - 1)"
            >
              <option value="icon-slider-no-link">No link</option>
              <template v-for="siteType in Object.keys(site.pages)">
                <option value="Choose page" disabled>
                  ==={{ siteType.charAt(0).toUpperCase() + siteType.slice(1) }} pages===
                </option>
                <option
                  v-for="sitePage in Object.keys(site.pages[siteType])"
                  :selected="elValue.icons[itemStart + itemIndex - 1].page == sitePage"
                >
                  {{ sitePage }}
                </option>
              </template>
              <option value="Choose link" disabled>===Links===</option>
              <option value="icon-slider-link-opt">New link</option>
              <option v-if="elValue.icons[itemStart + itemIndex - 1].url" selected>
                {{ elValue.icons[itemStart + itemIndex - 1].url }}
              </option>
              <option value="Choose anchor" disabled>===Anchors===</option>
              <template v-for="siteType in Object.keys(site.pages)">
                <template v-for="[sitePage, sitePageEls] in Object.entries(site.pages[siteType])">
                  <template v-for="sitePageEl in sitePageEls">
                    <option
                      v-if="sitePageEl[1] && sitePageEl[2] && sitePageEl[2] != ''"
                      :value="[sitePage, sitePageEl[2]]"
                      :selected="
                        elValue.icons[itemStart + itemIndex - 1].anchor ==
                        sitePage.toLowerCase() + '#' + sitePageEl[2].toLowerCase()
                      "
                    >
                      {{ sitePageEl[2] }} ({{ sitePage }})
                    </option>
                  </template>
                </template>
              </template>
            </select>
            <input
              v-if="itemStart + itemIndex - 1 === inputIndex"
              type="text"
              placeholder="Enter URL"
              style="width: calc(85% - 14px)"
              v-model="iconURL"
            />
            <i
              v-if="itemStart + itemIndex - 1 === inputIndex"
              class="fa-solid fa-floppy-disk greenWhitePlus"
              style="width: 14px"
              @click="saveURL(itemStart + itemIndex - 1)"
            ></i>
          </div>
        </div>
      </template>

      <div>
        <div v-if="showScroll" class="icon-slider-next">
          <i
            class="fa-solid fa-chevron-right"
            :style="{
              color: itemStart + respvItemAmnt < itmAmnt ? site.body.style.textColor : site.body.style.textColor + '50',
              cursor: itemStart + respvItemAmnt < itmAmnt ? 'pointer' : 'default',
            }"
            @click="itemStart + respvItemAmnt < itmAmnt && itemStart++"
          ></i>
        </div>
        <div v-else class="icon-slider-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Icon Slider',

  inject: ['grid', 'respWidth', 'site', 'style', 'endPts', 'undoRedo'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    itmAmnt() {
      return this.elValue?.icons ? this.elValue.icons.length + 1 : 0;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.grid.wdth - 50) / 110);
    },
    showScroll() {
      return this.itmAmnt > this.wndwWdthRoundDown;
    },
    respvItemAmnt() {
      return this.itmAmnt > this.wndwWdthRoundDown && this.grid.wdth >= this.respWidth.xs
        ? this.wndwWdthRoundDown
        : this.itmAmnt > this.wndwWdthRoundDown && this.grid.wdth < this.respWidth.xs
        ? 3
        : this.itmAmnt;
    },
    gridTemplateColumnsFull() {
      return 'auto ' + 'repeat(' + this.respvItemAmnt + ', 100px) auto';
    },
    gridTemplateColumnsMobile() {
      // prettier-ignore
      return '25px repeat(' + this.respvItemAmnt + ', calc(33.33% - 30px)) 25px';
    },
  },

  data() {
    return {
      itemStart: 0,
      iconURL: '',
      inputIndex: null,
    };
  },

  methods: {
    addIcon() {
      this.site.htmlElmnts[this.elKey].icons[this.itmAmnt - 1] = { title: '', icon: 'fa-solid fa-question' };
      if (this.respvItemAmnt - (this.site.htmlElmnts[this.elKey].icons.length + 1) < 0) {
        this.itemStart = this.site.htmlElmnts[this.elKey].icons.length + 1 - this.respvItemAmnt;
      } else {
        this.itemStart = 0;
      }
    },
    removeItem(itemIndex) {
      if (this.itemStart !== 0) this.itemStart--;
      this.site.htmlElmnts[this.elKey].icons.splice(itemIndex, 1);
    },
    changeLink(event, itemIndex) {
      const slctdIcon = this.site.htmlElmnts[this.elKey].icons[itemIndex];
      if (event == 'icon-slider-no-link') {
        if (slctdIcon.url) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].url;
        if (slctdIcon.page) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].page;
        if (slctdIcon.anchor) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].anchor;
      } else if (event == 'icon-slider-link-opt') {
        this.inputType = 'title';
        this.inputIndex = itemIndex;
      } else if (event.includes(',')) {
        this.site.htmlElmnts[this.elKey].icons[itemIndex].anchor =
          event.split(',')[0].toLowerCase() + '#' + event.split(',')[1].toLowerCase();
        if (slctdIcon.url) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].url;
        if (slctdIcon.page) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].page;
      } else {
        this.site.htmlElmnts[this.elKey].icons[itemIndex].page = event;
        if (slctdIcon.url) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].url;
        if (slctdIcon.anchor) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].anchor;
      }
    },
    saveURL(itemIndex) {
      const slctdIcon = this.site.htmlElmnts[this.elKey].icons[itemIndex];
      this.site.htmlElmnts[this.elKey].icons[itemIndex].url = this.iconURL;
      if (slctdIcon.page) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].page;
      if (slctdIcon.anchor) delete this.site.htmlElmnts[this.elKey].icons[itemIndex].anchor;
      this.iconURL = '';
      this.inputIndex = null;
    },
  },

  watch: {
    respvItemAmnt() {
      this.itemStart = 0;
    },
    undoRedo() {
      this.itemStart = 0;
    },
  },
};
</script>

<style>
.icon-slider {
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.icon-slider-container {
  display: grid;
  column-gap: 10px;
}
.icon-slider-modify-container {
  display: table;
  height: 100%;
  width: 100%;
}
.icon-slider-modify {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.icon-slider-modify i {
  cursor: pointer;
}
.icon-slider-item {
  overflow: hidden;
  height: 22vh;
  padding: 20px 0px;
  text-align: center;
}
.icon-slider-icon {
  height: 50%;
}
.icon-slider-text {
  overflow: hidden;
  height: 50%;
}
.icon-slider-item input[type='text'] {
  width: 85%;
  padding: 5px;
  border-style: none;
  background: transparent;
}
.icon-slider-item select {
  width: 85%;
  padding: 5px 2px;
  border-style: none;
  background: transparent;
}
.icon-slider-item button {
  position: absolute;
  margin-left: 25px;
  margin-top: -10px;
  cursor: pointer;
}
.icon-slider-prev {
  height: 22vh;
  float: right;
  padding: 60px 5px 0px 5px;
  margin: 0px;
  width: 20px;
}
.icon-slider-next {
  height: 22vh;
  float: left;
  padding: 60px 5px 0px 5px;
  margin: 0px;
  width: 20px;
}
</style>
