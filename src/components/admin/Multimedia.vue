<template>
  <div class="multimedia">
    <button
      v-for="btn in btns"
      @click="selectMediaType(btn.mdTp)"
      :style="{ backgroundColor: slctdMdTp == btn.mdTp ? 'darkgrey' : '#eee' }"
    >
      <i :class="'fa-solid ' + btn.icon"></i>
    </button>
    <select @change="selectSearch">
      <option v-if="files && files[slctdMdTp]" disabled selected>=== user files ===</option>
      <option
        v-if="files && files[slctdMdTp]"
        v-for="file in Object.keys(files[slctdMdTp])"
        title="files"
        :value="file"
        :selected="sttngs.user.mediaSrch.prvdr == 'files' && sttngs.user.mediaSrch?.[slctdMdTp] == file"
      >
        {{ file.replaceAll('_', ' ') }}
      </option>
      <option v-if="pexels?.[slctdMdTp]" disabled>=== pexels searches ===</option>
      <option
        v-if="pexels"
        v-for="pexel in pexels?.[slctdMdTp]"
        title="pexels"
        :value="pexel.search"
        :selected="sttngs.user.mediaSrch.prvdr == 'pexels' && sttngs.user.mediaSrch?.[slctdMdTp] == pexel.search"
      >
        {{ pexel.search.replaceAll('+', ' ') }}
      </option>
      <option v-if="slctdMdTp == 'txt'" disabled selected>=== text searches ===</option>
    </select>
    <input
      type="search"
      :value="sttngs.user.mediaSrch[slctdMdTp]?.replaceAll('+', ' ')?.replaceAll('_', ' ')"
      ref="searchInput"
      @keyup.enter="mediaSearch"
    />
    <button><i class="fa-solid fa-magnifying-glass" @click="mediaSearch"></i></button>
    <button style="border-right-width: 1px"><i class="fa-solid fa-trash"></i></button>
    <div class="multimedia-gallery" ref="multimediaGallery">
      <template v-if="mediaSrchArr !== null">
        <div class="multimedia-gallery-row">
          <div v-for="(mediaSrch, medisSrchIndx) in mediaSrchArr" class="multimedia-gallery-column">
            <img
              v-if="medisSrchIndx === 0 && sttngs.user.mediaSrch.prvdr == 'files'"
              src="https://api-site.k1pro.net/public/default/logo/dragdrop.jpg"
            />
            <div v-for="media in mediaSrch" style="position: relative">
              <img
                draggable="true"
                :src="media.src"
                :title="media.src"
                :style="{
                  border: '1px solid lightgrey',
                  outline: media.img == slctd.imgURL ? '8px solid LawnGreen' : 'none',
                  outlineOffset: media.img == slctd.imgURL ? '-8px' : '0',
                }"
                @click="selectImg($event, media.img)"
                @dragstart="drag($event, media.img)"
              />
              <i
                v-if="sttngs.user.mediaSrch.prvdr == 'files'"
                class="fa-solid fa-circle-minus redWhiteMinus"
                style="position: absolute; margin-left: -16px"
              ></i>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Multimedia',

  inject: ['endPts', 'files', 'pexels', 'pexelsReq', 'slctd', 'sttngs', 'sttngsReq'],

  data() {
    return {
      slctdMdTp: 'img',
      btns: [
        { icon: 'fa-camera', mdTp: 'img' },
        { icon: 'fa-video', mdTp: 'vid' },
        { icon: 'fa-quote-right', mdTp: 'txt' },
      ],
    };
  },

  computed: {
    mediaSrchArr() {
      const mSArr =
        this.sttngs.user.mediaSrch.prvdr == 'files'
          ? this.files?.[this.slctdMdTp]?.[this.sttngs.user.mediaSrch?.[this.slctdMdTp]]?.[this.slctd.type].map(
              (el) => ({ src: this.endPts.imagesURL + el, img: this.endPts.imagesURL + el })
            )
          : this.sttngs.user.mediaSrch.prvdr == 'pexels' && this.slctdMdTp == 'img'
          ? this.pexels?.[this.slctdMdTp]
              ?.filter((el) => el.search == this.sttngs.user.mediaSrch[this.slctdMdTp])?.[0]
              .photos.map((el) => ({ src: el.src.medium, img: el.src.large2x }))
          : null;
      return [mSArr?.slice(0, mSArr.length / 2), mSArr?.slice(mSArr.length / 2, mSArr.length)];
    },
  },

  methods: {
    uploadedImagesFileType(event) {
      this.slctd.type = event.target.title;
    },
    selectMediaType(mediaType) {
      this.slctdMdTp = mediaType;
    },
    selectSearch(event) {
      this.$refs.multimediaGallery.scrollTop = 0;
      this.sttngs.user.mediaSrch[this.slctdMdTp] = event.target.value;
      this.sttngs.user.mediaSrch.prvdr = event.target[event.target.selectedIndex].title;
      this.sttngsReq('PATCH', 'user');
    },
    selectImg(event, selectedImgPath) {
      this.slctd.imgURL = selectedImgPath;
    },
    drag(event, imgURL) {
      event.dataTransfer.setData('text', imgURL);
    },
    mediaSearch() {
      this.$refs.multimediaGallery.scrollTop = 0;
      this.pexelsReq('GET', 'img/' + this.$refs.searchInput.value.toLowerCase().replaceAll(' ', '+'));
    },
  },

  created() {
    this.btns.forEach((btn) => {
      if (!this.sttngs.user.mediaSrch[btn.mdTp]) this.sttngs.user.mediaSrch[btn.mdTp] = '';
    });
    if (!this.sttngs.user.mediaSrch.prvdr) this.sttngs.user.mediaSrch.prvdr = 'files';
  },
};
</script>

<style>
.multimedia {
  position: relative;
}
.multimedia input[type='search'],
.multimedia select,
.multimedia button {
  height: 25px;
  padding: 2px;
  margin: 0px;
  border-radius: 0%;
  border: 1px solid black;
  border-width: 1px 0px 1px 1px;
}
.multimedia input[type='search']:focus,
.multimedia select:focus {
  outline: none;
}
.multimedia button {
  cursor: pointer;
  width: 25px;
}
.multimedia input[type='search'] {
  width: calc(100% - 150px);
  margin-right: 25px;
}
.multimedia select {
  width: calc(100% - 125px);
  margin-right: calc(-100% + 125px);
}
.multimedia select:focus {
}
.multimedia-gallery {
  margin-top: 10px;
  height: calc(100vh - 55px);
  /* padding: 20px 20px; */
  padding: 0px;
  overflow-y: auto;
  /* overflow-x: hidden; */
  /* text-align: center; */
}
.multimedia-gallery-row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  gap: 8px;
  /* padding: 0 8px; */
}
.multimedia-gallery-column {
  -ms-flex: calc(50% - 4px);
  flex: calc(50% - 4px);
  max-width: calc(50% - 4px);
  /* padding: 0 1%; */
}
.multimedia-gallery img {
  cursor: pointer;
  margin-bottom: 8px;
  vertical-align: middle;
  width: 100%;
  outline: 1px solid black;
  outline-offset: -1px;
  /* width: 50%;
  display: inline;
  margin: auto; */

  height: auto;
  /* outline: 4px solid white;
  outline-offset: -4px; */
}
</style>
