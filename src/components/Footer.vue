<template>
  <div class="footer" :style="{ top: loggedIn ? '75vh' : '0px' }">
    <div class="grid-container">
      <div class="item1">
        <p>
          {{ site.params.author }}<br /><br />
          {{ site.params.phone }}<br /><br />
          <a href="mailto:test@test.com">{{ site.params.email }}</a>
        </p>
      </div>
      <div class="item2"></div>
      <div class="item3"></div>
      <div class="item4">
        <login> </login>
      </div>
      <div class="item5"></div>
      <div class="item6"></div>
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
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'message', 'hostname', 'pathname', 'site']),
  },

  created() {
    // console.log(this.site.params);
  },
};
</script>

<style>
.footer {
  position: relative;
  width: 100%;
  /* text-align: left;
    padding: 0vw 3vw;
    background-color: grey;
    color: white; */
}

.footer input {
  padding: 5px;
}

.footer .grid-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  background-color: grey;
  /* padding: 10px; */
}

.footer .item1,
.footer .item2,
.footer .item3,
.footer .item4,
.footer .item5,
.footer .item6 {
  padding: 20px 20px;
  text-align: left;
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* font-size: 30px; */
}

@media only screen and (min-width: 650px) {
  .footer .grid-container {
    grid-template-columns: auto auto auto auto auto auto;
  }
}
</style>
