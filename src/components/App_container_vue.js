import Headline from './elements/Headline_vue.js';
import Foot from './elements/Footer_vue.js';
import Top_menu from './elements/Top_menu_vue.js';
import Background_image from './elements/Background_image_vue.js';
import Background_video from './elements/Background_video_vue.js';
import Icon_slider from './elements/Icon_slider_vue.js';
import Product_card from './elements/Product_card_vue.js';
import Blog_menu from './elements/blog/Menu_vue.js';
import Subscribe from './elements/blog/Subscribe_vue.js';

export default {
  name: 'App Container',

  template: /*html*/ `
    <template v-for="(htmlElements, htmlIndex) in site.params.htmlElements">
      <template
        v-for="([elKey, elValue], elementIndex) in Object.entries(htmlElements)"
      >
        <template v-if="isValid === 'true' || isValid === 'blog'">
          <top_menu
            v-if="elKey == 'top-menu' && elValue.enabled"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></top_menu>
        </template>
        <template v-if="isValid === 'true'">
          <headline
            v-if="elKey == 'headline' && elValue.enabled"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></headline>
          <background_image
            v-if="elKey == 'background-image' && elValue.enabled"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></background_image>
          <background_video
            v-if="elKey == 'background-video' && elValue.enabled"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></background_video>
          <icon_slider
            v-if="elKey == 'icon-slider' && elValue.enabled"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></icon_slider>
          <product_card
            v-if="elKey == 'product-card' && elValue.enabled"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></product_card>
          <foot
            v-if="elKey == 'footer' && elValue.enabled"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="htmlIndex"
          ></foot>
        </template>
      </template>
    </template>
    <template v-if="isValid === 'blog'">
      <blog_menu></blog_menu>
      <div class="blog-content">Here is your blog content</div>
      <subscribe></subscribe>
    </template>
  `,

  components: {
    Headline,
    Foot,
    Top_menu,
    Background_image,
    Background_video,
    Icon_slider,
    Product_card,
    Blog_menu,
    Subscribe,
  },

  computed: {
    // ...Pinia.mapStores(useSiteStore),
    ...Pinia.mapWritableState(useSiteStore, ['isValid', 'site']),
  },

  mounted() {
    style(
      'App-Container',
      /*css*/ `
.blog-content {
  position: relative;
  padding: 10px;
}
      `
    );
  },
};
