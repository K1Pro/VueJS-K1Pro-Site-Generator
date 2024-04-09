import Background_settings from './Background_settings_vue.js';
import Image_search from './Image_search_vue.js';
import Video_search from './Video_search_vue.js';
import Text_generation from './Text_generation_vue.js';
import Blog_settings from './Blog_settings_vue.js';
import Messages from './Messages_vue.js';

export default {
  name: 'Login Side Panel',

  template: /*html*/ `
    <div class="side-panel">
      <div class="tab-title-container">
        <div class="tab-title">
          <b>Settings: </b>
        </div>
      </div>

      <div class="tab-body-container">
        <div class="tab">
          <button
            title="Web site"
            :class="{ 'tab-active': activeTab == 'gear' }"
            class="fa fa-gear"
            @click="openTab"
          ></button>
          <button
            title="Blog"
            :class="{ 'tab-active': activeTab == 'square-poll-horizontal' }"
            class="fa fa-square-poll-horizontal"
            @click="openTab"
          ></button>
          <button
            title="Photo search"
            :class="{ 'tab-active': activeTab == 'camera' }"
            class="fa fa-camera"
            @click="openTab"
          ></button>
          <button
            title="Video search"
            :class="{ 'tab-active': activeTab == 'video' }"
            class="fa fa-video"
            @click="openTab"
          ></button>
          <button
            title="Text search"
            :class="{ 'tab-active': activeTab == 'file-lines' }"
            class="fa fa-file-lines"
            @click="openTab"
          ></button>
          <button
            title="Messages"
            :class="{ 'tab-active': activeTab == 'envelope' }"
            class="fa fa-envelope"
            @click="openTab"
          ></button>
          <button
            title="User settings"
            :class="{ 'tab-active': activeTab == 'user-gear' }"
            class="fa fa-user-gear"
            @click="openTab"
          ></button>
          <button
            title="Log out"
            :class="{ 'tab-active': activeTab == 'arrow-right-from-bracket' }"
            class="fa-solid fa-arrow-right-from-bracket"
            @click.prevent="deleteLogin"
          ></button>
        </div>

        <div class="tab-content" v-if="activeTab === 'gear'">
          <background_settings style="padding: 10px"></background_settings>
        </div>

        <div class="tab-content" v-if="activeTab === 'camera'">
          <image_search></image_search>
        </div>

        <div class="tab-content" v-if="activeTab === 'video'">
          <video_search></video_search>
        </div>

        <div class="tab-content" v-if="activeTab === 'file-lines'">
          <text_generation></text_generation>
        </div>

        <div class="tab-content" v-if="activeTab === 'square-poll-horizontal'">
          <blog_settings></blog_settings>
        </div>

        <div class="tab-content" v-if="activeTab === 'envelope'">
          <messages></messages>
        </div>
      </div>
    </div>
  `,

  components: {
    Background_settings,
    Image_search,
    Video_search,
    Text_generation,
    Blog_settings,
    Messages,
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['deleteLogin']),
  },

  data() {
    return { activeTab: 'gear' };
  },

  methods: {
    openTab(event) {
      if (event.target.className.split('fa-')[1] != this.activeTab)
        this.activeTab = event.target.className.split('fa-')[1];
    },
  },

  mounted() {
    style(
      'Side-Panel',
      /*css*/ `
.tab-title-container {
  display: table;
  height: 6vh;
}

.tab-title {
  display: table-cell;
  padding-left: 10px;
  vertical-align: middle;
}

.tab-body-container {
  display: flex;
  height: 100%;
}
.tab {
  float: left;
  width: 50px;
  height: 94vh;
  border-right: 1px solid darkgrey;
  background-color: #f1f1f1;
}

.tab button {
  display: block;
  color: black;
  padding: 22px 13px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: default;
  transition: 0.3s;
  font-size: 20px;
  border-bottom: 1px solid darkgrey;
}

.tab button:hover:not(.tab-active) {
  background-color: #ddd;
  cursor: pointer;
}

.tab-active {
  background-color: #bbbbbb;
}

.tab-content {
  flex-grow: 1;
  float: left;
  border: 1px solid #ccc;
  border-left: none;
  height: 94vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
      `
    );
  },
};
