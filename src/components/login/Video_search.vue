<template>
  <div class="video-search">
    <div class="video-search-search-button">
      <input
        type="search"
        name="video-search"
        placeholder="Video search..."
        v-model="videoSearchInput"
        @keyup.enter="videoSearch"
      />
      <select name="video-searched" @change="selectSearch">
        <template v-if="content.searched">
          <option v-for="searched in Object.keys(content.searched)" :value="searched">
            {{ searched.charAt(0).toUpperCase() }}{{ searched.slice(1).replaceAll('-', ' ') }}
          </option>
        </template></select
      ><button @click="videoSearch">Search</button>
    </div>
  </div>
  <div class="Gallery">
    <div v-if="this.searchedVideos" class="Gallery-Row">
      <div class="Gallery-Column">
        <img
          v-for="videos in vidSrchArr1stPart"
          :src="videos.src.medium"
          :style="{
            outline: videos.src.large2x == selectedPhoto ? '8px solid LawnGreen' : 'none',
            outlineOffset: videos.src.large2x == selectedPhoto ? '-8px' : '0',
          }"
          @click="selectVid($event, videos.src.large2x)"
        />
      </div>
      <div class="Gallery-Column">
        <img
          v-for="videos in vidSrchArr2ndPart"
          :src="videos.src.medium"
          :style="{
            outline: videos.src.large2x == selectedPhoto ? '8px solid LawnGreen' : 'none',
            outlineOffset: videos.src.large2x == selectedPhoto ? '-8px' : '0',
          }"
          @click="selectVid($event, videos.src.large2x)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Video Search',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'msg',
      'site',
      'content',
      'endPts',
      'user',
      'selectedPhoto',
      'getUserContent',
    ]),
    vidSrchArr1stPart() {
      return this.searchedVideos?.videos?.slice(0, this.searchedVideos?.videos.length / 2);
    },

    vidSrchArr2ndPart() {
      return this.searchedVideos?.videos?.slice(
        this.searchedVideos?.videos.length / 2,
        this.searchedVideos?.videos.length
      );
    },
  },

  data() {
    return { videoSearchInput: '', searchedVideos: {} };
  },

  methods: {
    async videoSearch() {
      const prevSrchTtlRslts =
        this.content.searched?.[this.videoSearchInput.toLowerCase().replaceAll(' ', '-')]?.total_results;
      const prevSrchTtlRsltsMax = prevSrchTtlRslts ? Math.floor(prevSrchTtlRslts / 80) : 1;
      const randomPage = Math.floor(Math.random() * (prevSrchTtlRsltsMax - 1 + 1) + 1);

      try {
        const response = await fetch(
          'https://api.pexels.com/v1/search?query=' +
            this.videoSearchInput.toLowerCase().replaceAll(' ', '+') +
            `&page=${randomPage}&per_page=80`,
          {
            method: 'GET',
            headers: {
              Authorization: this.user.AppPermissions.Pexels,
            },
          }
        );
        const videoSearchJSON = await response.json();
        if (videoSearchJSON && Number.isInteger(+videoSearchJSON.total_results)) {
          this.searchedVideos = videoSearchJSON;
          this.content['most_recent_search'] = this.videoSearchInput.toLowerCase().replaceAll(' ', '-');
          this.content.searched[this.videoSearchInput.toLowerCase().replaceAll(' ', '-')] = videoSearchJSON;
          console.log(videoSearchJSON);
          this.getUserContent('PATCH');
        }
      } catch (error) {
        this.msg.snackBar = error.toString();
      }
    },

    selectVid(event, selectedVidPath) {
      this.selectedPhoto = selectedVidPath;
    },

    selectSearch(event) {
      this.searchedVideos = this.content.searched[event.target.value];
      this.videoSearchInput =
        event.srcElement.selectedOptions[0]._value.charAt(0).toUpperCase() +
        event.srcElement.selectedOptions[0]._value.slice(1).toLowerCase().replaceAll('_', ' ');
      this.content.most_recent_search = event.srcElement.selectedOptions[0]._value
        .replaceAll(' ', '_')
        .toLowerCase()
        .trim();
      // this.patchUserData(null, 'MostRecentSearch', this.videoSearchInput.replaceAll(' ', '_').toLowerCase().trim());
    },
  },
  created() {
    this.searchedVideos =
      this.content.most_recent_search && this.content.searched
        ? this.content.searched[this.content.most_recent_search]
        : {};
    this.videoSearchInput = this.content.most_recent_search
      ? this.content.most_recent_search.charAt(0).toUpperCase() +
        this.content.most_recent_search.slice(1).toLowerCase().replaceAll('-', ' ')
      : '';
  },
};
</script>

<style>
.video-search-search-button {
  padding-left: 10px;
  padding-top: 10px;
}
/* .video-search {
    padding: 10px;
  } */
.video-search input[type='search'] {
  padding: 5px;

  position: relative;
  width: 65%;
  background: white;
  margin-left: 2px;
  border: 0;
  margin-right: -66%;
  z-index: 2;
}

.video-search select {
  position: relative;
  width: 72%;
  background: white;
  border: 1px solid;
  padding: 5px;
  z-index: 1;
}
.video-search button {
  padding: 5px;
}

.Gallery {
  /* padding: 20px 20px; */
  padding: 0px;
  box-sizing: border-box;
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
