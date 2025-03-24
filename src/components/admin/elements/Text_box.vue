<template>
  <div :id="elKey" class="text-box" :style="[style.outline.borderColor]">
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="['text-box_image', 'anchor', 'horizontal-rule']"></edit_menu>

    <div
      class="text-box-outer-container"
      :style="{
        padding: grid.wdth > respWidth.md ? '0px 10%' : '0px',
      }"
    >
      <div class="text-box-inner-container">
        <template v-if="elValue.img || elValue.img == ''">
          <div
            style="position: relative"
            :style="{
              float: elValue.img.align,
              width: !elValue.img.scale ? elValue.img.width[slctdScrn] + 'px' : elValue.img.scales[slctdScrn] + '%',
              height: elValue.img.height[slctdScrn] + 'px',
            }"
          >
            <div class="text-box-img-opts">
              <div>
                <button
                  @click="changeSlctdScrn"
                  :style="{ backgroundColor: cmptdSlctdScrn === slctdScrn ? 'palegreen' : 'pink' }"
                  :title="scaleIcons[slctdScrn].split('-')[1] + ' screen'"
                >
                  <i class="fa-solid" :class="scaleIcons[slctdScrn]"></i>
                </button>
                <input
                  type="number"
                  title="image height"
                  style="width: 50px"
                  @input="changeImgHeight"
                  :value="elValue.img.height[slctdScrn]"
                  step="0.01"
                />
                <input
                  :disabled="elValue.img.scale"
                  type="number"
                  title="image width"
                  style="width: 50px"
                  @input="changeImgWidth"
                  :value="elValue.img.width[slctdScrn]"
                  step="0.01"
                />
              </div>

              <div>
                <button @click="site.htmlElmnts[elKey].img.scale = !site.htmlElmnts[elKey].img.scale">
                  <i v-if="site.htmlElmnts[elKey].img.scale" class="fa-solid fa-up-right-and-down-left-from-center"></i>
                  <i v-else class="fa-solid fa-expand"></i>
                </button>
                <input
                  v-if="elValue.img.scale"
                  type="number"
                  title="mobile image scale"
                  style="width: 50px"
                  v-model="site.htmlElmnts[elKey].img.scales[slctdScrn]"
                  step="0.01"
                />
              </div>

              <div>
                <button title="image align">
                  <i
                    class="fa-solid"
                    :class="elValue.img.align == 'left' ? 'fa-align-left' : 'fa-align-right'"
                    @click="changeAlign"
                  ></i>
                </button>
              </div>
            </div>

            <img
              class="text-box-img-item"
              :style="{
                width: elValue.img.scale ? '100%' : elValue.img.width[slctdScrn] + 'px',
                height: elValue.img.scale ? '100%' : elValue.img.height[slctdScrn] + 'px',
                objectFit: elValue.img.scale ? 'cover' : false,
              }"
              :src="
                elValue.img.src.includes('http://') || elValue.img.src.includes('https://')
                  ? elValue.img.src
                  : endPts.imagesURL + elValue.img.src
              "
              ref="textBoxImg"
              @drop.prevent="drop"
              @dragover.prevent
              @dragenter.prevent
            />
          </div>
        </template>

        <div
          v-if="(elValue.txt != '' && elValue.txt != '<br>') || spanEnable === false"
          class="text-box-txt-item"
          spellcheck="false"
          contenteditable="true"
          v-html="elValue.txt"
          ref="textBoxTxtItem"
          @focusout="focusoutTxtBox($event)"
        ></div>
        <span v-else spellcheck="false" contenteditable="true" @focus="focusSpan"></span>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['endPts', 'grid', 'imagesReq', 'mediaReq', 'respWidth', 'site', 'slctd', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      slctdScrn: this.grid.wdth > this.respWidth.lg ? 2 : this.grid.wdth > this.respWidth.md ? 1 : 0,
      scaleIcons: ['fa-mobile-screen-button', 'fa-tablet-screen-button', 'fa-desktop'],
      spanEnable: this.elValue.txt != '' && this.elValue.txt != '<br>' ? false : true,
    };
  },

  computed: {
    textBoxImage() {
      return { height: this.$refs['textBoxImg'].naturalHeight, width: this.$refs['textBoxImg'].naturalWidth };
    },
    cmptdSlctdScrn() {
      return this.grid.wdth > this.respWidth.lg ? 2 : this.grid.wdth > this.respWidth.md ? 1 : 0;
    },
  },

  methods: {
    changeImgWidth(event) {
      this.site.htmlElmnts[this.elKey].img.width[this.slctdScrn] = Number(event.target.value);
      this.site.htmlElmnts[this.elKey].img.height[this.slctdScrn] = Number(
        Math.round(((event.target.value * this.textBoxImage.height) / this.textBoxImage.idth) * 100) / 100
      );
    },
    changeImgHeight(event) {
      this.site.htmlElmnts[this.elKey].img.height[this.slctdScrn] = Number(event.target.value);
      this.site.htmlElmnts[this.elKey].img.width[this.slctdScrn] = Number(
        Math.round(((event.target.value * this.textBoxImage.width) / this.textBoxImage.height) * 100) / 100
      );
    },
    changeAlign() {
      this.site.htmlElmnts[this.elKey].img.align = this.elValue.img.align == 'right' ? 'left' : 'right';
    },
    focusoutTxtBox(event) {
      this.site.htmlElmnts[this.elKey].txt = event.target.innerHTML;
      this.spanEnable = this.elValue.txt != '' && this.elValue.txt != '<br>' ? false : true;
    },
    async drop() {
      if (event?.dataTransfer.getData('text')) {
        this.site.htmlElmnts[this.elKey].img.src = event.dataTransfer.getData('text');
        this.mediaReq('POST', event.dataTransfer.getData('text'));
        setTimeout(() => {
          this.elValue.img.width.forEach((width, index) => {
            this.site.htmlElmnts[this.elKey].img.height[index] = this.elValue.img.height[this.slctdScrn];
            this.site.htmlElmnts[this.elKey].img.scales[index] = this.elValue.img.scales[this.slctdScrn];
            this.site.htmlElmnts[this.elKey].img.width[index] =
              Math.round(
                ((this.elValue.img.height[this.slctdScrn] * this.textBoxImage.width) / this.textBoxImage.height) * 100
              ) / 100;
          });
        }, 100);
      } else if (event?.dataTransfer?.files?.[0]?.name) {
        this.imagesReq('POST', event.dataTransfer.files[0]).then((resJSON) => {
          this.site.htmlElmnts[this.elKey].img.src = resJSON.data.file_name;
          setTimeout(() => {
            this.elValue.img.width.forEach((width, index) => {
              this.site.htmlElmnts[this.elKey].img.height[index] = this.elValue.img.height[this.slctdScrn];
              this.site.htmlElmnts[this.elKey].img.scales[index] = this.elValue.img.scales[this.slctdScrn];
              this.site.htmlElmnts[this.elKey].img.width[index] =
                Math.round(
                  ((this.elValue.img.height[this.slctdScrn] * this.textBoxImage.width) / this.textBoxImage.height) * 100
                ) / 100;
            });
          }, 100);
        });
      } else {
        console.log('error');
      }
    },
    changeSlctdScrn() {
      this.slctdScrn = this.slctdScrn > 1 ? 0 : this.slctdScrn + 1;
    },
    focusSpan() {
      this.spanEnable = false;
      setTimeout(() => {
        this.$refs['textBoxTxtItem'].focus();
      }, 100);
    },
  },

  watch: {
    'grid.wdth'(newGridWdth, oldGridWidth) {
      this.slctdScrn = newGridWdth > this.respWidth.lg ? 2 : newGridWdth > this.respWidth.md ? 1 : 0;
    },
  },
};
</script>

<style>
.text-box {
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.text-box-outer-container {
  width: 100%;
}
.text-box-inner-container:focus-within {
  outline: black inset 2px;
}
.text-box-opts {
  background-color: #efefef;
  height: 35px;
  padding: 5px;
  width: 50%;
}
.text-box-img-opts button {
  width: 27px;
}
.text-box-txt-item {
  padding: 10px;
  height: auto;
}
.text-box-txt-item:focus {
  outline: none;
}
.text-box-img-item {
  padding: 0px 10px 0px 10px;
}
.text-box-img-opts {
  position: absolute;
  top: 0;
  left: 10px;
}
.text-box span[contenteditable] {
  cursor: text;
  padding: 10px;
  display: block;
}
.text-box span[contenteditable]:empty::before {
  content: 'Enter text';
  color: grey;
}
</style>
