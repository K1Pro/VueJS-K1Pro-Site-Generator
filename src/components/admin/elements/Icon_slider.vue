<template>
  <div :id="elKey" class="icon-slider" :style="[style.outline.borderColor]">
    <div
      class="icon-slider-container"
      :style="{
        gridTemplateColumns: grid.wdth >= respWidth.xs ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div>
        <div
          v-if="showScroll"
          class="icon-slider-prev"
          :style="[
            {
              border: '1px solid ' + site.body.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor.backgroundColor,
          ]"
        >
          <i
            v-if="showScroll && 0 < itemStart"
            class="fa-solid fa-chevron-left"
            style="cursor: pointer"
            @click="decreaseScroll"
          ></i>
          <i
            v-if="showScroll && 0 == itemStart"
            class="fa-solid fa-chevron-left"
            :style="{ color: site.body.style.textColor + '50' }"
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
              <i class="fa-solid fa-circle-plus greenWhitePlus" @click="addItem"></i>
            </div>
          </div>
        </div>
        <div
          v-else
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
              :class="elValue['items'][itemStart + itemIndex - 1][1]"
            ></i>
          </div>

          <select v-model="site.htmlElmnts[elKey].items[itemStart + itemIndex - 1][1]">
            <icon_slider_options></icon_slider_options>
          </select>

          <input
            type="text"
            placeholder="text here..."
            v-model="site.htmlElmnts[elKey].items[itemStart + itemIndex - 1][0]"
          />
        </div>
      </template>

      <div>
        <div
          v-if="showScroll"
          class="icon-slider-next"
          :style="[
            {
              border: '1px solid ' + site.body.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor.backgroundColor,
          ]"
        >
          <i
            v-if="showScroll && itemStart + respvItemAmnt < itmAmnt"
            class="fa-solid fa-chevron-right"
            style="cursor: pointer"
            @click="increaseScroll"
          ></i>
          <i
            v-if="showScroll && itemStart + respvItemAmnt >= itmAmnt"
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
    itmAmnt() {
      return this.elValue['items'].length + 1;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.grid.wdth - 100) / 100);
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
      return '25px repeat(' +  this.respvItemAmnt + ', calc(' + 100 / this.respvItemAmnt + '% - ' + 70 / this.respvItemAmnt + 'px)) 25px'
    },
  },

  data() {
    return {
      itemStart: 0,
    };
  },

  methods: {
    increaseScroll() {
      this.itemStart++;
    },
    decreaseScroll() {
      this.itemStart--;
    },
    addItem() {
      this.site.htmlElmnts[this.elKey]['items'].push(['', 'fa-solid fa-question']);
      if (this.respvItemAmnt - (this.site.htmlElmnts[this.elKey]['items'].length + 1) < 0) {
        this.itemStart = this.site.htmlElmnts[this.elKey]['items'].length + 1 - this.respvItemAmnt;
      } else {
        this.itemStart = 0;
      }
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
.icon-slider-modify i {
  position: relative;
  margin-left: 40px;
  margin-top: 0px;
  cursor: pointer;
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
