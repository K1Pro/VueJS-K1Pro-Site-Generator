<template>
  <div class="icon-slider">
    <div
      class="icon-slider-container"
      :style="{
        gridTemplateColumns: wndw.wdth >= respWidth.xs ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
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
            style.primaryColor,
          ]"
        >
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
          v-if="site.htmlElmnts[elKey]['items'][itemStart + itemIndex - 1]"
          class="icon-slider-item"
          :style="[
            {
              border: '1px solid ' + site.body.style.borderColor,
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
              :class="elValue['items'][itemStart + itemIndex - 1][1]"
            ></i>
          </div>
          <div style="padding: 0px 10px">
            <div
              class="icon-slider-text"
              :style="{
                'font-size': elValue.style.textSize + 'px',
              }"
            >
              {{ elValue['items'][itemStart + itemIndex - 1][0] }}
            </div>
          </div>
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
            style.primaryColor,
          ]"
        >
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

  inject: ['respWidth', 'wndw', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    itmAmnt() {
      return this.elValue['items'].length;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.wndw.wdth - 50) / 110);
    },
    showScroll() {
      return this.itmAmnt > this.wndwWdthRoundDown;
    },
    respvItemAmnt() {
      return this.itmAmnt > this.wndwWdthRoundDown && this.wndw.wdth >= this.respWidth.xs
        ? this.wndwWdthRoundDown
        : this.itmAmnt > this.wndwWdthRoundDown && this.wndw.wdth < this.respWidth.xs
        ? 3
        : this.itmAmnt;
    },
    gridTemplateColumnsFull() {
      return 'auto repeat(' + this.respvItemAmnt + ', 100px) auto';
    },
    gridTemplateColumnsMobile() {
      // prettier-ignore
      return '25px repeat(' + this.respvItemAmnt + ', calc('+ 100 / this.respvItemAmnt + '% - ' + 70 / this.respvItemAmnt + 'px) ) 25px';
    },
  },

  data() {
    return {
      itemStart: 0,
    };
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
}
.icon-slider-container {
  display: grid;
  column-gap: 5px;
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
@media only screen and (min-width: 650px) {
  .icon-slider-container {
    column-gap: 10px;
  }
}
</style>
