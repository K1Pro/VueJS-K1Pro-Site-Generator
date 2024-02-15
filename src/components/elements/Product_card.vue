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
      class="product-card-container"
      :style="{
        gridTemplateColumns:
          windowWidth > respWidth.md
            ? gridTemplateColumnsFull
            : gridTemplateColumnsMobile,
      }"
    >
      <div class="product-card-item"></div>
      <template
        v-for="(productcard, cardIndex) in elValue['product-card-items']"
      >
        <div
          class="product-card-item"
          :style="{ 'background-color': elValue.style.cardColor }"
        >
          <div class="product-card-group">
            <img
              :src="productcard[0]"
              :alt="productcard[1]"
              :style="{ 'margin-bottom': loggedIn ? '-26px' : '0px' }"
            />
            <button v-if="loggedIn" @click="selectImg(cardIndex)">
              Select Image
            </button>
            <div
              class="product-card-text"
              :style="{ padding: loggedIn ? '0px' : '12px' }"
            >
              <template v-if="loggedIn === true">
                <input
                  type="text"
                  placeholder="Title"
                  v-model="
                    site.params.htmlElements[elIndex][elKey][
                      'product-card-items'
                    ][cardIndex][1]
                  "
                />
                <textarea
                  rows="5"
                  placeholder="Description"
                  v-model="
                    site.params.htmlElements[elIndex][elKey][
                      'product-card-items'
                    ][cardIndex][2]
                  "
                ></textarea>
              </template>
              <template v-else>
                <div class="product-card-header">
                  {{ productcard[1] }}
                </div>
                <p>
                  {{ productcard[2] }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </template>
      <div class="product-card-item"></div>
    </div>
  </div>
</template>

<script>
import Element_select from './../login/Element_select.vue';
import Element_select_options from './../login/Element_select_options.vue';

export default {
  name: 'Product Card',

  components: {
    Element_select,
    Element_select_options,
  },

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'msg',
      'windowWidth',
      'respWidth',
      'site',
      'selectedPhoto',
      'endPts',
    ]),

    gridTemplateColumnsFull() {
      const side = (99 - this.elValue['product-card-items'].length * 21) / 2;
      const autos = '20% '.repeat(this.elValue['product-card-items'].length);
      return side + '% ' + autos + side + '%';
    },

    gridTemplateColumnsMobile() {
      return '100%';
    },
  },

  methods: {
    selectImg(imgIndex) {
      if (this.selectedPhoto) {
        this.site.params.htmlElements[this.elIndex]['product-card'][
          'product-card-items'
        ][imgIndex][0] = this.selectedPhoto;
      } else {
        this.msg.snackBar = 'Search for image first';
      }
    },
  },

  data() {
    return {
      menuChange: '',
    };
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
.product-card {
  position: relative;
}

.product-card-container {
  display: grid;
  column-gap: 1%;
}

.product-card-item {
  overflow: visible;
  text-align: left;
}
.product-card-group button {
  position: relative;
  z-index: 1;
  height: 22px;
}
.product-card-group img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
.product-card-text textarea,
.product-card-text input {
  width: 96%;
  padding: 2%;
  border: 0px;
  background: transparent;
  font-family: Arial, Helvetica, sans-serif;
  resize: none;
}
.product-card-header,
.product-card-text input {
  font-size: 30px;
}
@media only screen and (min-width: 650px) {
  .product-card-group img {
    height: 250px;
  }
}
</style>
