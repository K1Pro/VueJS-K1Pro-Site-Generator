<template>
  <div class="video-gallery">
    <div
      class="video-gallery-container"
      :style="{
        gridTemplateColumns:
          grid.wdth > respWidth.md ? grid.wdth * 0.66666 + 'px ' + grid.wdth * 0.33333 + 'px' : grid.wdth + 'px',
        gridTemplateRows:
          grid.wdth > respWidth.md ? grid.wdth * 0.37125 + 'px' : grid.wdth * 0.5625 + 'px ' + grid.wdth * 0.75 + 'px',
      }"
    >
      <div class="video-gallery-video">
        <video
          v-if="slctdVideoDir !== null && Object.keys(files.videos).length > 0"
          :src="endPts.videosURL + slctdVideoDir + '/' + files.videos[slctdVideoDir][slctdVideo].file_name"
          controls
          autoplay
        ></video>
        <video v-else></video>
      </div>
      <div class="video-gallery-playlist">
        <select @change="slctVideoDir">
          <option
            v-if="slctdVideoDir !== null && Object.keys(files.videos).length > 0"
            v-for="video in Object.keys(files.videos)"
            :value="video"
          >
            {{
              video.slice(0, 3) >= 0 && video.slice(0, 3) < 1000
                ? video.slice(3).replaceAll('_', ' ')
                : video.replaceAll('_', ' ')
            }}
          </option>
          <option v-else disabled selected>No videos</option>
        </select>
        <div class="video-gallery-playlist-panel">
          <div
            class="video-gallery-playlist-panel-item"
            v-if="slctdVideoDir !== null && Object.keys(files.videos).length > 0"
            v-for="(vidFiles, vidFilesIndx) in files.videos[slctdVideoDir]"
            @click="slctVidFile(vidFilesIndx)"
          >
            <div class="video-gallery-playlist-panel-item-icon">
              <video
                :src="
                  files.videos[slctdVideoDir][vidFilesIndx].icon !== null
                    ? endPts.videosURL + slctdVideoDir + '/' + files.videos[slctdVideoDir][vidFilesIndx].file_name
                    : endPts.videosURL +
                      slctdVideoDir +
                      '/' +
                      files.videos[slctdVideoDir][vidFilesIndx].file_name +
                      '#t=0.9'
                "
                :poster="
                  files.videos[slctdVideoDir][vidFilesIndx].icon !== null
                    ? endPts.videosURL + slctdVideoDir + '/' + files.videos[slctdVideoDir][vidFilesIndx].icon
                    : false
                "
                @loadedmetadata="logDuration($event, vidFilesIndx)"
                :ref="'vidFile' + vidFilesIndx"
              ></video>
              <div>
                {{ videoDurations['vidDuration' + vidFilesIndx] }}
              </div>
            </div>
            <div
              class="video-gallery-playlist-panel-item-desc"
              :style="{ backgroundColor: vidFilesIndx === slctdVideo ? 'lightgray' : 'white' }"
              @mouseover="highlightOver($event, vidFilesIndx)"
              @mouseout="highlightOut($event, vidFilesIndx)"
            >
              {{ vidFiles.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Video gallery',

  inject: ['endPts', 'files', 'grid', 'respWidth', 'site', 'slctd', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { slctdVideoDir: Object.keys(this.files.videos)[0], slctdVideo: 0, videoDurations: {} };
  },

  methods: {
    slctVideoDir(event) {
      this.slctdVideo = 0;
      this.slctdVideoDir = event.target.value;
    },
    slctVidFile(vidFilesIndx) {
      this.slctdVideo = vidFilesIndx;
    },
    logDuration(event, vidFilesIndx) {
      if (event.target.duration < 60) {
        this.videoDurations['vidDuration' + vidFilesIndx] =
          '00:' + String(Math.round(event.target.duration)).padStart(2, '0').slice(-2);
      } else {
        const minutes = event.target.duration / 60;
        const seconds = event.target.duration % 60;
        this.videoDurations['vidDuration' + vidFilesIndx] =
          String(Math.floor(minutes)).padStart(2, '0').slice(-2) +
          ':' +
          String(Math.round(seconds)).padStart(2, '0').slice(-2);
      }
    },
    highlightOver(event, vidFilesIndx) {
      if (vidFilesIndx !== this.slctdVideo) event.target.style.backgroundColor = '#e9e9e9';
    },
    highlightOut(event, vidFilesIndx) {
      if (vidFilesIndx !== this.slctdVideo) event.target.style.backgroundColor = 'white';
    },
  },
};
</script>

<style>
.video-gallery {
}
.video-gallery-container {
  display: grid;
}
.video-gallery-video {
  padding: 10px;
}
.video-gallery-video video {
  background-color: black;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.video-gallery-playlist {
  padding: 10px;
}
.video-gallery-playlist select {
  width: 100%;
  padding: 5px;
  height: 30px;
  margin: 0;
  border: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.video-gallery-playlist-panel {
  height: calc(100% - 30px);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
  border: 1px solid grey;
  overflow-y: scroll;
}
.video-gallery-playlist-panel-item {
  cursor: pointer;
  padding: 5px;
  display: grid;
  grid-template-columns: 33.33% 66.66%;
  grid-template-rows: 60px;
}
.video-gallery-playlist-panel-item-icon {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}
.video-gallery-playlist-panel-item-icon video {
  width: 100%;
  height: 60px;
  object-fit: cover;
}
.video-gallery-playlist-panel-item-icon div {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: white;
  background-color: grey;
}
.video-gallery-playlist-panel-item-desc {
  padding: 5px;
  font-weight: bold;
  font-size: 14px;
}
/* .video-gallery-playlist-panel-item-desc:hover {
  background-color: #e9e9e9;
} */
</style>
