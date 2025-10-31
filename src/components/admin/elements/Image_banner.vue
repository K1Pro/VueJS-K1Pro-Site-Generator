<template>
  <div class="image-banner" :style="[style.outline.borderColor, divStyle]">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <edit_menu
      :elKey="elKey"
      :elIndex="elIndex"
      :options="
        elValue.caption
          ? ['caption', 'color', 'font-size', 'height', 'object-fit', 'text-align', 'width', 'paste']
          : ['caption', 'height', 'object-fit', 'width', 'paste']
      "
    ></edit_menu>
    <img
      :src="endPts.imagesURL + elValue.src"
      alt="image"
      :style="[imgStyle]"
      @drop.prevent="drop"
      @dragover.prevent
      @dragenter.prevent
    />
    <span
      v-if="elValue.caption"
      contenteditable="plaintext-only"
      :style="[spanStyle]"
      v-on:blur="elValue.caption = $event.target.innerHTML"
      >{{ elValue.caption === 'true' ? '' : elValue.caption }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'Image banner',

  inject: ['endPts', 'grid', 'imagesReq', 'pexelsReq', 'respWidth', 'mediaReq', 'site', 'sttngs', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    divStyle() {
      return {
        paddingLeft: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
        paddingRight: this.grid.wdth > this.respWidth.md ? '10%' : '5px',
      };
    },
    imgStyle() {
      return {
        height: this.elValue.style.height ? this.elValue.style.height : 'auto',
        width:
          this.grid.wdth < this.respWidth.xs ? '100%' : this.elValue.style.width ? this.elValue.style.width : 'auto',
        objectFit: this.elValue.style['object-fit'] ? this.elValue.style['object-fit'] : 'initial',
      };
    },
    spanStyle() {
      return {
        color: this.elValue.style.color ? this.elValue.style.color : 'black',
        fontSize:
          !this.elValue.style['font-size'] && !this.site.body.style['font-size']
            ? '12px'
            : !this.elValue.style['font-size'] && this.site.body.style['font-size']
            ? this.site.body.style['font-size']
            : this.elValue.style['font-size'].includes('vw')
            ? this.grid.wdth * (this.elValue.style['font-size']?.replace(/\D/g, '') / 100) + 'px'
            : this.elValue.style['font-size'],
        textAlign: this.elValue.style['text-align'] ? this.elValue.style['text-align'] : 'left',
      };
    },
  },

  methods: {
    async drop() {
      if (
        event?.dataTransfer.getData('text') &&
        !event?.dataTransfer.getData('text').includes('http://') &&
        !event?.dataTransfer.getData('text').includes('https://')
      ) {
        console.log('step1');
        this.site.htmlElmnts[this.elKey].src = event.dataTransfer.getData('text');
      } else if (event?.dataTransfer?.files?.[0]?.name) {
        console.log('step2');
        this.imagesReq('POST', event.dataTransfer.files[0], 'images/' + slctd.job + '/' + this.elValue.type).then(
          (resJSON) => {
            this.site.htmlElmnts[this.elKey].src = resJSON.data.asset_path;
          }
        );
      } else if (
        (event?.dataTransfer.getData('text').includes('http://') ||
          event?.dataTransfer.getData('text').includes('https://')) &&
        !event?.dataTransfer?.files?.[0]?.name
      ) {
        console.log('step3');
        this.mediaReq('POST', event.dataTransfer.getData('text'), 'images/' + slctd.job + '/' + this.elValue.type).then(
          (resJSON) => {
            this.site.htmlElmnts[this.elKey].src = resJSON.data.asset_path;
          }
        );
      } else {
        console.log('step4');
        console.log('error');
      }
    },
  },

  mounted() {
    if (Array.isArray(this.elValue.style)) this.elValue.style = {};
    if (this.elValue.src === null && this.site.keywords.length > 0) {
      this.pexelsReq(
        'GET',
        'img/' +
          this.site.keywords[Math.floor(Math.random() * this.site.keywords.length)].toLowerCase().replaceAll(' ', '+')
      ).then((resJSON) => {
        if (resJSON?.data?.photos.length > 1)
          this.elValue.src =
            resJSON?.data?.photos[Math.floor(Math.random() * resJSON?.data?.photos.length)]?.src?.large;
        console.log(this.endPts.imagesURL);
      });
    }
  },
};
</script>

<style>
.image-banner {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.image-banner img {
  max-width: 100%;
}
.image-banner span {
  width: 100%;
  display: block;
}
.image-banner span[contenteditable]:empty::before {
  content: 'Image banner caption';
  color: grey;
}
.image-banner span[contenteditable]:empty:focus::before {
  content: 'Start typing';
  color: grey;
}
</style>
