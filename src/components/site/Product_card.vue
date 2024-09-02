<template>
  <div
    class="product-card"
    :style="{
      'padding-bottom': elValue.style['padding-bottom'] + 'px',
      'background-color': elValue.style.backgroundColor,
      'border-width': 'none',
      'border-style': 'none',
      'border-color': 'none',
    }"
  >
    <div
      class="product-card-container"
      :style="{
        gridTemplateColumns: wndw.wdth > respWidth.md ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div class="product-card-item"></div>
      <template v-for="(productcard, cardIndex) in elValue['items']">
        <div class="product-card-item" :style="{ 'background-color': site.body.style.primaryColor }">
          <div class="product-card-group">
            <img :src="productcard[0]" :alt="productcard[1]" :style="{ 'margin-bottom': '0px' }" />
            <div class="product-card-text" :style="{ padding: '12px' }">
              <div class="product-card-header">
                {{ productcard[1] }}
              </div>
              <p>
                {{ productcard[2] }}
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

  inject: ['respWidth', 'site', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    gridTemplateColumnsFull() {
      const side = (99 - this.elValue['items'].length * 21) / 2;
      const autos = '20% '.repeat(this.elValue['items'].length);
      return side + '% ' + autos + side + '%';
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
  column-gap: 1%;
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
@media only screen and (min-width: 650px) {
  .product-card-group img {
    height: 250px;
  }
}
</style>
