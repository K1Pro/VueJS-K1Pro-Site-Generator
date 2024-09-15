<template>
  <div class="multimedia">
    <button
      v-for="mediaType in Object.keys(mediaTypes)"
      @click="selectMedia(mediaType)"
      :style="{ backgroundColor: this.selectedMedia == mediaType ? 'darkgrey' : '#eee' }"
    >
      <i :class="'fa-solid ' + mediaType"></i>
    </button>
    <select @change="selectSearch">
      <template v-if="content.imagesSearched">
        <option v-for="contentSearch in Object.keys(content[mediaTypes[selectedMedia][1]])" :value="contentSearch">
          {{ contentSearch.charAt(0).toUpperCase() }}{{ contentSearch.slice(1).replaceAll('-', ' ') }}
        </option>
      </template>
    </select>
    <input type="search" v-model="searchInput" />
    <button><i class="fa-solid fa-trash"></i></button>

    <div class="Gallery">
      <div v-if="this.searchInput" class="Gallery-Row">
        <div class="Gallery-Column">
          <img
            v-for="media in mediaSrchArr1stPart"
            :src="media.src.medium"
            :style="{
              outline: media.src.large2x == selectedPhoto ? '8px solid LawnGreen' : 'none',
              outlineOffset: media.src.large2x == selectedPhoto ? '-8px' : '0',
            }"
            @click="selectImg($event, media.src.large2x)"
          />
        </div>
        <div class="Gallery-Column">
          <img
            v-for="media in mediaSrchArr2ndPart"
            :src="media.src.medium"
            :style="{
              outline: media.src.large2x == selectedPhoto ? '8px solid LawnGreen' : 'none',
              outlineOffset: media.src.large2x == selectedPhoto ? '-8px' : '0',
            }"
            @click="selectImg($event, media.src.large2x)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Multimedia',

  inject: ['content', 'getUserContent', 'selectedPhoto', 'user', 'showMsg', 'site', 'endPts'],

  data() {
    return {
      selectedMedia: 'fa-camera',
      searchInput: '',
      mediaTypes: {
        'fa-camera': ['mostRecentImageSearch', 'imagesSearched'],
        'fa-video': ['mostRecentVideoSearch', 'videosSearched'],
        'fa-quote-right': ['messages', 'messages'],
      },
    };
  },

  computed: {
    mediaSrchArr1stPart() {
      return this.content[this.mediaTypes[this.selectedMedia][1]][this.searchInput]?.photos?.slice(
        0,
        this.content[this.mediaTypes[this.selectedMedia][1]][this.searchInput]?.photos.length / 2
      );
    },

    mediaSrchArr2ndPart() {
      return this.content[this.mediaTypes[this.selectedMedia][1]][this.searchInput]?.photos?.slice(
        this.content[this.mediaTypes[this.selectedMedia][1]][this.searchInput]?.photos.length / 2,
        this.content[this.mediaTypes[this.selectedMedia][1]][this.searchInput]?.photos.length
      );
    },
  },

  methods: {
    selectMedia(mediaType) {
      this.selectedMedia = mediaType;
      this.searchInput = this.content[this.mediaTypes[this.selectedMedia][0]];
    },
    selectSearch(event) {
      this.searchInput = event.target.value;
      console.log(this.content[this.mediaTypes[this.selectedMedia][1]][event.target.value]);
    },
  },
  mounted() {
    console.log(this.content);
    console.log(this.content[this.mediaTypes[this.selectedMedia][0]]);
    this.searchInput = this.content[this.mediaTypes[this.selectedMedia][0]];
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
  border: 1px solid lightgray;
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
  width: calc(100% - 125px);
  margin-right: 25px;
}
.multimedia select {
  width: calc(100% - 100px);
  margin-right: calc(-100% + 100px);
}

.Gallery {
  /* padding: 20px 20px; */
  padding: 0px;
  /* overflow-y: scroll;
  overflow-x: hidden; */
  /* text-align: center; */
}
.Gallery-Row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  padding: 0 8px;
}
.Gallery-Column {
  -ms-flex: 48%;
  flex: 48%;
  max-width: 48%;
  padding: 0 1%;
}
.Gallery img {
  cursor: pointer;
  margin-top: 8px;
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
