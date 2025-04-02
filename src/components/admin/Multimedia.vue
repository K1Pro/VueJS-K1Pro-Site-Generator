<template>
  <div class="multimedia">
    <button
      v-for="btn in btns"
      @click="selectMediaType(btn.mdTp)"
      :style="{ backgroundColor: tp == btn.mdTp ? 'darkgrey' : '#eee' }"
    >
      <i :class="'fa-solid ' + btn.icon"></i>
    </button>
    <select @change="selectSearch" ref="providers">
      <option v-if="files && files[tp]" disabled selected>=== user files ===</option>
      <template v-if="files && files[tp]" v-for="file in Object.keys(files[tp])">
        <option
          v-if="files[tp]?.[file].length > 0 || Object.keys(files[tp]?.[file]).length > 0"
          title="files"
          :value="file"
          :selected="prvdr == 'files' && kywrd == file"
        >
          {{ file.replaceAll('_', ' ') }}
        </option>
      </template>

      <option v-if="pexels?.[tp]" disabled>=== pexels searches ===</option>
      <option
        v-if="pexels"
        v-for="pexel in pexels?.[tp]"
        title="pexels"
        :value="pexel.search"
        :selected="prvdr == 'pexels' && kywrd == pexel.search"
      >
        {{ pexel.search.replaceAll('+', ' ') }}
      </option>
      <option v-if="tp == 'txt'" disabled selected>=== text searches ===</option>
    </select>
    <input
      type="search"
      ref="searchInput"
      placeholder="no results"
      :value="kywrd?.replaceAll('+', ' ')?.replaceAll('_', ' ')"
      @keyup.enter="mediaSearch"
    />
    <button><i class="fa-solid fa-magnifying-glass" @click="mediaSearch"></i></button>
    <button style="border-right-width: 1px"><i class="fa-solid fa-trash"></i></button>
    <div class="multimedia-gallery" ref="multimediaGallery">
      <template v-if="mediaSrchArr !== null">
        <div class="multimedia-gallery-row">
          <div
            v-for="(mediaSrch, medisSrchIndx) in mediaSrchArr"
            class="multimedia-gallery-column"
            :style="{
              '-ms-flex': 'calc(' + 100 / mediaSrchArr.length + '% - ' + mediaSrchArr.length * 2 + 'px)',
              flex: 'calc(' + 100 / mediaSrchArr.length + '% - ' + mediaSrchArr.length * 2 + 'px)',
              'max-width': 'calc(' + 100 / mediaSrchArr.length + '% - ' + mediaSrchArr.length * 2 + 'px)',
            }"
          >
            <div v-for="(media, mediaIndx) in mediaSrch" style="position: relative">
              <img
                v-if="media.img && media.flnm != slctd.vidURL"
                draggable="true"
                :src="media.img"
                :style="{
                  height: tp == 'vid' ? '200px' : 'auto',
                  objectFit: tp == 'vid' ? 'scale-down' : 'cover',
                  backgroundColor: tp == 'vid' ? 'black' : 'none',
                  border: '1px solid lightgrey',
                  outline:
                    (tp == 'img' && media.flnm == slctd.imgURL) || (tp == 'vid' && media.flnm == slctd.vidURL)
                      ? '8px solid LawnGreen'
                      : 'none',
                  outlineOffset:
                    (tp == 'img' && media.flnm == slctd.imgURL) || (tp == 'vid' && media.flnm == slctd.vidURL)
                      ? '-8px'
                      : '0',
                }"
                @click="selectMedia(tp == 'vid' ? 'vid' : 'img', media.flnm)"
                @dragstart="drag($event, media.flnm ? media.flnm : media.vid)"
              />
              <video
                v-else-if="media.flnm == slctd.vidURL && slctd.vidURL !== null"
                draggable="true"
                :src="media.vid ? media.vid : media.flnm"
                :style="{
                  border: '1px solid lightgrey',
                  outline: '8px solid LawnGreen',
                  outlineOffset: '-8px',
                }"
                @dragstart="drag($event, media.flnm)"
                playsinline
                autoplay
                controls
              ></video>
              <video
                v-else-if="media.vid"
                draggable="true"
                :src="media.vid + '#t=0.75'"
                @click="selectMedia('vid', media.flnm)"
                @dragstart="drag($event, media.flnm)"
              ></video>
              <img
                v-else
                src="https://api-site.k1pro.net/public/default/logo/folder.jpg"
                @click="selectFolder(media)"
              />
              <input
                v-if="media.flnm && JSON.stringify(site.htmlElmnts).includes(media.flnm)"
                type="checkbox"
                style="position: absolute; margin-left: -32px"
                checked
              />
              <i
                v-if="prvdr == 'files'"
                class="fa-solid fa-circle-minus redWhiteMinus"
                style="position: absolute; margin-left: -16px"
                @click="deleteMedia(media.flnm ? media.flnm : media)"
              ></i>
              <input
                v-if="!media.flnm && !media.vid && !media.img"
                type="text"
                :value="media.replaceAll('_', ' ')"
                style="position: absolute; bottom: 10%; margin: 0px 5%; left: 0px; width: 90%"
              />
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

  inject: ['endPts', 'files', 'getVideos', 'getImages', 'pexels', 'pexelsReq', 'site', 'slctd', 'sttngs', 'sttngsReq'],

  data() {
    return {
      folder: '',
      imgFlTps: ['jpg', 'jpeg', 'png', 'webp'],
      vidFlTps: ['mp4'],
      btns: [
        { icon: 'fa-camera', mdTp: 'img' },
        { icon: 'fa-video', mdTp: 'vid' },
        { icon: 'fa-quote-right', mdTp: 'txt' },
      ],
    };
  },

  computed: {
    prvdr() {
      return this.sttngs.user.mediaSrch.prvdr;
    },
    tp() {
      return this.sttngs.user.mediaSrch.tp;
    },
    kywrd() {
      return this.sttngs.user.mediaSrch.kywrd;
    },
    mediaSrchArr() {
      const mSArr =
        this.prvdr == 'files' && this.tp == 'vid' && this.kywrd == 'video_gallery' && this.folder == ''
          ? Object.keys(this.files?.[this.tp]?.[this.kywrd]?.[slctd.type])
          : this.prvdr == 'files' && this.tp == 'vid' && this.kywrd == 'video_gallery' && this.folder != ''
          ? this.files?.[this.tp]?.[this.kywrd]?.[slctd.type]?.[this.folder]?.map((el) => ({
              vid: this.endPts.videosURL + this.kywrd + '/' + slctd.type + '/' + this.folder + '/' + el.file_name,
              flnm: this.kywrd + '/' + slctd.type + '/' + this.folder + '/' + el.file_name,
            }))
          : this.prvdr == 'files' && this.tp == 'vid' && Object.keys(this.files.vid).includes(this.kywrd)
          ? this.files?.[this.tp]?.[this.kywrd]?.map((el) => ({
              vid: this.endPts.videosURL + this.kywrd + '/' + el,
              flnm: this.kywrd + '/' + el,
            }))
          : this.prvdr == 'files' && this.tp == 'img'
          ? this.files?.[this.tp]?.[this.kywrd]?.map((el) => ({
              img: this.endPts.imagesURL + this.kywrd + '/' + el,
              flnm: this.kywrd + '/' + el,
            }))
          : // Pexels
          this.prvdr == 'pexels' && this.tp == 'img'
          ? this.pexels?.[this.tp]
              ?.filter((el) => el.search == this.kywrd)?.[0]
              ?.photos?.map((el) => ({ img: el.src.medium, flnm: el.src.large2x }))
          : this.prvdr == 'pexels' && this.tp == 'vid'
          ? this.pexels?.[this.tp]
              ?.filter((el) => el.search == this.kywrd)?.[0]
              ?.videos?.map((el) => ({ img: el.video_pictures[0].picture, flnm: el.video_files[0].link }))
          : null;
      return (!this.files?.vid?.[this.kywrd]?.length && this.folder != '') ||
        this.files?.vid?.[this.kywrd]?.length ||
        (this.tp == 'vid' && this.prvdr == 'pexels')
        ? [mSArr]
        : [mSArr?.slice(0, mSArr.length / 2), mSArr?.slice(mSArr.length / 2, mSArr.length)];
    },
  },

  methods: {
    selectMediaType(mediaType) {
      this.sttngs.user.mediaSrch.tp = mediaType;
      const firstOption = [];
      setTimeout(() => {
        Object.values(this.$refs.providers).forEach((option) => {
          if (!option.disabled && firstOption.length === 0) {
            firstOption.push(mediaType);
            this.sttngs.user.mediaSrch.prvdr = option.title;
            this.sttngs.user.mediaSrch.kywrd = option.value;
            this.sttngsReq('PATCH', 'user');
          }
        });
        if (firstOption.length === 0) {
          this.sttngs.user.mediaSrch.prvdr = '';
          this.sttngs.user.mediaSrch.kywrd = '';
          this.sttngsReq('PATCH', 'user');
        }
      }, 1);
      this.folder = '';
    },
    selectSearch(event) {
      this.$refs.multimediaGallery.scrollTop = 0;
      this.sttngs.user.mediaSrch.kywrd = event.target.value;
      this.sttngs.user.mediaSrch.prvdr = event.target[event.target.selectedIndex].title;
      this.sttngsReq('PATCH', 'user');
      this.folder = '';
    },
    selectMedia(type, path) {
      this.slctd[type + 'URL'] = path;
    },
    async deleteMedia(link) {
      if (confirm('Are you sure you would like to delete this file?') === true) {
        try {
          const response = await fetch(app_api_url + this.slctd.job + '/media', {
            method: 'DELETE',
            headers: {
              Authorization: access_token,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
            },
            body: JSON.stringify({
              mediaLink: link,
              folder: this.tp == 'img' ? 'images' : 'videos',
            }),
          });
          const resJSON = await response.json();
          if (resJSON.success) this.tp == 'img' ? this.getImages() : this.getVideos();
        } catch (error) {
          console.log(error.toString());
          this.showMsg(error.toString());
        }
      }
    },
    selectFolder(folder) {
      this.folder = folder;
    },
    drag(event, mediaPath) {
      event.dataTransfer.setData('text', mediaPath);
    },
    mediaSearch() {
      this.$refs.multimediaGallery.scrollTop = 0;
      this.pexelsReq('GET', this.tp + '/' + this.$refs.searchInput.value.toLowerCase().replaceAll(' ', '+'));
      this.folder = '';
    },
  },

  created() {
    if (!this.sttngs.user.mediaSrch.hasOwnProperty('prvdr')) this.sttngs.user.mediaSrch.prvdr = 'files';
    if (!this.sttngs.user.mediaSrch.hasOwnProperty('tp')) this.sttngs.user.mediaSrch.tp = 'img';
    if (!this.sttngs.user.mediaSrch.hasOwnProperty('kywrd')) this.sttngs.user.mediaSrch.kywrd = 'misc_images';
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
/* .multimedia-gallery-column {
  -ms-flex: calc(50% - 4px);
  flex: calc(50% - 4px);
  max-width: calc(50% - 4px);
  padding: 0 1%;
} */
.multimedia-gallery img {
  cursor: pointer;
  margin-bottom: 8px;
  vertical-align: middle;
  width: 100%;
}
.multimedia-gallery video {
  cursor: pointer;
  margin-bottom: 8px;
  vertical-align: middle;
  width: 100%;
  height: 200px;
  background-color: black;
}
</style>
