<template>
  <div class="icon-slider" :style="{ borderWidth: elIndex == 0 ? '3px 3px 3px 3px' : '0px 3px 3px 3px' }">
    <div
      class="icon-slider-container"
      :style="{
        gridTemplateColumns: wndw.wdth >= 400 ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div>
        <div
          v-if="showIconScroll"
          class="icon-slider-prev"
          :style="{
            'background-color': elValue.style.slideColor,
            border: '1px solid ' + elValue.style.borderColor,
            'border-radius': elValue.style.borderRadius + 'px',
            color: elValue.style.iconColor,
          }"
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
            :style="{ color: elValue.style.iconColor + '50' }"
          ></i>
        </div>
        <div v-else class="icon-slider-item"></div>
      </div>

      <template v-for="iconIndex in respvIconAmnt">
        <div
          v-if="site.htmlElmnts[elKey]['items'][iconStart + iconIndex - 1]"
          class="icon-slider-item"
          :style="{
            'background-color': elValue.style.slideColor,
            border: '1px solid ' + elValue.style.borderColor,
            'border-radius': elValue.style.borderRadius + 'px',
            color: elValue.style.iconColor,
          }"
        >
          <div class="icon-slider-icon">
            <i
              :style="{
                color: elValue.style.iconColor,
                'font-size': elValue.style.iconSize + 'px',
              }"
              :class="elValue['items'][iconStart + iconIndex - 1][1]"
            ></i>
          </div>

          <select
            :style="{
              width: '100%',
            }"
            v-model="site.htmlElmnts[elKey].items[iconStart + iconIndex - 1][1]"
          >
            <icon_slider_options></icon_slider_options>
          </select>

          <input
            type="text"
            placeholder="text here..."
            v-model="site.htmlElmnts[elKey].items[iconStart + iconIndex - 1][0]"
          />
          <!-- <div style="padding: 0px 10px">
            <div
              class="icon-slider-text"
              :style="{
                'font-size': elValue.style.textSize + 'px',
              }"
            >
              {{ elValue['items'][iconStart + iconIndex - 1][0] }}
            </div>
          </div> -->
        </div>
        <div
          v-else-if="iconSliderItemAmount < 10"
          :style="{
            'background-color': elValue.style.slideColor,
            border: '1px solid ' + elValue.style.borderColor,
            'border-radius': elValue.style.borderRadius + 'px',
          }"
        >
          <div class="icon-slider-modify-container">
            <div class="icon-slider-modify">
              <button class="plus" @click.prevent="addIcon"></button>
            </div>
          </div>
        </div>
      </template>

      <div>
        <div
          v-if="showIconScroll"
          class="icon-slider-next"
          :style="{
            'background-color': elValue.style.slideColor,
            border: '1px solid ' + elValue.style.borderColor,
            'border-radius': elValue.style.borderRadius + 'px',
            color: elValue.style.iconColor,
          }"
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
            :style="{ color: elValue.style.iconColor + '50' }"
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

  inject: ['grid', 'respWidth', 'wndw', 'site', 'endPts'],

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
      return this.iconSliderItemAmount > this.windowWidthRoundDown && this.wndw.wdth >= 400
        ? this.windowWidthRoundDown
        : this.iconSliderItemAmount > this.windowWidthRoundDown && this.wndw.wdth < 400
        ? 3
        : this.iconSliderItemAmount;
    },
    gridTemplateColumnsFull() {
      const autos = '100px '.repeat(this.respvIconAmnt);
      return 'auto ' + autos + 'auto';
    },
    gridTemplateColumnsMobile() {
      const autos = ('calc(' + 100 / this.respvIconAmnt + '% - ' + 70 / this.respvIconAmnt + 'px) ').repeat(
        this.respvIconAmnt
      );
      return '25px ' + autos + '25px';
    },
  },

  data() {
    return {
      menuChange: '',
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
  },
};
</script>

<style>
.icon-slider {
  position: relative;
  border-style: dashed;
  border-color: rgb(115, 115, 115);
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
  height: 140px;
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
  padding: 5px;
  border-style: none;
  width: 85%;
}
.icon-slider-item select {
  padding: 5px;
}
.icon-slider-item button {
  position: absolute;
  margin-left: 25px;
  margin-top: -10px;
  cursor: pointer;
}
.icon-slider-modify button {
  position: relative;
  margin-left: 40px;
  margin-top: 0px;
  cursor: pointer;
}
.icon-slider-prev {
  height: 140px;
  float: right;
  padding: 60px 5px 0px 5px;
  margin: 0px;
}
.icon-slider-next {
  height: 140px;
  float: left;
  padding: 60px 5px 0px 5px;
  margin: 0px;
}
</style>
