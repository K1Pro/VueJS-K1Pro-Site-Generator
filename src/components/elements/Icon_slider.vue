<template>
  <div
    :class="elKey"
    :style="{
      'padding-bottom': elValue.style['padding-bottom'] + 'px',
      'background-color': elValue.style.backgroundColor,
      'border-width': loggedIn ? '1px 1px 0px 1px' : 'none',
      'border-style': loggedIn ? 'dashed' : 'none',
      'border-color': loggedIn ? 'black' : 'none',
    }"
  >
    <template
      v-if="site.params.htmlElements[elIndex][elKey].style.anchor != ''"
    >
      <a
        :style="{
          'scroll-margin-top': site.params.htmlElements[0]['top-menu']?.style
            .height
            ? site.params.htmlElements[0]['top-menu'].style.height + 'px'
            : '0px',
        }"
        :id="site.params.htmlElements[elIndex][elKey].style.anchor"
        :ref="site.params.htmlElements[elIndex][elKey].style.anchor"
      ></a>
    </template>
    <template v-if="loggedIn === true">
      <!-- Modify element select and options -->
      <div class="modPosition">
        <select name="menuChange" v-model="menuChange" @change="menuAction">
          <option value="" disabled selected>
            Modify {{ elKey.charAt(0).toUpperCase()
            }}{{ elKey.slice(1).toLowerCase().replaceAll('_', ' ') }}
          </option>
          <element_select
            :selectKey="elKey"
            :selectIndex="elIndex"
          ></element_select>
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
      class="icon-slider-container"
      :style="{
        gridTemplateColumns:
          windowWidth > respWidth.md
            ? gridTemplateColumnsFull
            : gridTemplateColumnsMobile,
      }"
    >
      <div class="icon-slider-item"></div>
      <template v-for="(icon, iconIndex) in elValue['icon-slider-items']">
        <div
          v-if="iconIndex < respvIconAmnt"
          class="icon-slider-item"
          :style="{
            'background-color': elValue.style.slideColor,
            border: '1px solid ' + elValue.style.borderColor,
            'text-align': loggedIn ? 'center' : 'center',
            'border-radius': elValue.style.borderRadius + 'px',
            color: elValue.style.iconColor,
            // padding: loggedIn ? '0px' : '20px',
          }"
        >
          <template v-if="loggedIn === true">
            <button
              v-if="iconIndex !== 0"
              class="minus"
              @click.prevent="deleteIcon(iconIndex)"
            ></button>
            <i
              :style="{
                color: elValue.style.iconColor,
                'font-size': elValue.style.iconSize + 'px',
              }"
              :class="icon[1]"
            ></i>
            <select
              :style="{
                width: '100%',
              }"
              v-model="
                site.params.htmlElements[elIndex][elKey]['icon-slider-items'][
                  iconIndex
                ][1]
              "
            >
              <icon_slider_options></icon_slider_options>
            </select>
            <input
              type="text"
              placeholder="text here..."
              v-model="
                site.params.htmlElements[elIndex][elKey]['icon-slider-items'][
                  iconIndex
                ][0]
              "
              :style="{
                color: elValue.style.iconColor,
                'background-color': elValue.style.slideColor,
                'font-size': elValue.style.textSize + 'px',
              }"
            />
          </template>
          <template v-else>
            <div class="icon-slider-icon">
              <i
                :style="{
                  color: elValue.style.iconColor,
                  'font-size': elValue.style.iconSize + 'px',
                }"
                :class="icon[1]"
              ></i>
            </div>
            <div
              class="icon-slider-text"
              :style="{
                'font-size': elValue.style.textSize + 'px',
              }"
            >
              {{ icon[0] }}
            </div>
          </template>
        </div>
      </template>
      <div class="icon-slider-item">
        <template v-if="loggedIn && elValue['icon-slider-items'].length < 9">
          <div class="icon-slider-modify-container">
            <div class="icon-slider-modify">
              <button class="plus" @click.prevent="addIcon"></button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Icon_slider_options from './Icon_slider_options.vue';
import Element_select from './../login/Element_select.vue';
import Element_select_options from './../login/Element_select_options.vue';

export default {
  name: 'Icon Slider',

  components: {
    Icon_slider_options,
    Element_select,
    Element_select_options,
  },

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'windowWidth',
      'respWidth',
      'site',
      'endPts',
    ]),

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
    return {
      menuChange: '',
      respvIconAmnt: '',
    };
  },

  methods: {
    addIcon() {
      this.site.params.htmlElements[this.elIndex][this.elKey][
        'icon-slider-items'
      ].push(['', 'fa-solid fa-question']);
      this.respvIconAmnt =
        this.windowWidth > this.respWidth.md
          ? this.site.params.htmlElements[this.elIndex][this.elKey][
              'icon-slider-items'
            ].length
          : 3;
    },
    deleteIcon(iconIndex) {
      this.site.params.htmlElements[this.elIndex][this.elKey][
        'icon-slider-items'
      ].splice(iconIndex, 1);
      this.respvIconAmnt =
        this.windowWidth > this.respWidth.md
          ? this.site.params.htmlElements[this.elIndex][this.elKey][
              'icon-slider-items'
            ].length
          : 3;
    },
    menuAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
    },
  },

  created() {
    this.respvIconAmnt =
      this.windowWidth > this.respWidth.md
        ? this.site.params.htmlElements[this.elIndex][this.elKey][
            'icon-slider-items'
          ].length
        : 3;
  },

  mounted() {
    if (
      this.$refs[
        this.site.params.htmlElements[this.elIndex][this.elKey].style.anchor
      ]?.id == this.endPts.urlHash
    )
      window.scrollTo(
        0,
        this.$refs[
          this.site.params.htmlElements[this.elIndex][[this.elKey]].style.anchor
        ].getBoundingClientRect().y -
          this.site.params.htmlElements[0]['top-menu'].style.height
      );
  },

  watch: {
    windowWidth(newWindowWidth, oldWindowWidth) {
      this.respvIconAmnt =
        this.windowWidth > this.respWidth.md
          ? this.site.params.htmlElements[this.elIndex][this.elKey][
              'icon-slider-items'
            ].length
          : 3;
    },
  },
};
</script>

<style>
.icon-slider {
  position: relative;
}

.icon-slider-container {
  display: grid;
  column-gap: 1%;
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

.icon-slider-item {
  overflow: hidden;
  height: 100px;
  padding: 20px 0px;
}

.icon-slider-icon {
  height: 50%;
  margin-bottom: 12px;
}

.icon-slider-text {
  height: 50%;
  padding: 0px 10px;
  /* font-size: 20px; */
}

.icon-slider-item input[type='text'] {
  padding: 5px;
  border-style: none;
  width: 85%;
}

.icon-slider-item select {
  padding: 5px;
}

.icon-slider-item button {
  position: absolute;
  margin-left: 25px;
  margin-top: -10px;
  cursor: pointer;
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
  .icon-slider-text {
    /* font-size: 1.4vw; */
  }
}
</style>
