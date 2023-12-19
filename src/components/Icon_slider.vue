<template>
  <div :name="elValue.name" :class="elKey">
    <div
      class="grid-container"
      :style="{
        gridTemplateColumns: windowWidth > respWidth ? gridTemplateColumnsFull : gridTemplateColumnsMobile,
        'background-color': site.params.htmlElements[elIndex][elKey]['style']['backgroundColor'],
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
            padding: loggedIn ? '0px' : '20px',
            'font-size': loggedIn ? '30px' : '30px',
            'border-radius': site.params.htmlElements[elIndex][elKey]['style']['borderRadius'] + 'px',
            color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'],
          }"
        >
          <template v-if="loggedIn === true">
            <button
              v-if="iconIndex !== 0"
              class="fa-solid fa-trash-can"
              @click.prevent="deleteIcon(iconIndex)"
            ></button>
            <i :style="{ color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'] }" :class="icon[1]"></i>
            <select
              :style="{
                width: '100%',
                color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'],
                'background-color': site.params.htmlElements[elIndex][elKey]['style']['slideColor'],
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
            <i :style="{ color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'] }" :class="icon[1]"></i>
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
              'text-align': loggedIn ? 'center' : 'center',
              padding: loggedIn ? '0px' : '20px',
              'font-size': loggedIn ? '30px' : '30px',
            }"
          >
            <i :style="{ color: site.params.htmlElements[elIndex][elKey]['style']['iconColor'] }" :class="icon[1]"></i>
            <p>{{ icon[0] }}</p>
          </div>
        </template>
      </template>
      <div class="grid-item">
        <template v-if="loggedIn === true">
          <div class="icon-slider-modify-container">
            <div class="icon-slider-modify">
              <!-- Modify element select and options -->
              &nbsp;
              <select name="menuChange" v-model="menuChange" @change="menuAction">
                <option value="" disabled selected>
                  Modify {{ elKey.charAt(0).toUpperCase() }}{{ elKey.slice(1).toLowerCase().replaceAll('_', ' ') }}
                </option>
                <element_select :selectKey="elKey" :selectIndex="elIndex"></element_select>
                <!-- Custom select options here -->
              </select>
              <p></p>
              <div>
                <element_select_options
                  :selectKey="elKey"
                  :selectIndex="elIndex"
                  :selectChange="menuChange"
                ></element_select_options>
              </div>
              <!-- Modify element select and options -->
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
      return '1% 30% 30% 30% 1%';
    },
  },

  data() {
    return { menuChange: '' };
  },

  methods: {
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
  /* position: relative; */
  display: table-cell;
  vertical-align: middle;
  text-align: center;
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
  /* border-radius: 25px; */
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
