<template>
  <div class="multimedia">
    <button
      v-for="mediaType in Object.keys(mdTp)"
      @click="selectMediaType(mediaType)"
      :style="{ backgroundColor: slctdMd == mediaType ? 'darkgrey' : '#eee' }"
    >
      <i :class="'fa-solid ' + mediaType"></i>
    </button>
    <select @change="selectSearch">
      <template v-if="this?.[mdTp?.[slctdMd]?.[0]]?.[mdTp?.[slctdMd]?.[1]]">
        <option
          v-if="slctdMd != 'fa-cloud-arrow-up'"
          v-for="media in this?.[mdTp?.[slctdMd]?.[0]]?.[mdTp?.[slctdMd]?.[1]]?.toReversed()"
          :value="media.search"
          :selected="sttngs.user[mdTp[slctdMd][0]][mdTp[slctdMd][1]] == media.search"
        >
          {{ media.search.replaceAll('+', ' ') }}
        </option>
      </template>
    </select>
    <input
      type="search"
      :value="sttngs.user[mdTp[slctdMd][0]][mdTp[slctdMd][1]].replaceAll('+', ' ')"
      ref="searchInput"
      @keyup.enter="mediaSearch"
    />
    <button><i class="fa-solid fa-magnifying-glass" @click="mediaSearch"></i></button>
    <button style="border-right-width: 1px"><i class="fa-solid fa-trash"></i></button>
    <div class="multimedia-gallery">
      <div
        v-if="sttngs.user[mdTp[slctdMd][0]][mdTp[slctdMd][1]] && mediaSrchArr !== null"
        class="multimedia-gallery-row"
      >
        <div v-for="mediaSrch in mediaSrchArr" class="multimedia-gallery-column">
          <img
            v-for="media in mediaSrch"
            draggable="true"
            :src="media.src.medium"
            :style="{
              outline: media.src.large2x == slctd.imgURL ? '8px solid LawnGreen' : 'none',
              outlineOffset: media.src.large2x == slctd.imgURL ? '-8px' : '0',
            }"
            @click="selectImg($event, media.src.large2x)"
            @dragstart="drag($event, media.src.large2x)"
          />
        </div>
      </div>
      <div v-else class="multimedia-gallery-row">
        <div v-for="file in upload.files.filter((element, index) => index % 2 === 0)" class="multimedia-gallery-column">
          <img
            :src="endPts.uploadFilesURL + file"
            draggable="true"
            @dragstart="drag($event, endPts.uploadFilesURL + file)"
          />
        </div>
        <div v-for="file in upload.files.filter((element, index) => index % 2 !== 0)" class="multimedia-gallery-column">
          <img
            :src="endPts.uploadFilesURL + file"
            draggable="true"
            @dragstart="drag($event, endPts.uploadFilesURL + file)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Multimedia',

  inject: ['endPts', 'pexels', 'pexelsReq', 'slctd', 'sttngs', 'sttngsReq', 'upload'],

  data() {
    return {
      slctdMd: 'fa-camera',
      mdTp: {
        'fa-camera': ['pexels', 'img', 'photos'],
        'fa-video': ['pexels', 'vid', 'videos'],
        'fa-cloud-arrow-up': ['upload', 'files', 'upload'],
        // 'fa-quote-right': ['txtprovider', 'txt', 'messages'],
      },
    };
  },

  computed: {
    mediaSrchArr() {
      const mSArr = this?.[this.mdTp[this.slctdMd][0]]?.[this.mdTp[this.slctdMd][1]]?.filter(
        (el) => el.search == this.sttngs.user[this.mdTp[this.slctdMd][0]][this.mdTp[this.slctdMd][1]]
      )?.[0];
      return mSArr
        ? [
            mSArr[this.mdTp[this.slctdMd][2]].slice(0, mSArr[this.mdTp[this.slctdMd][2]].length / 2),
            mSArr[this.mdTp[this.slctdMd][2]].slice(
              mSArr[this.mdTp[this.slctdMd][2]].length / 2,
              mSArr[this.mdTp[this.slctdMd][2]].length
            ),
          ]
        : null;
    },
  },

  methods: {
    selectMediaType(mediaType) {
      this.slctdMd = mediaType;
      // this.searchInput = this.sttngs.user[this.mdTp[this.slctdMd][0]][this.mdTp[this.slctdMd][1]]; //gotta work on this
    },
    selectSearch(event) {
      this.sttngs.user[this.mdTp[this.slctdMd][0]][this.mdTp[this.slctdMd][1]] = event.target.value;
      this.sttngsReq('PATCH', 'user');
    },
    selectImg(event, selectedImgPath) {
      this.slctd.imgURL = selectedImgPath;
    },
    drag(event, imgURL) {
      event.dataTransfer.setData('text', imgURL);
    },
    mediaSearch() {
      this.pexelsReq('GET', 'img/' + this.$refs.searchInput.value.toLowerCase().replaceAll(' ', '+'));
    },
  },

  created() {
    Object.values(this.mdTp).forEach((mediaType) => {
      if (!this.sttngs.user[mediaType[0]]) this.sttngs.user[mediaType[0]] = {};
      if (!this.sttngs.user[mediaType[0]][mediaType[1]]) this.sttngs.user[mediaType[0]][mediaType[1]] = '';
    });
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
