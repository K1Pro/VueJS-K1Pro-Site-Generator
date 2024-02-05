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
    <div
      class="footer-container"
      :style="{
        'background-color':
          site.params.htmlElements[site.params.htmlElements.length - 1][
            'footer'
          ]['style']['backgroundColor'],
      }"
    >
      <div class="footer-item0"></div>
      <div
        v-for="(siteFooterItem, siteFooterIndex) in site.params.htmlElements[
          elIndex
        ].footer['footer-items']"
        :class="'footer-item' + Number(siteFooterIndex + 1)"
      >
        <select v-if="loggedIn">
          <option value="disabled" disabled selected>Choose type:</option>
          <option value="none">None</option>
          <template
            v-for="defaultFooterItem in content.defaultHtmlElements?.footer[
              'footer-items'
            ]"
          >
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
          <h2>About Us</h2>
          <p>
            {{ site.params.author }}<br />
            {{ site.params.phone }}<br />
            <a href="mailto:test@test.com">{{ site.params.email }}</a>
          </p></template
        >

        <template v-if="siteFooterItem == 'Description'">
          <h2>Description</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p></template
        >

        <template v-if="siteFooterItem == 'Contact Us'">
          <contact_us></contact_us
        ></template>

        <template v-if="siteFooterItem == 'Login'">
          <h2>Login</h2>
          <login> </login>
        </template>
      </div>
      <!-- <div class="footer-item2">

        <h2>About Us</h2>
        <p>
          {{ site.params.author }}<br />
          {{ site.params.phone }}<br />
          <a href="mailto:test@test.com">{{ site.params.email }}</a>
        </p>
      </div>

      <div class="footer-item3">
        <h2>Description</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>

      <div class="footer-item4">
        <contact_us></contact_us>
      </div>

      <div class="footer-item5">
        <h2>Login</h2>
        <login> </login>
      </div> -->

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
import Login from './footer/Login.vue';
import Contact_us from './footer/Contact_us.vue';

export default {
  name: 'Footer',

  components: {
    Login,
    Contact_us,
  },

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {};
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'site', 'content']),
  },

  methods: {},

  created() {
    // work on this
    // console.log(this.site.params.htmlElements[this.site.params.htmlElements.length - 1]);
    // this.site.params.htmlElements.forEach((htmlElement, index) => {
    //   Object.keys(htmlElement).forEach((htmlElementType) => {
    //     if (htmlElementType.includes('top-menu')) {
    //       this.topMenuPos = index;
    //       return (this.topMenu = true);
    //     }
    //   });
    // });
    // console.log(this.site.params);
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
.footer-item6 {
  padding: 10px 30px;
  text-align: left;
  word-wrap: break-word;
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* font-size: 30px; */
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
  .footer-container {
    grid-template-columns: 0% 20% 25% 35% 20% 0%;
  }

  .footer-item1,
  .footer-item6 {
    padding: 0px;
  }
}

@media only screen and (min-width: 1200px) {
  .footer-container {
    grid-template-columns: auto 15% 25% 25% 15% auto;
  }

  .footer-item1,
  .footer-item2,
  .footer-item3,
  .footer-item4,
  .footer-item5,
  .footer-item6 {
    padding: 10px 30px;
  }
}
</style>
