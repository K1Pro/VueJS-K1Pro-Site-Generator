<template>
  <div class="image-search">
    <input
      type="search"
      name="image-search"
      placeholder="Image search..."
      v-model="imageSearchInput"
      @keyup.enter="imageSearch"
    /><button @click="imageSearch">Search</button>
  </div>
  <div class="Gallery">
    <div v-if="this.searchedPhotos" class="Gallery-Row">
      <div class="Gallery-Column">
        <img
          v-for="images in imgSrchArr1stPart"
          :src="images.src.medium"
          :style="{
            outline: images.src.large == selectedPhoto ? '8px solid LawnGreen' : 'none',
            outlineOffset: images.src.large == selectedPhoto ? '-8px' : '0',
          }"
          @click="selectImg($event, images.src.large)"
        />
      </div>
      <div class="Gallery-Column">
        <img
          v-for="images in imgSrchArr2ndPart"
          :src="images.src.medium"
          :style="{
            outline: images.src.large == selectedPhoto ? '8px solid LawnGreen' : 'none',
            outlineOffset: images.src.large == selectedPhoto ? '-8px' : '0',
          }"
          @click="selectImg($event, images.src.large)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Image Search',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['message', 'site', 'endPts', 'selectedPhoto']),
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
      try {
        const response = await fetch(
          'https://api.pexels.com/v1/search?query=' + this.imageSearchInput.toLowerCase() + `&page=1&per_page=80`,
          {
            method: 'GET',
            headers: {
              Authorization: 'C346RvN6Azf2oNJxzV1fTvT3z8fJKMYTeQNowA1IuAjfQLfa1jl6SyBX',
            },
          }
        );
        const imageSearchJSON = await response.json();
        if (imageSearchJSON && Number.isInteger(+imageSearchJSON.total_results)) {
          this.searchedPhotos = imageSearchJSON;
        }
      } catch (error) {
        this.message = error.toString();
      }
    },

    selectImg(event, selectedImgPath) {
      this.selectedPhoto = selectedImgPath;
    },
  },
};
</script>

<style>
.image-search {
  padding: 10px;
}
.image-search input[type='search'] {
  padding: 5px;
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
