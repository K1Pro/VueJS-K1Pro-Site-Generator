<template>
  <div :id="elKey" class="photo-slider" :style="[style.outline.borderColor]">
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="['height', 'width', 'column-gap']"></edit_menu>
    <div
      class="photo-slider-container"
      :style="{
        gridTemplateColumns: grid.wdth >= respWidth.xs ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
        columnGap: grid.wdth >= respWidth.xs ? elValue.style.columnGap + 'px' : '5px',
      }"
    >
      <div>
        <div
          v-if="showScroll"
          class="photo-slider-prev"
          :style="{
            height: elValue.style.height + 'vh',
            padding: 'calc(' + elValue.style.height / 2 + 'vh - 8px) 5px 0px 5px',
          }"
        >
          <i
            class="fa-solid fa-chevron-left"
            :style="{
              color: 0 < itemStart ? site.body.style.textColor : site.body.style.textColor + '50',
              cursor: 0 < itemStart ? 'pointer' : 'default',
            }"
            @click="0 < itemStart && itemStart--"
          ></i>
        </div>
        <div v-else class="photo-slider-item"></div>
      </div>

      <div class="photo-slider-item" v-for="photoIndx in respvItemAmnt - 1">
        <img
          :src="
            elValue.photos[itemStart + photoIndx - 1].src.includes('http://') ||
            elValue.photos[itemStart + photoIndx - 1].src.includes('https://')
              ? elValue.photos[itemStart + photoIndx - 1].src
              : endPts.imagesURL + elValue.photos[itemStart + photoIndx - 1].src
          "
          :style="{ height: elValue.style.height + 'vh' }"
          @drop.prevent="drop(itemStart + photoIndx - 1)"
          @dragover.prevent
          @dragenter.prevent
        />
        <i
          v-if="itemStart + photoIndx - 1 !== 0"
          class="fa-solid fa-circle-minus redWhiteMinus"
          style="position: absolute; margin-left: -16px"
          @click="removeItem(itemStart + photoIndx - 1)"
        ></i>
      </div>

      <div
        class="photo-slider-add"
        :style="[
          {
            height: elValue.style.height + 'vh',
            padding: 'calc(' + elValue.style.height / 2 + 'vh - 8px) 0px 0px calc(50% - 8px)',
          },
          style.primaryColor.backgroundColor,
        ]"
      >
        <i class="fa-solid fa-circle-plus greenWhitePlus" @click="addPhoto"></i>
      </div>

      <div
        v-if="showScroll"
        class="photo-slider-next"
        :style="{
          height: elValue.style.height + 'vh',
          padding: 'calc(' + elValue.style.height / 2 + 'vh - 8px) 5px 0px 5px',
        }"
      >
        <i
          class="fa-solid fa-chevron-right"
          :style="{
            color: itemStart + respvItemAmnt < itmAmnt ? site.body.style.textColor : site.body.style.textColor + '50',
            cursor: itemStart + respvItemAmnt < itmAmnt ? 'pointer' : 'default',
          }"
          @click="itemStart + respvItemAmnt < itmAmnt && itemStart++"
        ></i>
      </div>
      <div v-else class="photo-slider-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Photo slider',

  inject: ['grid', 'respWidth', 'site', 'style', 'slctd', 'endPts', 'undoRedo'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      itemStart: 0,
    };
  },

  computed: {
    itmAmnt() {
      return this.elValue.photos ? this.elValue.photos.length + 1 : 0;
    },
    wndwWdthRoundDown() {
      return Math.floor((this.grid.wdth - 50) / (this.elValue.style.width + this.elValue.style.columnGap));
    },
    showScroll() {
      return this.itmAmnt > this.wndwWdthRoundDown;
    },
    respvItemAmnt() {
      return this.itmAmnt > this.wndwWdthRoundDown && this.grid.wdth >= this.respWidth.xs
        ? this.wndwWdthRoundDown
        : this.itmAmnt > this.wndwWdthRoundDown && this.grid.wdth < this.respWidth.xs
        ? 3
        : this.itmAmnt;
    },
    gridTemplateColumnsFull() {
      return 'auto ' + 'repeat(' + this.respvItemAmnt + ', ' + this.elValue.style.width + 'px) auto';
    },
    gridTemplateColumnsMobile() {
      return '25px repeat(' + this.respvItemAmnt + ', calc(33.33% - 23.3333px)) 25px';
    },
  },
  methods: {
    addPhoto() {
      this.site.htmlElmnts[this.elKey].photos.push({
        src: 'https://api-site.k1pro.net/public/default/logo/missingimage.png',
      });
      if (this.respvItemAmnt - (this.site.htmlElmnts[this.elKey].photos.length + 1) < 0) {
        this.itemStart = this.site.htmlElmnts[this.elKey].photos.length + 1 - this.respvItemAmnt;
      } else {
        this.itemStart = 0;
      }
    },
    removeItem(itemIndex) {
      if (this.itemStart !== 0) this.itemStart--;
      this.site.htmlElmnts[this.elKey].photos.splice(itemIndex, 1);
    },
    async drop(photoIndx) {
      if (event?.dataTransfer.getData('text')) {
        this.site.htmlElmnts[this.elKey].photos[photoIndx].src = event.dataTransfer.getData('text');
      } else if (event?.dataTransfer?.files?.[0]?.name) {
        let formData = new FormData();
        formData.append('uploaded_file', event.dataTransfer.files[0]);
        try {
          const response = await fetch(app_api_url + this.slctd.job + '/images', {
            method: 'POST',
            headers: {
              Authorization: access_token,
              'Cache-Control': 'no-store',
            },
            body: formData,
          });
          const resJSON = await response.json();
          if (resJSON.success) {
            this.site.htmlElmnts[this.elKey].photos[photoIndx].src = resJSON.data.file_name;
          } else {
          }
        } catch (error) {
          console.log(error.toString());
        }
      } else {
        console.log('error');
      }
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
.photo-slider {
  position: relative;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.photo-slider-prev {
  float: right;
  margin: 0px;
  width: 20px;
}
.photo-slider-next {
  float: left;
  margin: 0px;
  width: 20px;
}
.photo-slider-container {
  display: grid;
}
.photo-slider-item img {
  width: 100%;
  object-fit: cover;
}
</style>
