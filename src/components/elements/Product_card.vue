<template>
  <div
    :name="elValue.name"
    :class="elKey"
    :style="{
      'padding-bottom': elValue.style['padding-bottom'] + 'px',
      'background-color': elValue.style.backgroundColor,
      'border-width': loggedIn ? '1px 1px 0px 1px' : 'none',
      'border-style': loggedIn ? 'dashed' : 'none',
      'border-color': loggedIn ? 'black' : 'none',
    }"
  >
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
          windowWidth > respWidth
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
            <img :src="productcard[0]" :alt="productcard[1]" />
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
      'windowWidth',
      'respWidth',
      'site',
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

  data() {
    return {
      menuChange: '',
    };
  },

  created() {
    console.log(this.elValue);
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
.product-card-group img {
  width: 100%;
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
</style>
