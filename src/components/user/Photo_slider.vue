<template>
  <div class="photo-slider">
    <div
      class="photo-slider-container"
      :style="{
        gridTemplateColumns: wndw.wdth >= respWidth.xs ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
        columnGap: wndw.wdth >= respWidth.xs ? elValue.style.columnGap + 'px' : '5px',
      }"
    >
      <div>
        <div
          v-if="showScroll"
          class="photo-slider-prev"
          :style="{
            height: elValue.style.height + 'vh',
            padding: 'calc(' + elValue.style.height / 2 + 'vh - 8px) 5px 0px 5px',
          }"
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
        <div v-else class="photo-slider-item"></div>
      </div>

      <div class="photo-slider-item" v-for="photoIndx in respvItemAmnt">
        <img
          v-if="elValue?.photos?.[itemStart + photoIndx - 1]?.src"
          class="photo-slider-item"
          :src="
            elValue.photos[itemStart + photoIndx - 1].src.includes('http://') ||
            elValue.photos[itemStart + photoIndx - 1].src.includes('https://')
              ? elValue.photos[itemStart + photoIndx - 1].src
              : endPts.imagesURL + elValue.photos[itemStart + photoIndx - 1].src
          "
          :style="{ height: elValue.style.height + 'vh' }"
        />
      </div>

      <div>
        <div
          v-if="showScroll"
          class="photo-slider-next"
          :style="{
            height: elValue.style.height + 'vh',
            padding: 'calc(' + elValue.style.height / 2 + 'vh - 8px) 5px 0px 5px',
          }"
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
        <div v-else class="photo-slider-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Photo slider',

  inject: ['endPts', 'respWidth', 'wndw', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      itemStart: 0,
    };
  },

  computed: {
    itmAmnt() {
      return this.elValue.photos ? this.elValue.photos.length : 0;
    },
    wndwWdthRoundDown() {
      return this.wndw.wdth >= this.respWidth.xs
        ? Math.floor((this.wndw.wdth - 50) / (this.elValue.style.width + this.elValue.style.columnGap))
        : 3;
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
      return 'auto ' + 'repeat(' + this.respvItemAmnt + ', ' + this.elValue.style.width + 'px) auto';
    },
    gridTemplateColumnsMobile() {
      return this.respvItemAmnt === 3
        ? '25px repeat(3, calc(33.33% - 23.3333px)) 25px'
        : this.respvItemAmnt === 2
        ? '25px repeat(2, calc(50% - 32.5px)) 25px'
        : '25px calc(100% - 55px) 25px';
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
.photo-slider {
  position: relative;
}
.photo-slider-container {
  display: grid;
}
.photo-slider-prev {
  float: right;
  margin: 0px;
  width: 20px;
}
.photo-slider-next {
  float: left;
  margin: 0px;
  width: 20px;
}
.photo-slider-item img {
  width: 100%;
  object-fit: cover;
}
</style>
