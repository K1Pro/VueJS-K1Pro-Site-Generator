<template>
  <div class="login-side-panel">
    <div class="tabtitlecontainer">
      <div class="tabtitle">
        <b>Settings: </b>
      </div>
    </div>

    <div class="tabcontainer">
      <div class="tab">
        <button class="tablinks fa fa-gear" @click="openTab"></button>
        <button class="tablinks fa fa-photo-film" @click="openTab"></button>
        <button class="tablinks fa fa-file-lines" @click="openTab"></button>
        <button class="tablinks fa-solid fa-user-gear" @click="openTab"></button>
        <button class="tablinks fa fa-envelope" @click="openTab"></button>
        <button class="tablinks fa-solid fa-arrow-right-from-bracket" @click.prevent="deleteLogin"></button>
      </div>

      <div class="tabcontent" v-if="activeTab === 'gear'">
        <background_settings style="padding: 10px"></background_settings>
      </div>

      <div class="tabcontent" v-if="activeTab === 'photo-film'">
        <image_search></image_search>
      </div>

      <div class="tabcontent" v-if="activeTab === 'file-lines'">
        <text_generation></text_generation>
      </div>

      <div class="tabcontent" v-if="activeTab === 'envelope'">
        <messages></messages>
      </div>
    </div>
  </div>
</template>

<script>
import Background_settings from './Background_settings.vue';
import Image_search from './Image_search.vue';
import Text_generation from './Text_generation.vue';
import Messages from './Messages.vue';

export default {
  name: 'Login Side Panel',

  components: {
    Background_settings,
    Image_search,
    Text_generation,
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
      this.activeTab = event.target.className.replace('tablinks fa fa-', '');
    },
  },
};
</script>

<style>
/* Style the tab */
.tabtitlecontainer {
  display: table;
  height: 6vh;
}

.tabtitle {
  display: table-cell;
  padding-left: 10px;
  vertical-align: middle;
}

.tabcontainer {
  height: 100%;
  display: flex;
}
.tab {
  box-sizing: border-box;
  float: left;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  width: 50px;
  height: 94vh;
}

/* Style the buttons inside the tab */
.tab button {
  display: block;
  background-color: inherit;
  color: black;
  padding: 22px 13px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
  font-size: 20px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current "tab button" class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  box-sizing: border-box;
  float: left;
  /* padding: 0px 12px; */
  border: 1px solid #ccc;
  /* width: 85%; */
  flex-grow: 1;
  border-left: none;
  height: 94vh;
  overflow-y: scroll;
}
</style>
