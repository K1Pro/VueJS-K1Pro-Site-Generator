<template>
  <div
    class="footer"
    :style="{
      top: '0px',
      color: site.params.htmlElements[site.params.htmlElements.length - 1]['footer']['style']['color'],
      'border-width': loggedIn ? '1px 1px 0px 1px' : '1px 0px 0px 0px',
      'border-style': loggedIn ? 'dashed' : 'solid',
      'border-color': loggedIn
        ? 'black'
        : site.params.htmlElements[site.params.htmlElements.length - 1]['footer']['style']['borderColor'],
    }"
  >
    <div
      class="footer-container"
      :style="{
        'background-color':
          site.params.htmlElements[site.params.htmlElements.length - 1]['footer']['style']['backgroundColor'],
      }"
    >
      <!-- :style="{'background-color': }"  next is here get order first of index-->
      <div class="footer-item1"></div>
      <div class="footer-item2">
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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </p>
      </div>

      <div class="footer-item4">
        <h2>Contact Us</h2>
        <div class="footer-contact-container">
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="email" placeholder="Email" />
          <textarea id="subject" name="subject" placeholder="Message" rows="3"></textarea>
          <input type="submit" value="Submit" />
        </div>
      </div>

      <template v-if="loggedIn">
        <div class="footer-item5">
          <h2>Modify Footer</h2>
          <div>
            Text Color: <br /><input
              type="color"
              v-model="site.params.htmlElements[site.params.htmlElements.length - 1]['footer']['style']['color']"
            />
          </div>
          <hr />
          <div>
            Background Color: <br /><input
              type="color"
              v-model="
                site.params.htmlElements[site.params.htmlElements.length - 1]['footer']['style']['backgroundColor']
              "
            />
          </div>
          <hr />
          <div>
            Border Color: <br /><input
              type="color"
              v-model="site.params.htmlElements[site.params.htmlElements.length - 1]['footer']['style']['borderColor']"
            />
          </div>
          <hr />
        </div>
      </template>
      <template v-else>
        <div class="footer-item5">
          <h2>Login</h2>
          <login> </login>
        </div>
      </template>
      <div class="footer-item6"></div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue';

export default {
  name: 'Footer',

  components: {
    Login,
  },

  data() {
    return {};
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'message',
      'hostname',
      'pathname',
      'windowWidth',
      'respWidth',
      'site',
    ]),
  },

  created() {
    // work on this
    console.log(this.site.params.htmlElements[this.site.params.htmlElements.length - 1]);
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

.footer-contact-container {
  box-sizing: border-box;
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

.footer input[type='submit'] {
  /* background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer; */
}

.footer input[type='submit']:hover {
  /* background-color: #45a049; */
}

.footer-contact-container {
  /* border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px; */
}

@media only screen and (min-width: 650px) {
  .footer-container {
    grid-template-columns: auto 15% 25% 25% 15% auto;
  }
}
</style>
