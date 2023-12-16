<template>
  <div class="image-search">
    <div class="image-search-search-button">
      <input
        type="search"
        name="image-search"
        placeholder="Image search..."
        v-model="imageSearchInput"
        @keyup.enter="imageSearch"
      />
      <select name="image-searched" @change="selectSearch">
        <option v-for="searched in Object.keys(content.searched)" :value="searched">
          {{ searched.charAt(0).toUpperCase() }}{{ searched.slice(1).replaceAll('_', ' ') }}
        </option></select
      ><button @click="imageSearch">Search</button>
    </div>
  </div>
  <div class="Gallery">
    <div v-if="this.searchedPhotos" class="Gallery-Row">
      <div class="Gallery-Column">
        <img
          v-for="images in imgSrchArr1stPart"
          :src="images.src.medium"
          :style="{
            outline: images.src.large2x == selectedPhoto ? '8px solid LawnGreen' : 'none',
            outlineOffset: images.src.large2x == selectedPhoto ? '-8px' : '0',
          }"
          @click="selectImg($event, images.src.large2x)"
        />
      </div>
      <div class="Gallery-Column">
        <img
          v-for="images in imgSrchArr2ndPart"
          :src="images.src.medium"
          :style="{
            outline: images.src.large2x == selectedPhoto ? '8px solid LawnGreen' : 'none',
            outlineOffset: images.src.large2x == selectedPhoto ? '-8px' : '0',
          }"
          @click="selectImg($event, images.src.large2x)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Image Search',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'message',
      'site',
      'content',
      'endPts',
      'user',
      'selectedPhoto',
      'getUserContent',
    ]),
    imgSrchArr1stPart() {
      return this.searchedPhotos?.photos?.slice(0, this.searchedPhotos?.photos.length / 2);
    },

    imgSrchArr2ndPart() {
      return this.searchedPhotos?.photos?.slice(
        this.searchedPhotos?.photos.length / 2,
        this.searchedPhotos?.photos.length
      );
    },
  },

  data() {
    return { imageSearchInput: '', searchedPhotos: {} };
  },

  methods: {
    async imageSearch() {
      const prevSrchTtlRslts =
        this.content.searched?.[this.imageSearchInput.toLowerCase().replaceAll(' ', '-')]?.total_results;
      const prevSrchTtlRsltsMax = prevSrchTtlRslts ? Math.floor(prevSrchTtlRslts / 80) : 1;
      const randomPage = Math.floor(Math.random() * (prevSrchTtlRsltsMax - 1 + 1) + 1);

      try {
        const response = await fetch(
          'https://api.pexels.com/v1/search?query=' +
            this.imageSearchInput.toLowerCase().replaceAll(' ', '+') +
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
          this.content['most_recent_search'] = this.imageSearchInput.toLowerCase().replaceAll(' ', '-');
          this.content.searched[this.imageSearchInput.toLowerCase().replaceAll(' ', '-')] = imageSearchJSON;
          console.log(imageSearchJSON);
          this.getUserContent('PATCH');
        }
      } catch (error) {
        this.message = error.toString();
      }
    },

    selectImg(event, selectedImgPath) {
      this.selectedPhoto = selectedImgPath;
    },

    selectSearch(event) {
      this.searchedPhotos = this.content.searched[event.target.value];
      this.imageSearchInput =
        event.srcElement.selectedOptions[0]._value.charAt(0).toUpperCase() +
        event.srcElement.selectedOptions[0]._value.slice(1).toLowerCase().replaceAll('_', ' ');
      this.content.most_recent_search = event.srcElement.selectedOptions[0]._value
        .replaceAll(' ', '_')
        .toLowerCase()
        .trim();
      // this.patchUserData(null, 'MostRecentSearch', this.imageSearchInput.replaceAll(' ', '_').toLowerCase().trim());
    },
  },
  created() {
    this.searchedPhotos = this.content.searched[this.content.most_recent_search];
    this.imageSearchInput = this.content.most_recent_search;
  },
};
</script>

<style>
.image-search-search-button {
  padding-left: 10px;
  padding-top: 10px;
}
/* .image-search {
  padding: 10px;
} */
.image-search input[type='search'] {
  padding: 5px;

  position: relative;
  width: 65%;
  background: white;
  margin-left: 2px;
  border: 0;
  margin-right: -66%;
  z-index: 2;
}

.image-search select {
  position: relative;
  width: 72%;
  background: white;
  border: 1px solid;
  padding: 5px;
  z-index: 1;
}
.image-search button {
  padding: 5px;
}

.Gallery {
  /* padding: 20px 20px; */
  padding: 0px;
  box-sizing: border-box;
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
