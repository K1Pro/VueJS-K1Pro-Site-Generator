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
          windowWidth >= 400
            ? gridTemplateColumnsFull
            : gridTemplateColumnsMobile,
      }"
    >
      <div>
        <div
          v-if="showIconScroll && 0 <= iconStart"
          class="icon-slider-prev"
          :style="{
            'background-color': elValue.style.slideColor,
            border: '1px solid ' + elValue.style.borderColor,
            'border-radius': elValue.style.borderRadius + 'px',
            color: elValue.style.iconColor,
          }"
        >
          <i
            v-if="showIconScroll && 0 < iconStart"
            class="fa-solid fa-chevron-left"
            style="cursor: pointer"
            @click="decreaseScroll"
          ></i>
          <i
            v-if="showIconScroll && 0 == iconStart"
            class="fa-solid fa-chevron-left"
            :style="{ color: elValue.style.iconColor + '50' }"
          ></i>
        </div>
        <div v-else class="icon-slider-item"></div>
      </div>
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
            <template v-if="iconIndex != respvIconAmnt - iconSliderMaxAmount">
              {{ +iconStart + iconIndex }}
              <button
                v-if="iconIndex !== 0"
                class="minus"
                @click.prevent="deleteIcon(+iconStart + iconIndex)"
              ></button>
              <i
                :style="{
                  color: elValue.style.iconColor,
                  'font-size': elValue.style.iconSize + 'px',
                }"
                :class="
                  elValue['icon-slider-items']?.[+iconStart + iconIndex]?.[1]
                "
              ></i>
              <select
                :style="{
                  width: '100%',
                }"
                v-model="
                  site.params.htmlElements[elIndex][elKey]['icon-slider-items'][
                    +iconStart + iconIndex
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
                    +iconStart + iconIndex
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
              <template v-if="elValue['icon-slider-items'].length < 9">
                <div class="icon-slider-modify-container">
                  <div class="icon-slider-modify">
                    <button class="plus" @click.prevent="addIcon"></button>
                  </div>
                </div>
              </template>
            </template>
          </template>
          <template v-else>
            <div class="icon-slider-icon">
              <i
                :style="{
                  color: elValue.style.iconColor,
                  'font-size': elValue.style.iconSize + 'px',
                }"
                :class="
                  elValue['icon-slider-items']?.[+iconStart + iconIndex]?.[1]
                "
              ></i>
            </div>
            <div style="padding: 0px 10px">
              <div
                class="icon-slider-text"
                :style="{
                  'font-size': elValue.style.textSize + 'px',
                }"
              >
                {{
                  elValue['icon-slider-items']?.[+iconStart + iconIndex]?.[0]
                }}
              </div>
            </div>
          </template>
        </div>
      </template>
      <div>
        <div
          v-if="
            showIconScroll &&
            elValue['icon-slider-items'].length +
              iconSliderModifyAmount -
              respvIconAmnt >=
              iconStart
          "
          class="icon-slider-next"
          :style="{
            'background-color': elValue.style.slideColor,
            border: '1px solid ' + elValue.style.borderColor,
            'border-radius': elValue.style.borderRadius + 'px',
            color: elValue.style.iconColor,
          }"
        >
          <i
            v-if="
              showIconScroll &&
              elValue['icon-slider-items'].length +
                iconSliderModifyAmount -
                respvIconAmnt >
                iconStart &&
              respvIconAmnt + iconStart < 9
            "
            class="fa-solid fa-chevron-right"
            style="cursor: pointer"
            @click="increaseScroll"
          ></i>
          <i
            v-if="
              (showIconScroll &&
                elValue['icon-slider-items'].length +
                  iconSliderModifyAmount -
                  respvIconAmnt ==
                  iconStart) ||
              respvIconAmnt + iconStart >= 9
            "
            class="fa-solid fa-chevron-right"
            :style="{ color: elValue.style.iconColor + '50' }"
          ></i>
        </div>
        <div v-else class="icon-slider-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
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

    iconSliderItemAmount() {
      // prettier-ignore
      return this.site.params.htmlElements[this.elIndex][this.elKey]['icon-slider-items'].length;
    },
    iconSliderModifyAmount() {
      return this.loggedIn ? 1 : 0;
    },
    iconSliderMaxAmount() {
      return this.site.params.htmlElements[this.elIndex][this.elKey][
        'icon-slider-items'
      ].length < 9
        ? 1
        : 0;
    },
    windowWidthRoundDown() {
      return this.loggedIn && this.windowWidth > this.respWidth.md
        ? Math.floor((this.windowWidth * 0.75 - 100) / 100)
        : Math.floor((this.windowWidth - 100) / 100);
    },
    showIconScroll() {
      return this.windowWidth < 400 && this.iconSliderItemAmount <= 3
        ? false
        : this.iconSliderItemAmount > this.windowWidthRoundDown;
    },
    respvIconAmnt() {
      return this.iconSliderItemAmount > this.windowWidthRoundDown &&
        this.windowWidth >= 400
        ? this.windowWidthRoundDown
        : this.iconSliderItemAmount > this.windowWidthRoundDown &&
          this.windowWidth < 400
        ? 3
        : this.iconSliderItemAmount;
    },

    gridTemplateColumnsFull() {
      const autos = '100px '.repeat(this.respvIconAmnt);
      return 'auto ' + autos + 'auto';
    },
    gridTemplateColumnsMobile() {
      const autos = (
        'calc(' +
        100 / this.respvIconAmnt +
        '% - ' +
        70 / this.respvIconAmnt +
        'px) '
      ).repeat(this.respvIconAmnt);
      return '25px ' + autos + '25px';
    },
  },

  data() {
    return {
      menuChange: '',
      iconStart: 0,
    };
  },

  methods: {
    increaseScroll() {
      this.iconStart++;
    },
    decreaseScroll() {
      this.iconStart--;
    },
    addIcon() {
      this.site.params.htmlElements[this.elIndex][this.elKey][
        'icon-slider-items'
      ].push(['', 'fa-solid fa-question']);
      // I have to adjust this when adding new icons so no errors come up possible without a 1 or with a 1.
      this.iconStart =
        this.iconSliderItemAmount -
        this.respvIconAmnt +
        1 -
        this.iconSliderModifyAmount;
      // this.respvIconAmnt =
      //   this.windowWidth > this.respWidth.md
      //     ? this.site.params.htmlElements[this.elIndex][this.elKey][
      //         'icon-slider-items'
      //       ].length
      //     : 3;
    },
    deleteIcon(iconIndex) {
      console.log(iconIndex);
      console.log(
        this.site.params.htmlElements[this.elIndex][this.elKey][
          'icon-slider-items'
        ][iconIndex]
      );
      //work on this here because there is an after after splicing
      this.site.params.htmlElements[this.elIndex][this.elKey][
        'icon-slider-items'
      ].splice(iconIndex, 1);
      // this.respvIconAmnt =
      //   this.windowWidth > this.respWidth.md
      //     ? this.site.params.htmlElements[this.elIndex][this.elKey][
      //         'icon-slider-items'
      //       ].length
      //     : 3;
    },
    menuAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
    },
  },

  created() {
    // this.respvIconAmnt =
    //   this.windowWidth > this.respWidth.md
    //     ? this.site.params.htmlElements[this.elIndex][this.elKey][
    //         'icon-slider-items'
    //       ].length
    //     : 3;
  },

  watch: {
    respvIconAmnt(newrespvIconAmnt, oldrespvIconAmnt) {
      if (
        oldrespvIconAmnt > 2 &&
        newrespvIconAmnt > oldrespvIconAmnt &&
        this.iconSliderItemAmount < newrespvIconAmnt + this.iconStart
      )
        this.iconStart--;
    },
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
};
</script>

<style>
.icon-slider {
  position: relative;
}

.icon-slider-container {
  display: grid;
  column-gap: 5px;
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
  height: 140px;
  padding: 20px 0px;
}

.icon-slider-icon {
  height: 50%;
  /* margin-bottom: 12px; */
}

.icon-slider-text {
  overflow: hidden;
  height: 50%;
  /* font-size: 20px; */
}
.icon-slider-item i {
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
.icon-slider-modify button {
  position: relative;
  margin-left: 40px;
  margin-top: 0px;
}

.icon-slider-prev {
  height: 140px;
  float: right;
  padding: 60px 5px 0px 5px;
  margin: 0px;
}

.icon-slider-next {
  height: 140px;
  float: left;
  padding: 60px 5px 0px 5px;
  margin: 0px;
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
