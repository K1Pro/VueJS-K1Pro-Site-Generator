<template>
  <div :id="elKey" class="product-card" :style="[style.outline.borderColor]">
    <div
      class="product-card-container"
      :style="{
        gridTemplateColumns: grid.wdth >= respWidth.md ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
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
          <div class="product-card-modify-container">
            <div class="product-card-modify">
              <i class="fa-solid fa-circle-plus greenWhitePlus" @click="addItem"></i>
            </div>
          </div>
        </div>
        <div v-else class="product-card-item" :style="[style.primaryColor.backgroundColor]">
          <div class="product-card-group">
            <img
              :src="elValue['items'][itemStart + itemIndex - 1][0]"
              :alt="elValue['items'][itemStart + itemIndex - 1][1]"
              @drop.prevent="drop(itemStart + itemIndex - 1)"
              @dragover.prevent
              @dragenter.prevent
              :style="{ 'margin-bottom': '0px' }"
            />
            <div class="product-card-text">
              <input
                type="text"
                class="product-card-header"
                placeholder="Title..."
                v-model="site.htmlElmnts[elKey].items[itemStart + itemIndex - 1][1]"
              />
              <div style="position: relative">
                <textarea
                  placeholder="Description..."
                  rows="7"
                  v-model="site.htmlElmnts[elKey].items[itemStart + itemIndex - 1][2]"
                  @keydown.enter.prevent
                ></textarea>
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
        <div v-else class="product-card-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product Card',

  inject: ['grid', 'respWidth', 'selectedMedia', 'site', 'style', 'undoRedo', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    itmAmnt() {
      return this.elValue['items'].length + 1;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.grid.wdth - 100) / 210);
    },
    showScroll() {
      return this.itmAmnt > this.wndwWdthRoundDown;
    },
    respvItemAmnt() {
      return this.itmAmnt > this.wndwWdthRoundDown && this.wndwWdthRoundDown >= 3
        ? this.wndwWdthRoundDown
        : this.itmAmnt > this.wndwWdthRoundDown && this.wndwWdthRoundDown < 3
        ? 3
        : this.itmAmnt;
    },
    gridTemplateColumnsFull() {
      return 'auto repeat(' + this.respvItemAmnt + ', 210px) auto';
    },
    gridTemplateColumnsMobile() {
      return 'auto repeat(' + this.respvItemAmnt + ', calc(33.33% - 33px)) auto';
    },
  },

  data() {
    return {
      itemStart: 0,
    };
  },

  methods: {
    drop(itemIndex) {
      this.site.htmlElmnts[this.elKey].items[itemIndex][0] = event.dataTransfer.getData('text');
    },
    increaseScroll() {
      this.itemStart++;
    },
    decreaseScroll() {
      this.itemStart--;
    },
    addItem() {
      this.site.htmlElmnts[this.elKey]['items'].push([
        'https://api-site.k1pro.net/public/default/logo/missingimage.png',
        '',
        '',
      ]);
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
.product-card {
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.product-card-container {
  display: grid;
  column-gap: 10px;
}
.product-card-modify-container {
  display: table;
  height: 100%;
  width: 100%;
}
.product-card-modify {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.product-card-modify i {
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
  height: 250px;
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
.product-card-text span:empty::before {
  content: 'Description...';
  color: grey;
}
.product-card-text textarea {
  /* position: absolute;
  height: 100%; */
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
  padding: 250px 5px 0px 5px;
  margin: 0px;
}
.product-card-next {
  height: 100%;
  float: left;
  padding: 250px 5px 0px 5px;
  margin: 0px;
}
</style>
