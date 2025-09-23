<template>
  <div class="resp-padding">
    <div class="icon-slider">
      <div style="display: grid; grid-template-columns: 30px calc(100% - 60px) 30px">
        <button class="scroller" :disabled="itemStart === 0" @click="itemStart--">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div
          class="icon-slider-cntnr"
          ref="cntnr"
          :style="{
            justifyContent: elValue.style['justify-content'] ? elValue.style['justify-content'] : 'space-evenly',
          }"
        >
          <template v-for="(icon, iconIndx) in elValue.icons">
            <component
              v-if="iconIndx < respvItemAmnt + itemStart && iconIndx >= itemStart"
              :is="icon.page || icon.link || icon.anchor ? 'a' : 'div'"
              class="icon-slider-item"
              :style="componentStyle"
              :href="
                icon.page
                  ? slctd.href + '/' + icon.page.toLowerCase()
                  : icon.anchor
                  ? slctd.href + '/' + icon.anchor.toLowerCase()
                  : icon.link
                  ? icon.link
                  : false
              "
              :target="icon.link ? '_blank' : '_self'"
            >
              <i :style="iStyle" :class="icon.icon"></i>
              <div
                :style="{
                  fontSize: elValue.style['font-size'] ? elValue.style['font-size'] : '12px',
                }"
              >
                <template v-if="elValue?.titles">{{ icon.title }}</template>
              </div>
            </component>
          </template>
        </div>

        <button class="scroller" :disabled="respvItemAmnt + itemStart >= elValue.icons.length" @click="itemStart++">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Icon Slider',

  inject: ['respWidth', 'slctd', 'site'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      itemStart: 0,
      cntnrWdth: 0,
    };
  },

  mounted() {
    this.cntnrWdth = this.$refs?.cntnr?.scrollWidth;
    window.addEventListener('resize', () => {
      this.cntnrWdth = this.$refs?.cntnr?.scrollWidth;
    });
  },

  computed: {
    iStyle() {
      return {
        fontSize: this.elValue.style['icon-size'] ? this.elValue.style['icon-size'] : '12px',
        paddingTop: this.elValue.style.margin ? this.elValue.style.margin : '0px',
        paddingBottom: this.elValue.style.margin ? this.elValue.style.margin : '0px',
      };
    },
    componentStyle() {
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
        color: this.elValue.style.color ? this.elValue.style.color : 'black',
        height: this.elValue.style.height ? this.elValue.style.height : false,
        padding: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'center',
        width:
          this.cntnrWdth <= this.respWidth.xs
            ? 'calc(33.33% - 10px)'
            : this.elValue.style.width && this.elValue.style.width.charAt(0) != '0'
            ? this.elValue.style.width
            : '50px',
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
      return this.elValue.icons.length > this.wndwWdthRoundDown && this.cntnrWdth > this.respWidth.xs
        ? this.wndwWdthRoundDown
        : this.elValue.icons.length > this.wndwWdthRoundDown && this.cntnrWdth <= this.respWidth.xs
        ? 3
        : this.elValue.icons.length;
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
.icon-slider {
  position: relative;
}
.icon-slider-cntnr {
  display: flex;
  gap: 10px;
}
.icon-slider-item {
  overflow: hidden;
  text-decoration: none;
}
</style>
