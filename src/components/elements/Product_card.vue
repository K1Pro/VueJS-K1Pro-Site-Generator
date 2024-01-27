<template>
  <div
    :name="elValue.name"
    :class="elKey"
    :style="{
      'padding-bottom': elValue.style['padding-bottom'] + 'px',
      'background-color': elValue.style.backgroundColor,
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
    <template v-for="(productcard, cardIndex) in elValue['product-card-items']">
      <div
        class="product-card-card"
        :style="{ 'background-color': elValue.style.cardColor }"
      >
        <img :src="productcard[0]" :alt="productcard[1]" style="width: 100%" />
        <div class="product-card-text">
          <div class="product-card-header">{{ productcard[1] }}</div>
          <p>
            {{ productcard[2] }}
          </p>
        </div>
      </div>
    </template>
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
.product-card-card {
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
  max-width: 250px;
  margin: auto;
  text-align: left;
  /* background-color: white; */
}
.product-card-text {
  padding: 12px;
}
.product-card-header {
  font-size: 30px;
}
</style>
