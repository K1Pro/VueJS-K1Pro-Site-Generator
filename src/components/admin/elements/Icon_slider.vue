<template>
  <div class="icon-slider" :style="[style.outline.borderColor]" ref="iconSlider">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <edit_menu
      :elKey="elKey"
      :elIndex="elIndex"
      :options="defaults.htmlElmnts[elValue.type].info.opts"
      @slctd-opt="slctdOpt = $event"
    ></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ iconSliderHght }}px x {{ iconSliderWdth }}px</span>

    <div :style="style.respPadding" style="display: grid; grid-template-columns: 30px auto 30px">
      <button class="scroller" :disabled="itemStart === 0" @click="itemStart--">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <div
        class="icon-slider-cntnr"
        :style="{
          justifyContent: elValue.style['justify-content'] ? elValue.style['justify-content'] : 'space-evenly',
        }"
      >
        <template v-for="(icon, iconIndx) in elValue.items">
          <div
            v-if="iconIndx < respvItemAmnt + itemStart && iconIndx >= itemStart"
            class="icon-slider-item"
            :style="componentStyle"
          >
            <button class="icon-slider-add-rem" style="right: 0px">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            <select
              class="icon-slider-select"
              :value="slctdIconIndx === iconIndx ? slctdIcon : ''"
              :style="{ height: slctdIconIndx === iconIndx ? '1px' : '15px' }"
              @focusin="slctIcon(iconIndx, icon.icon)"
              @focusout="slctIcon(null, '')"
              @change="
                icon.icon = $event.target.value;
                slctIcon(null, '');
              "
            >
              <icon_slider_options></icon_slider_options>
            </select>
            <button
              class="icon-slider-add-rem"
              :style="{ right: elValue.items.length > 1 ? '30px' : '15px' }"
              @click="addItem(iconIndx)"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            <button
              class="icon-slider-add-rem"
              v-if="elValue.items.length > 1"
              style="right: 15px"
              @click="removeItem(iconIndx)"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <links
              v-if="slctdOpt == 'links'"
              :elKey="elKey"
              :elValue="elValue"
              :elIndex="elIndex"
              :itemVal="icon"
              :itemIndx="iconIndx"
            ></links>
            <i :style="iStyle" :class="icon.icon"></i>

            <input
              v-if="elValue.titles"
              type="text"
              placeholder="Title"
              class="icon-slider-title"
              v-model="icon.title"
              :style="{
                color: elValue.style.color ? elValue.style.color : 'black',
                fontSize: elValue.style['font-size'] ? elValue.style['font-size'] : '12px',
                textAlign: elValue.style['text-align'] ? elValue.style['text-align'] : 'center',
              }"
            />
          </div>
        </template>
      </div>

      <button class="scroller" :disabled="respvItemAmnt + itemStart >= elValue.items.length" @click="itemStart++">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Icon Slider',

  inject: ['defaults', 'grid', 'respWidth', 'site', 'style', 'endPts', 'undoRedo'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      itemStart: 0,
      iconSliderHght: 0,
      iconSliderWdth: 0,
      slctdIconIndx: null,
      slctdIcon: '',
      slctdOpt: null,
    };
  },

  mounted() {
    this.iconSliderHght = this.$refs?.iconSlider?.scrollHeight;
    this.iconSliderWdth = this.$refs?.iconSlider?.scrollWidth;
    if (!this.elValue.mod) this.elValue.mod = 'titles';
    if (!this.elValue.style['background-color'])
      this.elValue.style['background-color'] = this.style.primaryColor.backgroundColor.backgroundColor;
    if (!this.elValue.style['border-color']) this.elValue.style['border-color'] = this.site.body.style.borderColor;
  },

  updated() {
    this.iconSliderHght = this.$refs?.iconSlider?.scrollHeight;
    this.iconSliderWdth = this.$refs?.iconSlider?.scrollWidth;
  },

  computed: {
    iStyle() {
      return {
        fontSize: this.elValue.style['icon-size'] ? this.elValue.style['icon-size'] : '12px',
        paddingTop: this.elValue.style.margin ? this.elValue.style.margin : '0px',
        paddingBottom: this.elValue.style.margin ? this.elValue.style.margin : '0px',
      };
    },
    componentStyle() {
      return {
        border:
          (this.elValue.style['border-width'] ? this.elValue.style['border-width'] : '0px') +
          ' solid ' +
          (this.elValue.style['border-color']
            ? this.elValue.style['border-color']
            : this.site.body.style.borderColor
            ? this.site.body.style.borderColor
            : 'white'),
        borderRadius: this.elValue.style['border-radius'] ? this.elValue.style['border-radius'] : '0px',
        backgroundColor:
          this.elValue.style.background && this.elValue.style['background-color']
            ? this.elValue.style['background-color']
            : this.elValue.style.background && this.site.body.style.backgroundColor
            ? this.site.body.style.backgroundColor
            : '#FFFFFF00',
        color: this.elValue.style.color ? this.elValue.style.color : 'black',
        height: this.elValue.style.height ? this.elValue.style.height : false,
        padding: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'center',
        width:
          this.grid.wdth < this.respWidth.xs
            ? 'calc(33.33% - 10px)'
            : this.elValue.style.width && this.elValue.style.width.charAt(0) != '0'
            ? this.elValue.style.width
            : '50px',
      };
    },
    wndwWdthRoundDown() {
      const wndwWdthRoundDownTemp = Math.floor(
        (this.grid.wdth - 60 - (this.grid.wdth >= this.respWidth.xs ? this.grid.wdth * 0.2 : 0)) /
          (this.elValue.style.width?.replace(/\D/g, '') && this.elValue.style.width?.replace(/\D/g, '') != '0'
            ? this.elValue.style.width?.replace(/\D/g, '')
            : 50)
      );
      return Math.floor(
        (this.grid.wdth -
          60 -
          wndwWdthRoundDownTemp * 10 -
          (this.grid.wdth >= this.respWidth.xs ? this.grid.wdth * 0.2 : 0)) /
          (this.elValue.style.width?.replace(/\D/g, '') && this.elValue.style.width?.replace(/\D/g, '') != '0'
            ? this.elValue.style.width?.replace(/\D/g, '')
            : 50)
      );
    },
    respvItemAmnt() {
      return this.elValue.items.length > this.wndwWdthRoundDown && this.grid.wdth >= this.respWidth.xs
        ? this.wndwWdthRoundDown
        : this.elValue.items.length > this.wndwWdthRoundDown && this.grid.wdth < this.respWidth.xs
        ? 3
        : this.elValue.items.length;
    },
  },

  methods: {
    slctIcon(iconIndx, icon) {
      this.slctdIconIndx = iconIndx;
      this.slctdIcon = icon;
    },
    addItem(iconIndx) {
      this.site.htmlElmnts[this.elKey].icons.splice(iconIndx + 1, 0, { title: '', icon: 'fa-solid fa-question' });
    },
    removeItem(iconIndx) {
      this.itemStart = this.itemStart === 0 ? 0 : this.itemStart - 1;
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
.icon-slider-cntnr {
  display: flex;
}
.icon-slider-item {
  position: relative;
  overflow: hidden;
}
.icon-slider-title {
  width: 100%;
  padding: 5px;
  border-style: none;
  background: transparent;
}
.icon-slider-add-rem {
  position: absolute;
  top: 0;
  width: 15px;
  height: 15px;
}
.icon-slider-add-rem i {
  position: absolute;
  top: 2px;
  left: 3px;
  font-size: 8px;
}
.icon-slider-select {
  position: absolute;
  top: 0;
  appearance: none;
  right: 0px;
  width: 100%;
  border-style: none;
  background: transparent;
}
.icon-slider-select:focus {
  outline: none;
}
</style>
