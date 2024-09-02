<template>
  <div
    class="product-card"
    :style="{
      borderWidth: elIndex == 0 ? '3px 3px 3px 3px' : '0px 3px 3px 3px',
    }"
  >
    <div
      class="product-card-container"
      :style="{
        gridTemplateColumns: grid.wdth > respWidth.md ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div class="product-card-item"></div>
      <template v-for="(productcard, cardIndex) in elValue['items']">
        <div class="product-card-item" :style="{ 'background-color': site.body.style.primaryColor }">
          <div class="product-card-group">
            <img :src="productcard[0]" :alt="productcard[1]" :style="{ 'margin-bottom': '0px' }" />
            <div class="product-card-text" :style="{ padding: '12px' }">
              <input type="text" class="product-card-header" v-model="site.htmlElmnts[elKey].items[cardIndex][1]" />
              <span
                spellcheck="false"
                contenteditable="plaintext-only"
                v-on:blur="updateProductCardDesc($event.target.innerHTML, cardIndex)"
                >{{ productcard[2] }}</span
              >
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

  inject: ['endPts', 'grid', 'respWidth', 'selectedPhoto', 'site', 'showMsg', 'wndw'],

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

  methods: {
    updateProductCardDesc(event, indx) {
      this.site.htmlElmnts[this.elKey].items[indx][2] = event;
    },
  },
};
</script>

<style>
.product-card {
  position: relative;
  border-style: dashed;
  border-color: rgb(115, 115, 115);
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
.product-card-text input {
  width: 96%;
  padding: 2%;
  border: 0px;
  background: transparent;
  font-family: Arial, Helvetica, sans-serif;
  resize: none;
}
.product-card-text span[contenteditable] {
  min-height: 32px;
  display: block; /* not sure if this is needed */
}
.product-card-text span[contenteditable]:focus {
  outline: none;
}
.product-card-text span[contenteditable]:empty::before {
  min-height: 32px;
  content: 'Enter description';
  display: inline-block;
  color: grey;
}
.product-card-text span[contenteditable]:empty:focus::before {
  content: 'Start typing';
  color: grey;
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
