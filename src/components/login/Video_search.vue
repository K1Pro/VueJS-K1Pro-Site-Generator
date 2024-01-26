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
        <template v-if="content.videosSearched">
          <option
            v-for="videoSearch in Object.keys(content.videosSearched)"
            :value="videoSearch"
          >
            {{ videoSearch.charAt(0).toUpperCase()
            }}{{ videoSearch.slice(1).replaceAll('-', ' ') }}
          </option>
        </template></select
      ><button @click="videoSearch">Search</button>
    </div>
  </div>
  <div class="video-search-gallery">
    <template v-for="videos in searchedVideos.videos">
      <img
        v-if="selectedVideo != videos.image"
        :src="videos.image"
        :style="{
          outline:
            videos.image == selectedVideo ? '8px solid LawnGreen' : 'none',
          outlineOffset: videos.image == selectedVideo ? '-8px' : '0',
        }"
        @click="selectVid($event, videos.image)"
      />
      <video v-if="selectedVideo == videos.image" width="400" controls>
        <source :src="videos.video_files[0].link" type="video/mp4" />
      </video>
    </template>
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
      'selectedVideo',
      'getUserContent',
    ]),
  },

  data() {
    return { videoSearchInput: '', searchedVideos: {} };
  },

  methods: {
    async videoSearch() {
      const prevSrchTtlRslts =
        this.content.videosSearched?.[
          this.videoSearchInput.toLowerCase().replaceAll(' ', '-')
        ]?.total_results;
      const prevSrchTtlRsltsMax = prevSrchTtlRslts
        ? Math.floor(prevSrchTtlRslts / 80)
        : 1;
      const randomPage = Math.floor(
        Math.random() * (prevSrchTtlRsltsMax - 1 + 1) + 1
      );

      try {
        const response = await fetch(
          'https://api.pexels.com/videos/search?query=' +
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
        if (
          videoSearchJSON &&
          Number.isInteger(+videoSearchJSON.total_results)
        ) {
          this.searchedVideos = videoSearchJSON;
          this.content['mostRecentVideoSearch'] = this.videoSearchInput
            .toLowerCase()
            .replaceAll(' ', '-');
          if (this.content.videosSearched === null)
            this.content.videosSearched = {};
          this.content.videosSearched[
            this.videoSearchInput.toLowerCase().replaceAll(' ', '-')
          ] = videoSearchJSON;
          this.getUserContent('PATCH', 'video');
        }
      } catch (error) {
        this.msg.snackBar = error.toString();
      }
    },

    selectVid(event, selectedVidPath) {
      this.selectedVideo = selectedVidPath;
    },

    selectSearch(event) {
      this.searchedVideos = this.content.videosSearched[event.target.value];
      this.videoSearchInput =
        event.srcElement.selectedOptions[0]._value.charAt(0).toUpperCase() +
        event.srcElement.selectedOptions[0]._value
          .slice(1)
          .toLowerCase()
          .replaceAll('_', ' ');
      this.content.mostRecentVideoSearch =
        event.srcElement.selectedOptions[0]._value
          .replaceAll(' ', '_')
          .toLowerCase()
          .trim();
      // this.patchUserData(null, 'MostRecentSearch', this.videoSearchInput.replaceAll(' ', '_').toLowerCase().trim());
    },
  },
  created() {
    this.searchedVideos =
      this.content.mostRecentVideoSearch && this.content.videosSearched
        ? this.content.videosSearched[this.content.mostRecentVideoSearch]
        : {};
    this.videoSearchInput = this.content.mostRecentVideoSearch
      ? this.content.mostRecentVideoSearch.charAt(0).toUpperCase() +
        this.content.mostRecentVideoSearch
          .slice(1)
          .toLowerCase()
          .replaceAll('-', ' ')
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

.video-search input[type='search']:focus {
  outline: none;
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

.video-search-gallery {
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
.video-search-gallery img {
  cursor: pointer;
  margin-top: 8px;
  vertical-align: middle;
  height: 120px;
  width: 100%;

  object-fit: cover;
  outline: 1px solid black;
  outline-offset: -1px;
  /* width: 50%;
    display: inline;
    margin: auto; */

  /* height: auto; */
  /* outline: 4px solid white;
    outline-offset: -4px; */
}
.video-search-gallery video {
  margin-top: 8px;
  height: 180px;
  width: 100%;
  /* width: 50%;
    display: inline;
    margin: auto; */

  /* height: auto; */
  /* outline: 4px solid white;
    outline-offset: -4px; */
}
</style>
