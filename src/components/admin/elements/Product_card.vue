<template>
  <div class="product-card" :style="[style.outline.borderColor]" ref="productCard">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <edit_menu
      :elKey="elKey"
      :elIndex="elIndex"
      :options="defaults.htmlElmnts[elValue.type].info.opts"
      @slctd-opt="slctdOpt = $event"
    ></edit_menu>
    <span :style="[style.outline.color]" class="dim">{{ productCardHght }}px x {{ productCardWdth }}px</span>

    <div :style="style.respPadding" style="display: grid; grid-template-columns: 30px auto 30px">
      <button class="scroller" :disabled="itemStart === 0" @click="itemStart--">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div
        class="product-card-cntnr"
        :style="{
          justifyContent: elValue.style['justify-content'] ? elValue.style['justify-content'] : 'space-evenly',
        }"
      >
        <template v-for="(card, cardIndx) in elValue.items">
          <div
            v-if="cardIndx < respvItemAmnt + itemStart && cardIndx >= itemStart"
            class="product-card-item"
            :style="divStyle"
          >
            <button
              class="product-card-add-rem"
              :style="{ right: elValue.items.length > 1 ? '15px' : '0px' }"
              @click="addItem(cardIndx)"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            <button
              class="product-card-add-rem"
              v-if="elValue.items.length > 1"
              style="right: 0px"
              @click="removeItem(cardIndx)"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <links
              v-if="slctdOpt == 'links'"
              :elKey="elKey"
              :elValue="elValue"
              :elIndex="elIndex"
              :itemVal="card"
              :itemIndx="cardIndx"
            ></links>

            <div class="product-card-group">
              <img
                :src="
                  card.img.includes('http://') || card.img.includes('https://') ? card.img : endPts.imagesURL + card.img
                "
                :alt="card.title"
                @drop.prevent="drop(cardIndx)"
                @dragover.prevent
                @dragenter.prevent
                :style="{
                  height: elValue.style['image-height'] ? elValue.style['image-height'] : '100px',
                }"
              />

              <input type="text" placeholder="Title" :style="textStyle" v-model="card.title" />
              <textarea placeholder="Description" :style="textareaStyle" v-model="card.txt"></textarea>
            </div>
          </div>
        </template>
      </div>
      <button class="scroller" :disabled="respvItemAmnt + itemStart >= elValue.items.length" @click="itemStart++">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product Card',

  inject: ['defaults', 'endPts', 'grid', 'imagesReq', 'respWidth', 'mediaReq', 'slctd', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      itemStart: 0,
      productCardHght: 0,
      productCardWdth: 0,
      slctdOpt: null,
    };
  },

  mounted() {
    this.productCardHght = this.$refs?.productCard?.scrollHeight;
    this.productCardWdth = this.$refs?.productCard?.scrollWidth;
    // if (!this.elValue.style['background-color'])
    //   this.elValue.style['background-color'] = this.style.primaryColor.backgroundColor.backgroundColor;
    // if (!this.elValue.style['border-color']) this.elValue.style['border-color'] = this.site.body.style.borderColor;
  },

  updated() {
    this.productCardHght = this.$refs?.productCard?.scrollHeight;
    this.productCardWdth = this.$refs?.productCard?.scrollWidth;
  },

  computed: {
    divStyle() {
      return {
        border:
          (this.elValue.style['border-width'] ? this.elValue.style['border-width'] : '0px') +
          ' solid ' +
          (this.elValue.style['border-color']
            ? this.elValue.style['border-color']
            : this.site.body.style.borderColor
            ? this.site.body.style.borderColor
            : 'white'),
        borderRadius: this.elValue.style['border-radius'] ? this.elValue.style['border-radius'] : '0px',
        backgroundColor:
          this.elValue.style.background && this.elValue.style['background-color']
            ? this.elValue.style['background-color']
            : this.elValue.style.background && this.site.body.style.backgroundColor
            ? this.site.body.style.backgroundColor
            : '#FFFFFF00',
        width:
          this.grid.wdth < this.respWidth.xs
            ? 'calc(33.33% - 10px)'
            : this.elValue.style.width && this.elValue.style.width.charAt(0) != '0'
            ? this.elValue.style.width
            : '50px',
      };
    },
    textStyle() {
      return {
        color: this.elValue.style.color ? this.elValue.style.color : 'black',
        fontSize: this.elValue.style['title-font-size'] ? this.elValue.style['title-font-size'] : '18px',
        marginTop: this.elValue.style.margin ? this.elValue.style.margin : '0px',
        marginBottom: this.elValue.style.margin ? this.elValue.style.margin : '0px',
        paddingTop: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        paddingLeft: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        paddingRight: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'center',
      };
    },
    textareaStyle() {
      return {
        color: this.elValue.style.color ? this.elValue.style.color : 'black',
        fontSize: this.elValue.style['font-size'] ? this.elValue.style['font-size'] : '12px',
        height: this.elValue.style.height ? this.elValue.style.height : '100px',
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'center',
        paddingLeft: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        paddingRight: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        paddingBottom: this.elValue.style.padding ? this.elValue.style.padding : '0px',
      };
    },
    wndwWdthRoundDown() {
      const wndwWdthRoundDownTemp = Math.floor(
        (this.grid.wdth - 60 - (this.grid.wdth >= this.respWidth.xs ? this.grid.wdth * 0.2 : 0)) /
          (this.elValue.style.width?.replace(/\D/g, '') && this.elValue.style.width?.replace(/\D/g, '') != '0'
            ? this.elValue.style.width?.replace(/\D/g, '')
            : 50)
      );
      return Math.floor(
        (this.grid.wdth -
          60 -
          wndwWdthRoundDownTemp * 10 -
          (this.grid.wdth >= this.respWidth.xs ? this.grid.wdth * 0.2 : 0)) /
          (this.elValue.style.width?.replace(/\D/g, '') && this.elValue.style.width?.replace(/\D/g, '') != '0'
            ? this.elValue.style.width?.replace(/\D/g, '')
            : 50)
      );
    },
    respvItemAmnt() {
      return this.elValue.items.length > this.wndwWdthRoundDown && this.grid.wdth >= this.respWidth.xs
        ? this.wndwWdthRoundDown
        : this.elValue.items.length > this.wndwWdthRoundDown && this.grid.wdth < this.respWidth.xs
        ? 3
        : this.elValue.items.length;
    },
  },

  methods: {
    async drop(itemIndex) {
      if (
        event?.dataTransfer.getData('text') &&
        !event?.dataTransfer.getData('text').includes('http://') &&
        !event?.dataTransfer.getData('text').includes('https://')
      ) {
        this.site.htmlElmnts[this.elKey].cards[itemIndex].img = event.dataTransfer.getData('text');
      } else if (event?.dataTransfer?.files?.[0]?.name) {
        this.imagesReq('POST', event.dataTransfer.files[0], 'images/' + slctd.job + '/' + this.elValue.type).then(
          (resJSON) => {
            this.site.htmlElmnts[this.elKey].cards[itemIndex].img = resJSON.data.asset_path;
          }
        );
      } else if (
        (event?.dataTransfer.getData('text').includes('http://') ||
          event?.dataTransfer.getData('text').includes('https://')) &&
        !event?.dataTransfer?.files?.[0]?.name
      ) {
        this.mediaReq('POST', event.dataTransfer.getData('text'), 'images/' + slctd.job + '/' + this.elValue.type).then(
          (resJSON) => {
            this.site.htmlElmnts[this.elKey].cards[itemIndex].img = resJSON.data.asset_path;
          }
        );
      } else {
        console.log('error');
      }
    },
    addItem(cardIndx) {
      this.site.htmlElmnts[this.elKey].cards.splice(cardIndx + 1, 0, {
        img: 'https://api-site.k1pro.net/public/default/logo/missingimage.png',
        title: '',
        txt: '',
      });
    },
    removeItem(cardIndx) {
      this.itemStart = this.itemStart === 0 ? 0 : this.itemStart - 1;
      this.site.htmlElmnts[this.elKey].cards.splice(cardIndx, 1);
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
.product-card {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.product-card-cntnr {
  display: flex;
}
.product-card-item {
  position: relative;
  overflow: visible;
}
.product-card-add-rem {
  position: absolute;
  top: 0;
  width: 15px;
  height: 15px;
}
.product-card-add-rem i {
  position: absolute;
  top: 2px;
  left: 3px;
  font-size: 8px;
}
.product-card-group img {
  width: 100%;
  object-fit: cover;
  margin-bottom: 0px;
}
.product-card-group input {
  width: 100%;
  border: 0px;
  background: transparent;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
}
.product-card-group textarea {
  width: 100%;
  background: transparent;
  resize: none;
  overflow-y: auto;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0%;
  border: none;
}
</style>
