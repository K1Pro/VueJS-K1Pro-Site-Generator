<template>
  <div :name="elValue.name" :class="elKey">
    <div
      class="grid-container"
      :style="{ gridTemplateColumns: windowWidth > respWidth ? gridTemplateColumnsFull : gridTemplateColumnsMobile }"
    >
      <div class="grid-item"></div>
      <template v-if="windowWidth > respWidth">
        <div
          v-for="(icon, iconIndex) in elValue['icon-slider-items']"
          class="grid-item"
          :style="{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.8)',
            'text-align': loggedIn ? 'center' : 'center',
            padding: loggedIn ? '0px' : '20px',
            'font-size': loggedIn ? '30px' : '30px',
          }"
        >
          <template v-if="loggedIn === true">
            <button
              v-if="iconIndex !== 0"
              class="fa-solid fa-trash-can"
              @click.prevent="deleteIcon(iconIndex)"
            ></button>
            <i :class="icon[1]"></i>
            <select
              :style="{ width: '100%' }"
              v-model="site.params.htmlElements[elIndex][elKey]['icon-slider-items'][iconIndex][1]"
            >
              <icon_slider_options></icon_slider_options>
            </select>
            <input type="text" v-model="site.params.htmlElements[elIndex][elKey]['icon-slider-items'][iconIndex][0]" />
          </template>
          <template v-else>
            <i :class="icon[1]"></i>
            <p>{{ icon[0] }}</p>
          </template>
        </div>
      </template>
      <template v-else>
        <template v-for="(icon, index) in elValue['icon-slider-items']">
          <div
            v-if="index < 3"
            class="grid-item"
            :style="{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.8)',
            }"
          >
            <i :class="icon[1]"></i>
            <p>{{ icon[0] }}</p>
          </div>
        </template>
      </template>
      <div class="grid-item"></div>
    </div>
  </div>
</template>

<script>
import Icon_slider_options from './Icon_slider_options.vue';

export default {
  name: 'Image Slider',

  components: {
    Icon_slider_options,
  },

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'message', 'windowWidth', 'respWidth', 'site']),

    gridTemplateColumnsFull() {
      const side = (99 - this.elValue['icon-slider-items'].length * 10) / 2;
      const autos = '9% '.repeat(this.elValue['icon-slider-items'].length);
      return side + '% ' + autos + side + '%';
    },

    gridTemplateColumnsMobile() {
      return '1% 30% 30% 30% 1%';
    },
  },

  methods: {
    deleteIcon(iconIndex) {
      this.site.params.htmlElements[this.elIndex][this.elKey]['icon-slider-items'].splice(iconIndex, 1);
    },
  },

  created() {
    // console.log(this.gridTemplateColumnsFull);
  },
};
</script>

<style>
.icon-slider {
  position: relative;
}

.grid-container {
  display: grid;
  /* grid-template-columns: auto auto auto auto auto auto; */
  /* background-color: #2196f300; */
  padding: 10px;
  column-gap: 1%;
}

.grid-item {
  /* background-color: rgb(255, 255, 255); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /*  padding: 20px;
  font-size: 30px;
  text-align: center;*/
  overflow: hidden;
}
.grid-item p {
  font-size: 3vw;
  margin-bottom: -10px;
}

.grid-item input[type='text'] {
  padding: 5px;
  border-style: dashed;
}

.grid-item select {
  padding: 5px;
}

.grid-item button {
  padding: 6px;
  float: right;
}

@media only screen and (min-width: 650px) {
  .grid-item p {
    font-size: 1.2vw;
  }
}
</style>
