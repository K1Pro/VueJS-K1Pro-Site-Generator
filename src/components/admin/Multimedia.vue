<template>
  <div class="multimedia">
    <button
      v-for="mediaType in Object.keys(mediaTypes)"
      @click="selectMediaType(mediaType)"
      :style="{ backgroundColor: this.selectedMediaType == mediaType ? 'darkgrey' : '#eee' }"
    >
      <i :class="'fa-solid ' + mediaType"></i>
    </button>
    <select @change="selectSearch">
      <template v-if="content.imagesSearched">
        <option v-for="contentSearch in Object.keys(content[mediaTypes[selectedMediaType][1]])" :value="contentSearch">
          {{ contentSearch.charAt(0).toUpperCase() }}{{ contentSearch.slice(1).replaceAll('-', ' ') }}
        </option>
      </template>
    </select>
    <input type="search" :value="searchInput" ref="searchInput" @keyup.enter="mediaSearch" />
    <button><i class="fa-solid fa-magnifying-glass" @click="mediaSearch"></i></button>
    <button style="border-right-width: 1px"><i class="fa-solid fa-trash"></i></button>

    <div class="Gallery">
      <div v-if="this.searchInput" class="Gallery-Row">
        <div v-for="mediaSrch in mediaSrchArray" class="Gallery-Column">
          <img
            v-for="media in mediaSrch"
            draggable="true"
            :src="media.src.medium"
            :style="{
              outline: media.src.large2x == selectedMedia.img ? '8px solid LawnGreen' : 'none',
              outlineOffset: media.src.large2x == selectedMedia.img ? '-8px' : '0',
            }"
            @click="selectImg($event, media.src.large2x)"
            @dragstart="drag($event, media.src.large2x)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Multimedia',

  inject: ['content', 'getUserContent', 'selectedMedia', 'user', 'showMsg', 'site', 'endPts'],

  data() {
    return {
      searchInput: '',
      selectedMediaType: 'fa-camera',
      mediaTypes: {
        'fa-camera': ['mostRecentImageSearch', 'imagesSearched', 'image'],
        'fa-video': ['mostRecentVideoSearch', 'videosSearched', 'video'],
        'fa-quote-right': ['messages', 'messages', 'text'],
      },
    };
  },

  computed: {
    mediaSrchArray() {
      return [
        this.content[this.mediaTypes[this.selectedMediaType][1]][this.searchInput]?.photos?.slice(
          0,
          this.content[this.mediaTypes[this.selectedMediaType][1]][this.searchInput]?.photos.length / 2
        ),
        this.content[this.mediaTypes[this.selectedMediaType][1]][this.searchInput]?.photos?.slice(
          this.content[this.mediaTypes[this.selectedMediaType][1]][this.searchInput]?.photos.length / 2,
          this.content[this.mediaTypes[this.selectedMediaType][1]][this.searchInput]?.photos.length
        ),
      ];
    },
  },

  methods: {
    selectMediaType(mediaType) {
      this.selectedMediaType = mediaType;
      this.searchInput = this.content[this.mediaTypes[this.selectedMediaType][0]];
    },
    selectSearch(event) {
      this.searchInput = event.target.value;
      console.log(this.content[this.mediaTypes[this.selectedMediaType][1]][event.target.value]);
    },
    selectImg(event, selectedImgPath) {
      this.selectedMedia.img = selectedImgPath;
    },
    drag(event, imgURL) {
      event.dataTransfer.setData('text', imgURL);
    },
    async mediaSearch() {
      this.searchInput = this.$refs.searchInput.value;
      const prevSrchTtlRslts =
        this.content[this.mediaTypes[this.selectedMediaType][1]]?.[this.searchInput.toLowerCase().replaceAll(' ', '-')]
          ?.total_results;
      const prevSrchTtlRsltsMax = prevSrchTtlRslts ? Math.floor(prevSrchTtlRslts / 80) : 1;
      const randomPage = Math.floor(Math.random() * (prevSrchTtlRsltsMax - 1 + 1) + 1);
      console.log(prevSrchTtlRslts);
      console.log(prevSrchTtlRsltsMax);
      console.log(randomPage);
      try {
        const response = await fetch(
          'https://api.pexels.com/v1/search?query=' +
            this.searchInput.toLowerCase().replaceAll(' ', '+') +
            `&page=${randomPage}&per_page=80`,
          {
            method: 'GET',
            headers: {
              Authorization: this.user.AppPermissions.Pexels,
            },
          }
        );
        const imageSearchJSON = await response.json();
        if (imageSearchJSON && Number.isInteger(+imageSearchJSON.total_results)) {
          this.searchedPhotos = imageSearchJSON;
          this.content['mostRecentImageSearch'] = this.searchInput.toLowerCase().replaceAll(' ', '-');
          if (this.content.imagesSearched === null) this.content.imagesSearched = {};
          this.content.imagesSearched[this.searchInput.toLowerCase().replaceAll(' ', '-')] = imageSearchJSON;
          console.log(imageSearchJSON);
          console.log(this.content);

          // this.getUserContent('PATCH', 'image');
        }
      } catch (error) {
        this.showMsg(error.toString());
      }
    },
  },
  mounted() {
    this.searchInput = this.content[this.mediaTypes[this.selectedMediaType][0]];
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

.Gallery {
  margin-top: 10px;
  height: calc(100vh - 55px);
  /* padding: 20px 20px; */
  padding: 0px;
  overflow-y: auto;
  /* overflow-x: hidden; */
  /* text-align: center; */
}
.Gallery-Row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  gap: 8px;
  /* padding: 0 8px; */
}
.Gallery-Column {
  -ms-flex: calc(50% - 4px);
  flex: calc(50% - 4px);
  max-width: calc(50% - 4px);
  /* padding: 0 1%; */
}
.Gallery img {
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
