<template>
  <div class="product-card">
    <div
      class="product-card-container"
      :style="{
        gridTemplateColumns: wndw.wdth > 730 ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div v-if="wndw.wdth > 730" class="product-card-item"></div>
      <template v-for="itemIndex in respvItemAmnt">
        <div class="product-card-item" :style="[style.primaryColor]">
          <div class="product-card-group">
            <img
              :src="
                elValue.cards[itemIndex - 1].img.includes('http://') ||
                elValue.cards[itemIndex - 1].img.includes('https://')
                  ? elValue.cards[itemIndex - 1].img
                  : endPts.uploadFilesURL + elValue.cards[itemIndex - 1].img
              "
              :alt="elValue.cards[itemIndex - 1].title"
              :style="{ 'margin-bottom': '0px' }"
            />
            <div class="product-card-text" :style="{ padding: '12px' }">
              <div
                class="product-card-header"
                :style="{ fontSize: elValue.style.titleFontSize ? elValue.style.titleFontSize + 'vh' : '3vh' }"
              >
                {{ elValue.cards[itemIndex - 1].title }}
              </div>
              <p :style="{ fontSize: elValue.style.fontSize ? elValue.style.fontSize + 'vh' : '2vh' }">
                {{ elValue.cards[itemIndex - 1].txt }}
              </p>
            </div>
          </div>
        </div>
      </template>
      <div v-if="wndw.wdth > 730" class="product-card-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product Card',

  inject: ['endPts', 'respWidth', 'site', 'slctd', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    itmAmnt() {
      return this.elValue.cards.length;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.wndw.wdth - 100) / 210);
    },
    showScroll() {
      return this.itmAmnt > this.wndwWdthRoundDown;
    },
    respvItemAmnt() {
      return this.itmAmnt > this.wndwWdthRoundDown && this.wndw.wdth >= 730
        ? this.wndwWdthRoundDown
        : this.itmAmnt > this.wndwWdthRoundDown && this.wndw.wdth < 730
        ? this.itmAmnt
        : this.itmAmnt;
    },
    gridTemplateColumnsFull() {
      return 'auto repeat(' + this.respvItemAmnt + ', 210px) auto';
    },

    gridTemplateColumnsMobile() {
      return '100%';
    },
  },
};
</script>

<style>
.product-card {
  position: relative;
}
.product-card-container {
  display: grid;
  column-gap: 10px;
  padding: 1vh;
}
.product-card-item {
  overflow: visible;
  text-align: left;
}
.product-card-group button {
  position: relative;
  z-index: 1;
  height: 22px;
}
.product-card-group img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
.product-card-text textarea,
.product-card-text input {
  width: 96%;
  padding: 2%;
  border: 0px;
  background: transparent;
  font-family: Arial, Helvetica, sans-serif;
  resize: none;
}
.product-card-header,
.product-card-text input {
  overflow: hidden;
}
@media only screen and (min-width: 730px) {
  .product-card-container {
    padding: 0;
  }
  .product-card-group img {
    height: 250px;
  }
}
</style>
