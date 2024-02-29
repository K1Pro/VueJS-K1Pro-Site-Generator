<template>
  <div
    class="footer"
    :style="{
      top: '0px',
      color:
        site.params.htmlElements[site.params.htmlElements.length - 1]['footer'][
          'style'
        ]['color'],
      'border-width': loggedIn ? '1px 1px 0px 1px' : '1px 0px 0px 0px',
      'border-style': loggedIn ? 'dashed' : 'solid',
      'border-color': loggedIn
        ? 'black'
        : site.params.htmlElements[site.params.htmlElements.length - 1][
            'footer'
          ]['style']['borderColor'],
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
    <div
      class="footer-container"
      :style="{
        'background-color':
          site.params.htmlElements[site.params.htmlElements.length - 1][
            'footer'
          ]['style']['backgroundColor'],
        gridTemplateColumns: loggedIn ? gridTemplateLogIn : gridTemplateLogOut,
      }"
    >
      <div class="footer-item0"></div>
      <template
        v-for="(siteFooterItem, siteFooterIndex) in site.params.htmlElements[
          elIndex
        ].footer['footer-items']"
      >
        <div
          v-if="(!loggedIn && siteFooterItem != 'none') || loggedIn"
          :class="'footer-item' + Number(siteFooterIndex + 1)"
        >
          <select
            v-if="loggedIn"
            @change="changeOrder($event, siteFooterIndex)"
          >
            <!-- <option value="disabled" disabled selected>
              {{ content.htmlElements.footer['footer-items'][siteFooterIndex] }}
            </option> -->
            <option value="none">None</option>

            <template
              v-for="defaultFooterItem in content.htmlElements.footer[
                'footer-items'
              ]"
            >
              <option
                v-if="siteFooterItem == defaultFooterItem"
                :value="defaultFooterItem"
                selected
              >
                {{ defaultFooterItem.charAt(0).toUpperCase()
                }}{{ defaultFooterItem.slice(1).replaceAll('-', ' ') }}
              </option>
              <option
                v-if="siteFooterItem != defaultFooterItem"
                :value="defaultFooterItem"
              >
                {{ defaultFooterItem.charAt(0).toUpperCase()
                }}{{ defaultFooterItem.slice(1).replaceAll('-', ' ') }}
              </option>
            </template>
          </select>

          <template v-if="siteFooterItem == 'About Us'">
            <about_us></about_us>
          </template>

          <template v-if="siteFooterItem == 'Description'">
            <h2 v-if="!loggedIn">Description</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p></template
          >

          <template v-if="siteFooterItem == 'Contact Us'">
            <contact_us></contact_us
          ></template>

          <template v-if="siteFooterItem == 'Login'">
            <h2 v-if="!loggedIn">Login</h2>
            <login> </login>
          </template>

          <template v-if="siteFooterItem == 'Map'"> Map</template>

          <template v-if="siteFooterItem == 'Links'"> Links</template>

          <template v-if="siteFooterItem == 'none'"> None </template>
        </div>
      </template>
      <div
        :class="
          'footer-item' +
          Number(
            site.params.htmlElements[elIndex].footer['footer-items'].length + 1
          )
        "
      ></div>
    </div>
  </div>
</template>

<script>
import About_us from './footer/About_us.vue';
import Login from './footer/Login.vue';
import Contact_us from './footer/Contact_us.vue';

export default {
  name: 'Footer',

  components: {
    About_us,
    Login,
    Contact_us,
  },

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {};
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'windowWidth',
      'respWidth',
      'site',
      'content',
      'endPts',
    ]),

    gridTemplateLogIn() {
      const gridTemplateLogInStyle =
        this.windowWidth > this.respWidth.md
          ? '0% 16.66% 16.66% 16.66% 16.66% 16.66% 16.66% 0%'
          : '100%';
      return gridTemplateLogInStyle;
    },
    gridTemplateLogOut() {
      let gridTemplateLogOutStyle;
      if (
        this.windowWidth > this.respWidth.md &&
        this.windowWidth < this.respWidth.xl
      ) {
        const footerItemsNoNoneArr = this.site.params.htmlElements[
          this.elIndex
        ].footer['footer-items'].filter((el) => el !== 'none');
        const inner = (100 / footerItemsNoNoneArr.length).toFixed(2);
        const autos = `${inner}% `.repeat(footerItemsNoNoneArr.length);
        gridTemplateLogOutStyle = '0% ' + autos + ' 0%';
      } else if (this.windowWidth > this.respWidth.xl) {
        const footerItemsNoNoneArr = this.site.params.htmlElements[
          this.elIndex
        ].footer['footer-items'].filter((el) => el !== 'none');
        const inner = (80 / footerItemsNoNoneArr.length).toFixed(2);
        const autos = `${inner}% `.repeat(footerItemsNoNoneArr.length);
        gridTemplateLogOutStyle = '10% ' + autos + ' 10%';
      } else {
        gridTemplateLogOutStyle = '100%';
      }
      return gridTemplateLogOutStyle;
    },
  },

  methods: {
    changeOrder(event, siteFooterIndex) {
      console.log(event.srcElement.selectedOptions[0].value);
      console.log(siteFooterIndex);
      const replaceDuplicateFooteritems = this.site.params.htmlElements[
        this.elIndex
      ].footer['footer-items'].map((item) =>
        item == event.srcElement.selectedOptions[0].value ? 'none' : item
      );
      console.log(replaceDuplicateFooteritems);
      this.site.params.htmlElements[this.elIndex].footer['footer-items'] =
        replaceDuplicateFooteritems;
      this.site.params.htmlElements[this.elIndex].footer['footer-items'].splice(
        siteFooterIndex,
        1
      );
      this.site.params.htmlElements[this.elIndex].footer['footer-items'].splice(
        siteFooterIndex,
        0,
        event.srcElement.selectedOptions[0].value
      );
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
.footer {
  /* border-top: 1px solid rgba(0, 0, 0, 0.8); */
  position: relative;
  width: 100%;
  /* text-align: left;
    padding: 0vw 3vw;
    background-color: grey;
    color: white; */
}

.footer-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  /* background-color: grey; */
  /* padding: 10px; */
}

.footer-item0,
.footer-item1,
.footer-item2,
.footer-item3,
.footer-item4,
.footer-item5,
.footer-item6,
.footer-item7 {
  padding: 10px 30px;
  text-align: left;
  /* word-wrap: break-word; */
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* font-size: 30px; */
}

.footer-item0 h2,
.footer-item1 h2,
.footer-item2 h2,
.footer-item3 h2,
.footer-item4 h2,
.footer-item5 h2,
.footer-item6 h2,
.footer-item7 h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

.footer input[type='text'],
.footer input[type='password'],
.footer select,
.footer textarea {
  width: 100%;
  padding: 5px;
  /* border: 1px solid #ccc; */
  /* border-radius: 4px; */
  box-sizing: border-box;
  /* margin-top: 6px; */
  margin-bottom: 10px;
  resize: vertical;
}

.footer input[type='submit']:hover {
  /* background-color: #45a049; */
}

@media only screen and (min-width: 650px) {
  /* .footer-container {
    grid-template-columns: 0% 20% 25% 35% 20% 0%;
  } */

  .footer-item0,
  .footer-item7 {
    padding: 0px;
  }
}

@media only screen and (min-width: 1200px) {
  /* .footer-container {
    grid-template-columns: auto 15% 25% 25% 15% auto;
  } */

  .footer-item0,
  .footer-item1,
  .footer-item2,
  .footer-item3,
  .footer-item4,
  .footer-item5,
  .footer-item6,
  .footer-item7 {
    padding: 10px 30px;
  }
}
</style>
