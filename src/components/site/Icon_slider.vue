<template>
  <div class="icon-slider">
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
          :style="[
            {
              border: '1px solid ' + elValue.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor,
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
          v-if="site.htmlElmnts[elKey]['items'][iconStart + iconIndex - 1]"
          class="icon-slider-item"
          :style="[
            {
              border: '1px solid ' + elValue.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor,
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
          <div style="padding: 0px 10px">
            <div
              class="icon-slider-text"
              :style="{
                'font-size': elValue.style.textSize + 'px',
              }"
            >
              {{ elValue['items'][iconStart + iconIndex - 1][0] }}
            </div>
          </div>
        </div>
        <div
          v-else-if="iconSliderItemAmount < 10"
          :style="[
            {
              border: '1px solid ' + elValue.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor,
          ]"
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
          :style="[
            {
              border: '1px solid ' + elValue.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor,
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

  inject: ['respWidth', 'wndw', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    iconSliderItemAmount() {
      return this.elValue['items'].length;
    },
    windowWidthRoundDown() {
      return Math.floor((this.wndw.wdth - 100) / 100);
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
    deleteIcon(iconIndex) {
      this.iconStart--;
      this.site.htmlElmnts[this.elKey]['items'].splice(iconIndex, 1);
    },
    menuAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
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
.modPosition {
  position: absolute;
  top: 0;
  left: 5px;
  text-align: left;
}
.modPosition input[type='color'] {
  width: 150px;
}
.modPosition select {
  width: 150px;
  padding: 3px;
  margin: 0px;
}
.modChange {
  background-color: white;
  width: 150px;
}
.modChange input[type='range'] {
  width: 75%;
}
</style>
