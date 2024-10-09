<template>
  <div :id="elKey" class="product-card" :style="[style.outline.borderColor]">
    <div
      class="product-card-container"
      :style="{
        gridTemplateColumns: grid.wdth > 730 ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
      }"
    >
      <div>
        <div
          v-if="showScroll"
          class="product-card-prev"
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
        <div v-else class="product-card-item"></div>
      </div>

      <template v-for="cardIndex in respvItemAmnt">
        <div
          v-if="cardIndex === respvItemAmnt"
          :style="[
            {
              border: '1px solid ' + site.body.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor.backgroundColor,
          ]"
        >
          <div class="product-card-modify-container">
            <div class="product-card-modify">
              <i class="fa-solid fa-circle-plus greenWhitePlus" @click.prevent="addIcon"></i>
            </div>
          </div>
        </div>
        <div v-else class="product-card-item" :style="[style.primaryColor.backgroundColor]">
          <div class="product-card-group">
            <img
              :src="elValue['items'][itemStart + cardIndex - 1][0]"
              :alt="elValue['items'][itemStart + cardIndex - 1][1]"
              @drop.prevent="drop(itemStart + cardIndex - 1)"
              @dragover.prevent
              @dragenter.prevent
              :style="{ 'margin-bottom': '0px' }"
            />
            <div class="product-card-text">
              <input
                type="text"
                class="product-card-header"
                v-model="site.htmlElmnts[elKey].items[itemStart + cardIndex - 1][1]"
              />
              <div style="position: relative">
                <textarea
                  v-model="site.htmlElmnts[elKey].items[itemStart + cardIndex - 1][2]"
                  @keydown.enter.prevent
                ></textarea>
                <span>{{ elValue['items'][itemStart + cardIndex - 1][2] }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div>
        <div
          v-if="showScroll"
          class="product-card-next"
          :style="[
            {
              border: '1px solid ' + site.body.style.borderColor,
              'border-radius': elValue.style.borderRadius + 'px',
            },
            style.primaryColor.backgroundColor,
          ]"
        >
          <i
            v-if="showScroll && itemStart + respvItemAmnt < productCardItemAmount"
            class="fa-solid fa-chevron-right"
            style="cursor: pointer"
            @click="increaseScroll"
          ></i>
          <i
            v-if="showScroll && itemStart + respvItemAmnt >= productCardItemAmount"
            class="fa-solid fa-chevron-right"
            :style="{ color: site.body.style.textColor + '50' }"
          ></i>
        </div>
        <div v-else class="product-card-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product Card',

  inject: ['grid', 'respWidth', 'selectedMedia', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    productCardItemAmount() {
      return this.elValue['items'].length + 1;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.grid.wdth - 100) / 210);
    },
    showScroll() {
      return this.productCardItemAmount > this.wndwWdthRoundDown;
    },
    respvItemAmnt() {
      return this.productCardItemAmount > this.wndwWdthRoundDown && this.grid.wdth >= 730
        ? this.wndwWdthRoundDown
        : this.productCardItemAmount > this.wndwWdthRoundDown && this.grid.wdth < 730
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

  data() {
    return {
      itemStart: 0,
    };
  },

  methods: {
    drop(cardIndex) {
      this.site.htmlElmnts[this.elKey].items[cardIndex][0] = event.dataTransfer.getData('text');
    },
    increaseScroll() {
      this.itemStart++;
    },
    decreaseScroll() {
      this.itemStart--;
    },
    addIcon() {
      console.log('test');
    },
  },
};
</script>

<style>
.product-card {
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}

.product-card-container {
  display: grid;
  column-gap: 1%;
}
.product-card-modify-container {
  display: table;
  height: 100%;
}
.product-card-modify {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.product-card-modify i {
  position: relative;
  margin-left: 92px;
  margin-top: 0px;
  cursor: pointer;
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
.product-card-prev {
  height: 100%;
  float: right;
  padding: 350px 5px 0px 5px;
  margin: 0px;
}
.product-card-next {
  height: 100%;
  float: left;
  padding: 350px 5px 0px 5px;
  margin: 0px;
}
@media only screen and (min-width: 650px) {
  .product-card-group img {
    height: 250px;
  }
  .product-card-prev {
    padding: 250px 5px 0px 5px;
  }
  .product-card-next {
    padding: 250px 5px 0px 5px;
  }
}
</style>
