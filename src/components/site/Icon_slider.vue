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
        <div
          v-else-if="itmAmnt < 10"
          :style="[
            {
              border: '1px solid ' + site.body.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor,
          ]"
        >
          <div class="icon-slider-modify-container">
            <div class="icon-slider-modify">
              <button class="plus" @click.prevent="addItem"></button>
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

  inject: ['respWidth', 'wndw', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    itmAmnt() {
      return this.elValue['items'].length;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.wndw.wdth - 100) / 100);
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
      menuChange: '',
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
      if (this.site.htmlElmnts[this.elKey]['items'].length < 8) this.itemStart++;
      this.site.htmlElmnts[this.elKey]['items'].push(['', 'fa-solid fa-question']);
    },
    deleteItem(itemIndex) {
      this.itemStart--;
      this.site.htmlElmnts[this.elKey]['items'].splice(itemIndex, 1);
    },
    menuAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
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
@media only screen and (min-width: 650px) {
  .icon-slider-container {
    column-gap: 10px;
  }
}
</style>
