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
          <input type="text" placeholder="Name" v-model="msgName" />
          <input type="text" placeholder="Email" v-model="msgEmail" />
          <textarea rows="3" placeholder="Message" v-model="msgMessage"></textarea>
          <div class="footer-captcha">
            <img :src="endPts.captcha + msgDate + '.jpg'" />
            <button @click="updateCaptcha">
              <i class="fa-solid fa-arrows-rotate"></i>
            </button>
            <input type="text" placeholder="Verify captcha..." v-model="msgCaptcha" />
          </div>
          <button @click="postMsg">Send</button>
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
    return {
      msgName: '',
      msgEmail: '',
      msgMessage: '',
      msgCaptcha: '',
      msgDate:
        new Date().toLocaleString('en-UK', { year: 'numeric', timeZone: server_timezone }) +
        ('00' + new Date().toLocaleString('en-UK', { month: '2-digit', timeZone: server_timezone })).slice(-2) +
        ('00' + new Date().toLocaleString('en-UK', { day: '2-digit', timeZone: server_timezone })).slice(-2) +
        ('00' + new Date().toLocaleString('en-UK', { hour: '2-digit', timeZone: server_timezone })).slice(-2) +
        ('00' + new Date().toLocaleString('en-UK', { minute: '2-digit', timeZone: server_timezone })).slice(-2) +
        ('00' + new Date().toLocaleString('en-UK', { second: '2-digit', timeZone: server_timezone })).slice(-2),
    };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'message', 'referer', 'site', 'endPts']),
  },

  methods: {
    async postMsg() {
      try {
        const response = await fetch(this.endPts.servrURL + this.endPts.messages, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            Name: this.msgName,
            Email: this.msgEmail,
            Message: this.msgMessage,
            Captcha: this.msgCaptcha,
            Date: this.msgDate,
            Referer: this.referer,
          }),
        });
        const postMsgResJSON = await response.json();
        if (postMsgResJSON.success) {
        }
        console.log(postMsgResJSON);
        this.message = postMsgResJSON.messages[0];
      } catch (error) {
        console.log(error.toString());
        this.message = error.toString();
      }
    },
    updateCaptcha() {
      this.msgDate =
        new Date().toLocaleString('en-UK', { year: 'numeric', timeZone: server_timezone }) +
        ('00' + new Date().toLocaleString('en-UK', { month: '2-digit', timeZone: server_timezone })).slice(-2) +
        ('00' + new Date().toLocaleString('en-UK', { day: '2-digit', timeZone: server_timezone })).slice(-2) +
        ('00' + new Date().toLocaleString('en-UK', { hour: '2-digit', timeZone: server_timezone })).slice(-2) +
        ('00' + new Date().toLocaleString('en-UK', { minute: '2-digit', timeZone: server_timezone })).slice(-2) +
        ('00' + new Date().toLocaleString('en-UK', { second: '2-digit', timeZone: server_timezone })).slice(-2);
    },
  },

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

.footer-contact-container button {
  /* background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer; */
  padding: 3px;
  width: 60px;
}

.footer-captcha {
  width: 50%;
  position: relative;
  padding: 0px 1.25px;
}

.footer-captcha img {
  margin: 0px;
  width: 100%;
}

.footer-captcha button {
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
}

.footer-captcha input[type='text'] {
  margin-top: -5px;
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
    grid-template-columns: 0% 20% 25% 35% 20% 0%;
  }

  .footer-captcha {
    width: 75%;
    position: relative;
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
