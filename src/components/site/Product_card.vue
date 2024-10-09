<template>
  <div class="product-card">
    <div
      class="product-card-container"
      :style="{
        gridTemplateColumns: wndw.wdth > 730 ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div class="product-card-item"></div>
      <template v-for="cardIndex in respvItemAmnt">
        <div class="product-card-item" :style="[style.primaryColor]">
          <div class="product-card-group">
            <img
              :src="elValue['items'][cardIndex - 1][0]"
              :alt="elValue['items'][cardIndex - 1][1]"
              :style="{ 'margin-bottom': '0px' }"
            />
            <div class="product-card-text" :style="{ padding: '12px' }">
              <div class="product-card-header">
                {{ elValue['items'][cardIndex - 1][1] }}
              </div>
              <p>
                {{ elValue['items'][cardIndex - 1][2] }}
              </p>
            </div>
          </div>
        </div>
      </template>
      <div class="product-card-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product Card',

  inject: ['respWidth', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    productCardItemAmount() {
      return this.elValue['items'].length;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.wndw.wdth - 100) / 210);
    },
    showScroll() {
      return this.productCardItemAmount > this.wndwWdthRoundDown;
    },
    respvItemAmnt() {
      return this.productCardItemAmount > this.wndwWdthRoundDown && this.wndw.wdth >= 730
        ? this.wndwWdthRoundDown
        : this.productCardItemAmount > this.wndwWdthRoundDown && this.wndw.wdth < 730
        ? this.productCardItemAmount
        : this.productCardItemAmount;
    },
    gridTemplateColumnsFull() {
      // const side = (99 - this.elValue['items'].length * 21) / 2;
      // const autos = '20% '.repeat(this.elValue['items'].length);
      // return side + '% ' + autos + side + '%';
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
  font-size: 30px;
  overflow: hidden;
}
@media only screen and (min-width: 730px) {
  .product-card-group img {
    height: 250px;
  }
}
</style>
