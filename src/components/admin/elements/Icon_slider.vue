<template>
  <div
    :id="elKey"
    class="icon-slider"
    :style="[{ borderWidth: elIndex == 0 ? '3px 3px 3px 3px' : '0px 3px 3px 3px' }, style.outline.borderColor]"
  >
    <div
      class="icon-slider-container"
      :style="{
        gridTemplateColumns: grid.wdth >= 400 ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div>
        <div
          v-if="showIconScroll"
          class="icon-slider-prev"
          :style="[
            {
              border: '1px solid ' + elValue.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor.backgroundColor,
          ]"
        >
          <i
            v-if="showIconScroll && 0 < iconStart"
            class="fa-solid fa-chevron-left"
            style="cursor: pointer"
            @click="decreaseScroll"
          ></i>
          <i
            v-if="showIconScroll && 0 == iconStart"
            class="fa-solid fa-chevron-left"
            :style="{ color: site.body.style.textColor + '50' }"
          ></i>
        </div>
        <div v-else class="icon-slider-item"></div>
      </div>

      <template v-for="iconIndex in respvIconAmnt">
        <div
          v-if="iconIndex === respvIconAmnt"
          :style="[
            {
              border: '1px solid ' + elValue.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor.backgroundColor,
          ]"
        >
          <div class="icon-slider-modify-container">
            <div class="icon-slider-modify">
              <i class="fa-solid fa-circle-plus greenWhitePlus" @click.prevent="addIcon"></i>
            </div>
          </div>
        </div>
        <div
          v-else
          class="icon-slider-item"
          :style="[
            {
              border: '1px solid ' + elValue.style.borderColor,
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
              :class="elValue['items'][iconStart + iconIndex - 1][1]"
            ></i>
          </div>

          <select v-model="site.htmlElmnts[elKey].items[iconStart + iconIndex - 1][1]">
            <icon_slider_options></icon_slider_options>
          </select>

          <input
            type="text"
            placeholder="text here..."
            v-model="site.htmlElmnts[elKey].items[iconStart + iconIndex - 1][0]"
          />
        </div>
      </template>

      <div>
        <div
          v-if="showIconScroll"
          class="icon-slider-next"
          :style="[
            {
              border: '1px solid ' + elValue.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor.backgroundColor,
          ]"
        >
          <i
            v-if="showIconScroll && iconStart + respvIconAmnt < iconSliderItemAmount"
            class="fa-solid fa-chevron-right"
            style="cursor: pointer"
            @click="increaseScroll"
          ></i>
          <i
            v-if="showIconScroll && iconStart + respvIconAmnt >= iconSliderItemAmount"
            class="fa-solid fa-chevron-right"
            :style="{ color: site.body.style.textColor + '50' }"
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
    iconSliderItemAmount() {
      return this.elValue['items'].length + 1;
    },
    windowWidthRoundDown() {
      return Math.floor((this.grid.wdth - 100) / 100);
    },
    showIconScroll() {
      return this.iconSliderItemAmount > this.windowWidthRoundDown;
    },
    respvIconAmnt() {
      return this.iconSliderItemAmount > this.windowWidthRoundDown && this.grid.wdth >= 400
        ? this.windowWidthRoundDown
        : this.iconSliderItemAmount > this.windowWidthRoundDown && this.grid.wdth < 400
        ? 3
        : this.iconSliderItemAmount;
    },
    gridTemplateColumnsFull() {
      const autos = 'repeat(' + this.respvIconAmnt + ', 100px) ';
      return 'auto ' + autos + 'auto';
    },
    gridTemplateColumnsMobile() {
      const autos =
        'repeat(' +
        this.respvIconAmnt +
        ', calc(' +
        100 / this.respvIconAmnt +
        '% - ' +
        70 / this.respvIconAmnt +
        'px)) ';
      return '25px ' + autos + '25px';
    },
  },

  data() {
    return {
      iconStart: 0,
    };
  },

  methods: {
    increaseScroll() {
      this.iconStart++;
    },
    decreaseScroll() {
      this.iconStart--;
    },
    addIcon() {
      if (this.site.htmlElmnts[this.elKey]['items'].length < 8) this.iconStart++;
      this.site.htmlElmnts[this.elKey]['items'].push(['', 'fa-solid fa-question']);
    },
  },

  watch: {
    respvIconAmnt() {
      this.iconStart = 0;
    },
    undoRedo() {
      this.iconStart = 0;
    },
  },
};
</script>

<style>
.icon-slider {
  position: relative;
  border-style: dashed;
}
.icon-slider-container {
  display: grid;
  column-gap: 5px;
}
.icon-slider-modify-container {
  display: table;
  height: 100%;
}
.icon-slider-modify {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.icon-slider-item {
  overflow: hidden;
  height: 20vh;
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
.icon-slider-modify i {
  position: relative;
  margin-left: 40px;
  margin-top: 0px;
  cursor: pointer;
}
.icon-slider-prev {
  height: 20vh;
  float: right;
  padding: 60px 5px 0px 5px;
  margin: 0px;
}
.icon-slider-next {
  height: 20vh;
  float: left;
  padding: 60px 5px 0px 5px;
  margin: 0px;
}
</style>
