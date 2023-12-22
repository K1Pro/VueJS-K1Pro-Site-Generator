<template>
  <div
    :name="elValue.name"
    :class="elKey"
    :style="{
      'margin-bottom': elValue.style['margin-bottom'] + 'px',
    }"
  >
    <template v-if="loggedIn === true">
      <!-- Modify element select and options -->
      <div class="modPosition">
        <select name="menuChange" v-model="menuChange" @change="menuAction">
          <option value="" disabled selected>
            Modify {{ elKey.charAt(0).toUpperCase() }}{{ elKey.slice(1).toLowerCase().replaceAll('_', ' ') }}
          </option>
          <element_select :selectKey="elKey" :selectIndex="elIndex"></element_select>
          <!-- Custom select options here -->
        </select>
        <div class="modChange">
          <element_select_options
            :selectKey="elKey"
            :selectIndex="elIndex"
            :selectChange="menuChange"
          ></element_select_options>
        </div>
      </div>
      <!-- Modify element select and options -->
    </template>
    <div
      class="grid-container"
      :style="{
        gridTemplateColumns: windowWidth > respWidth ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
        'background-color': site.params.htmlElements[elIndex][elKey]['style']['backgroundColor'],
        'border-width': loggedIn ? '1px 1px 0px 1px' : 'none',
        'border-style': loggedIn ? 'dashed' : 'none',
        'border-color': loggedIn ? 'black' : 'none',
      }"
    >
      <div class="grid-item"></div>
      <template v-if="windowWidth > respWidth">
        <div
          v-for="(icon, iconIndex) in elValue['icon-slider-items']"
          class="grid-item"
          :style="{
            'background-color': site.params.htmlElements[elIndex][elKey]['style']['slideColor'],
            border: '1px solid ' + site.params.htmlElements[elIndex][elKey]['style']['borderColor'],
            'text-align': loggedIn ? 'center' : 'center',
            'font-size': loggedIn ? '30px' : '30px',
            'border-radius': site.params.htmlElements[elIndex][elKey]['style']['borderRadius'] + 'px',
            color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'],
          }"
        >
          <template v-if="loggedIn === true">
            <button
              v-if="iconIndex !== 0"
              class="fa-solid fa-circle-minus"
              style="color: #ff0000"
              @click.prevent="deleteIcon(iconIndex)"
            ></button>
            <i :style="{ color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'] }" :class="icon[1]"></i>
            <select
              :style="{
                width: '100%',
              }"
              v-model="site.params.htmlElements[elIndex][elKey]['icon-slider-items'][iconIndex][1]"
            >
              <icon_slider_options></icon_slider_options>
            </select>
            <input
              type="text"
              v-model="site.params.htmlElements[elIndex][elKey]['icon-slider-items'][iconIndex][0]"
              :style="{
                color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'],
                'background-color': site.params.htmlElements[elIndex][elKey]['style']['slideColor'],
              }"
            />
          </template>
          <template v-else>
            <div class="grid-item-icon">
              <i
                :style="{ color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'] }"
                :class="icon[1]"
              ></i>
            </div>
            <div class="grid-item-text">{{ icon[0] }}</div>
          </template>
        </div>
      </template>
      <template v-else>
        <template v-for="(icon, index) in elValue['icon-slider-items']">
          <div
            v-if="index < 3"
            class="grid-item"
            :style="{
              'background-color': site.params.htmlElements[elIndex][elKey]['style']['slideColor'],
              border: '1px solid ' + site.params.htmlElements[elIndex][elKey]['style']['borderColor'],
              'text-align': loggedIn ? 'center' : 'center',
              padding: loggedIn ? '0px' : '20px',
              'font-size': loggedIn ? '30px' : '30px',
              'border-radius': site.params.htmlElements[elIndex][elKey]['style']['borderRadius'] + 'px',
              color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'],
            }"
          >
            <div class="grid-item-icon">
              <i
                :style="{ color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'] }"
                :class="icon[1]"
              ></i>
            </div>
            <div class="grid-item-text">{{ icon[0] }}</div>
          </div>
        </template>
      </template>
      <div class="grid-item">
        <template v-if="loggedIn && site.params.htmlElements[elIndex][elKey]['icon-slider-items'].length < 9">
          <div class="icon-slider-modify-container">
            <div class="icon-slider-modify">
              <button @click.prevent="addIcon"><i class="fa-solid fa-circle-plus" style="color: green"></i></button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Icon_slider_options from './Icon_slider_options.vue';
import Element_select from './login/Login_element_select.vue';
import Element_select_options from './login/Login_element_select_options.vue';

export default {
  name: 'Image Slider',

  components: {
    Icon_slider_options,
    Element_select,
    Element_select_options,
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
      return '0% 32% 32% 32% 0%';
    },
  },

  data() {
    return { menuChange: '' };
  },

  methods: {
    addIcon() {
      this.site.params.htmlElements[this.elIndex][this.elKey]['icon-slider-items'].push(['text', 'fa-solid fa-house']);
    },
    deleteIcon(iconIndex) {
      this.site.params.htmlElements[this.elIndex][this.elKey]['icon-slider-items'].splice(iconIndex, 1);
    },
    menuAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
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
.icon-slider-modify-container {
  display: table;
  height: 100%;
}
.icon-slider-modify {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.grid-container {
  display: grid;
  column-gap: 1%;
}

.grid-item {
  overflow: visible;
  height: 100px;
  padding: 20px 0px;
}

.grid-item-icon {
  height: 50%;
}

.grid-item-text {
  height: 50%;
  font-size: 20px;
}

.grid-item input[type='text'] {
  padding: 5px;
  border-style: none;
  width: 85%;
}

.grid-item select {
  padding: 5px;
}

.grid-item button {
  padding: 6px;
  float: right;
}

.modPosition {
  position: absolute;
  top: 0;
  left: 5px;
  text-align: left;
}

.modPosition input[type='color'] {
  width: 150px;
}

.modPosition select {
  width: 150px;
  padding: 3px;
  margin: 0px;
}

.modChange {
  background-color: white;
  width: 150px;
}
.modChange input[type='range'] {
  width: 75%;
}

@media only screen and (min-width: 650px) {
  .grid-item-text {
    font-size: 1.4vw;
  }
}
</style>
