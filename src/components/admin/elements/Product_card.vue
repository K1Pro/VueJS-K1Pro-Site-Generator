<template>
  <div
    :id="elKey"
    class="product-card"
    :style="[
      {
        borderWidth: elIndex == 0 ? '3px 3px 3px 3px' : '0px 3px 3px 3px',
      },
      style.outline.borderColor,
    ]"
  >
    <div
      class="product-card-container"
      :style="{
        gridTemplateColumns: grid.wdth > respWidth.md ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div class="product-card-item"></div>
      <template v-for="(productcard, cardIndex) in elValue['items']">
        <div class="product-card-item" :style="[style.primaryColor.backgroundColor]">
          <div class="product-card-group">
            <img :src="productcard[0]" :alt="productcard[1]" :style="{ 'margin-bottom': '0px' }" />
            <div class="product-card-text">
              <input type="text" class="product-card-header" v-model="site.htmlElmnts[elKey].items[cardIndex][1]" />
              <div style="position: relative">
                <textarea v-model="site.htmlElmnts[elKey].items[cardIndex][2]" @keydown.enter.prevent></textarea>
                <span>{{ productcard[2] }}</span>
              </div>
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

  inject: ['endPts', 'grid', 'respWidth', 'selectedPhoto', 'site', 'style', 'showMsg', 'wndw'],

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
  border-style: dashed;
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
.product-card-text {
  padding: 12px;
}
.product-card-text input {
  width: 100%;
  padding: 0%;
  border: 0px;
  background: transparent;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  margin-bottom: 12px;
}
.product-card-text span {
  color: transparent;
  word-break: break-word;
}
.product-card-text textarea {
  position: absolute;
  height: 100%;
  width: 100%;
  background: transparent;
  resize: none;
  outline: none;
}
.product-card-text span,
.product-card-text textarea {
  font-family: 'Helvetica', sans-serif;
  font-size: 16px;
  padding: 0%;
  margin: 0%;
  border: none;
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
