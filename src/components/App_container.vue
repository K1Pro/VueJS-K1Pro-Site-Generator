<template>
  <template v-for="(htmlElements, htmlIndex) in site.params.htmlElements">
    <template v-for="([elKey, elValue], elementIndex) in Object.entries(htmlElements)">
      <headline v-if="elKey == 'headline'" :elKey="elKey" :elValue="elValue" :elIndex="htmlIndex"></headline>
      <top_menu v-if="elKey == 'top-menu'" :elKey="elKey" :elValue="elValue" :elIndex="htmlIndex"></top_menu>
      <background_image
        v-if="elKey == 'background-image'"
        :elKey="elKey"
        :elValue="elValue"
        :elIndex="htmlIndex"
      ></background_image>
      <background_video
        v-if="elKey == 'background-video'"
        :elKey="elKey"
        :elValue="elValue"
        :elIndex="htmlIndex"
      ></background_video>
      <icon_slider v-if="elKey == 'icon-slider'" :elKey="elKey" :elValue="elValue" :elIndex="htmlIndex"></icon_slider>
      <product_card
        v-if="elKey == 'product-card'"
        :elKey="elKey"
        :elValue="elValue"
        :elIndex="htmlIndex"
      ></product_card>
    </template>
  </template>
  <foot></foot>
</template>

<script>
import Headline from './Headline.vue';
import Foot from './Footer.vue';
import Top_menu from './Top_menu.vue';
import Background_image from './Background_image.vue';
import Background_video from './Background_video.vue';
import Icon_slider from './Icon_slider.vue';
import Product_card from './Product_card.vue';

export default {
  name: 'App Container',

  components: {
    Headline,
    Foot,
    Top_menu,
    Background_image,
    Background_video,
    Icon_slider,
    Product_card,
  },

  computed: {
    // ...Pinia.mapStores(useSiteStore),
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },
};
</script>

<style></style>
