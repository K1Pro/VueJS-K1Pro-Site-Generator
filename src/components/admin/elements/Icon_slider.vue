<template>
  <div :id="elKey" class="icon-slider" :style="[style.outline.borderColor]" ref="iconSlider">
    <edit_menu
      :elKey="elKey"
      :elIndex="elIndex"
      :options="[
        'edit-mode1',
        'anchor',
        'background',
        'background-color',
        'color',
        'font-size',
        'height',
        'padding',
        'text-align',
        'url',
        'width',
      ]"
    ></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ iconSliderHght }}px x {{ iconSliderWdth }}px</span>

    <div :style="iconSliderContainer" style="display: grid; grid-template-columns: 30px auto 30px">
      <button
        style="width: 100%; border: none"
        :disabled="itemStart === 0"
        :style="{
          backgroundColor: site.body.style.backgroundColor,
          cursor: itemStart !== 0 ? 'pointer' : 'default',
        }"
        @click="itemStart--"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <div class="icon-slider-container">
        <template v-for="(icon, iconIndx) in elValue.icons">
          <div
            v-if="iconIndx < respvItemAmnt + itemStart && iconIndx >= itemStart"
            :style="{
              width:
                elValue.style.width && elValue.style['width-unit']
                  ? elValue.style.width + elValue.style['width-unit']
                  : '50px',
            }"
            style="position: relative"
          >
            <button :style="{ right: elValue.icons.length > 1 ? '27px' : '0px' }" @click="addIcon(iconIndx)">
              <i class="fa-solid fa-plus"></i>
            </button>
            <button v-if="elValue.icons.length > 1" style="right: 0px" @click="removeItem(iconIndx)">
              <i class="fa-solid fa-minus"></i>
            </button>
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
                    fontSize: elValue.style.iconSize + 'px',
                  }"
                  :class="icon.icon"
                ></i>
              </div>

              <select v-model="icon.icon">
                <icon_slider_options></icon_slider_options>
              </select>

              <input v-if="elValue.mod == 'links'" type="text" placeholder="Link" v-model="icon.link" />
              <select v-else-if="elValue.mod == 'pages'">
                <option disabled selected>Pages</option>
                <template v-for="(siteType, siteTypeIndx) in Object.keys(site.pages)">
                  <option value="Choose page" disabled>
                    ==={{ siteType.charAt(0).toUpperCase() + siteType.slice(1) }} pages===
                  </option>
                  <option v-for="sitePage in Object.keys(site.pages[siteType])" :selected="icon.page == sitePage">
                    {{ sitePage }}
                  </option>
                </template>
              </select>
              <select v-else-if="elValue.mod == 'anchors'">
                <option disabled selected>Anchors</option>
                <template v-for="siteType in Object.keys(site.pages)">
                  <template v-for="[sitePage, sitePageEls] in Object.entries(site.pages[siteType])">
                    <template v-for="sitePageEl in sitePageEls">
                      <option
                        v-if="sitePageEl[1] && sitePageEl[2] && sitePageEl[2] != ''"
                        :value="[sitePage, sitePageEl[2]]"
                        :selected="icon.anchor == sitePage.toLowerCase() + '#' + sitePageEl[2].toLowerCase()"
                      >
                        {{ sitePageEl[2] }} ({{ sitePage }})
                      </option>
                    </template>
                  </template>
                </template>
              </select>
              <input v-else type="text" placeholder="Title" v-model="icon.title" />
            </div>
          </div>
        </template>
      </div>

      <button
        style="width: 100%; border: none"
        :disabled="respvItemAmnt + itemStart >= elValue.icons.length"
        :style="{
          backgroundColor: site.body.style.backgroundColor,
          cursor: respvItemAmnt + itemStart < elValue.icons.length ? 'pointer' : 'default',
        }"
        @click="itemStart++"
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Icon Slider',

  inject: ['grid', 'respWidth', 'site', 'style', 'endPts', 'undoRedo'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      itemStart: 0,
      iconSliderHght: 0,
      iconSliderWdth: 0,
    };
  },

  mounted() {
    this.iconSliderHght = this.$refs?.iconSlider?.scrollHeight;
    this.iconSliderWdth = this.$refs?.iconSlider?.scrollWidth;
    if (!this.elValue.mod) this.elValue.mod = 'titles';
  },

  updated() {
    this.iconSliderHght = this.$refs?.iconSlider?.scrollHeight;
    this.iconSliderWdth = this.$refs?.iconSlider?.scrollWidth;
  },

  computed: {
    iconSliderContainer() {
      return {
        paddingLeft: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
        paddingRight: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
      };
    },
    wndwWdthRoundDown() {
      const wndwWdthRoundDownTemp = Math.floor(
        (this.grid.wdth - 60 - (this.grid.wdth >= this.respWidth.xs ? this.grid.wdth * 0.2 : 0)) /
          (this.elValue.style.width ? this.elValue.style.width : 100)
      );
      return Math.floor(
        (this.grid.wdth -
          60 -
          wndwWdthRoundDownTemp * 10 -
          (this.grid.wdth >= this.respWidth.xs ? this.grid.wdth * 0.2 : 0)) /
          (this.elValue.style.width ? this.elValue.style.width : 100)
      );
    },
    respvItemAmnt() {
      return this.elValue.icons.length > this.wndwWdthRoundDown && this.grid.wdth >= this.respWidth.xs
        ? this.wndwWdthRoundDown
        : this.elValue.icons.length > this.wndwWdthRoundDown && this.grid.wdth < this.respWidth.xs
        ? 3
        : this.elValue.icons.length;
    },
  },

  methods: {
    addIcon(iconIndx) {
      this.site.htmlElmnts[this.elKey].icons.splice(iconIndx + 1, 0, { title: '', icon: 'fa-solid fa-question' });
    },
    removeItem(iconIndx) {
      this.itemStart--;
      this.site.htmlElmnts[this.elKey].icons.splice(iconIndx, 1);
    },
  },

  watch: {
    respvItemAmnt() {
      this.itemStart = 0;
    },
  },
};
</script>

<style>
.icon-slider {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.icon-slider-container {
  display: flex;
  justify-content: space-evenly;
}
.icon-slider-container button {
  position: absolute;
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
</style>
