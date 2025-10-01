<template>
  <div class="resp-padding"><div style="height: 0.001px" ref="cntnr"></div></div>

  <div :class="{ 'resp-padding': elValue.style.responsive || cntnrWdth > respWidth.xs }">
    <div class="product-card">
      <div
        :style="{
          display: elValue.style.responsive || cntnrWdth > respWidth.xs ? 'grid' : 'block',
          gridTemplateColumns:
            elValue.style.responsive || cntnrWdth > respWidth.xs ? '30px calc(100% - 60px) 30px' : 'none',
        }"
      >
        <button
          v-if="elValue.style.responsive || cntnrWdth > respWidth.xs"
          class="scroller"
          :disabled="itemStart === 0"
          @click="itemStart--"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div
          class="product-card-cntnr"
          :style="{
            display: elValue.style.responsive || cntnrWdth > respWidth.xs ? 'flex' : 'block',
            justifyContent:
              cntnrWdth <= respWidth.xs && !elValue.style.responsive
                ? 'initial'
                : elValue.style['justify-content']
                ? elValue.style['justify-content']
                : 'space-evenly',
          }"
        >
          <template v-for="(card, cardIndx) in elValue.cards">
            <div
              v-if="itemStart <= cardIndx && cardIndx < respvItemAmnt + itemStart"
              class="product-card-item"
              :style="divStyle"
            >
              <div class="product-card-group">
                <img
                  :src="
                    card.img.includes('http://') || card.img.includes('https://')
                      ? card.img
                      : endPts.imagesURL + card.img
                  "
                  :alt="card.title"
                  :style="{
                    height: elValue.style['image-height'] ? elValue.style['image-height'] : '100px',
                  }"
                />
                <div :style="testStyle">{{ card.title }}</div>
                <div :style="textareaStyle">{{ card.txt }}</div>
              </div>
            </div>
          </template>
        </div>
        <button
          v-if="elValue.style.responsive || cntnrWdth > respWidth.xs"
          class="scroller"
          :disabled="respvItemAmnt + itemStart >= elValue.cards.length"
          @click="itemStart++"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product Card',

  inject: ['endPts', 'respWidth', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      itemStart: 0,
      cntnrWdth: 0,
    };
  },

  mounted() {
    this.cntnrWdth = this.$refs.cntnr.scrollWidth;
    window.addEventListener('resize', () => {
      this.cntnrWdth = this.$refs.cntnr.scrollWidth;
    });
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
        marginBottom: this.cntnrWdth <= this.respWidth.xs && !this.elValue.style.responsive ? '10px' : '0px',
        width:
          this.cntnrWdth <= this.respWidth.xs && !this.elValue.style.responsive
            ? '100%'
            : this.cntnrWdth <= this.respWidth.xs && this.elValue.style.responsive
            ? 'calc(33.33% - 10px)'
            : this.elValue.style.width && this.elValue.style.width.charAt(0) != '0'
            ? this.elValue.style.width
            : '50px',
      };
    },
    testStyle() {
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
        height:
          this.cntnrWdth <= this.respWidth.xs && !this.elValue.style.responsive && this.elValue.style.height
            ? 'auto'
            : this.elValue.style.height
            ? this.elValue.style.height
            : '100px',
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'center',
        paddingLeft: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        paddingRight: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        paddingBottom: this.elValue.style.padding ? this.elValue.style.padding : '0px',
      };
    },
    wndwWdthRoundDown() {
      return Math.floor(
        this.cntnrWdth /
          (this.elValue.style.width?.replace(/\D/g, '') && this.elValue.style.width?.replace(/\D/g, '') != '0'
            ? this.elValue.style.width?.replace(/\D/g, '')
            : 50)
      );
    },
    respvItemAmnt() {
      return this.elValue.cards.length > this.wndwWdthRoundDown && this.cntnrWdth > this.respWidth.xs
        ? this.wndwWdthRoundDown
        : this.elValue.cards.length > this.wndwWdthRoundDown && this.cntnrWdth <= this.respWidth.xs
        ? 3
        : this.elValue.cards.length;
    },
  },
};
</script>

<style>
.product-card {
  position: relative;
}
.product-card-cntnr {
  gap: 10px;
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
