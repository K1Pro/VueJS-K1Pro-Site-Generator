<template>
  <div class="footer">
    <div class="grid-container">
      <div class="grid-item">
        <p>
          {{ site.params.author }}<br /><br />
          {{ site.params.phone }}<br /><br />
          <a href="mailto:test@test.com">{{ site.params.email }}</a>
        </p>
      </div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item">
        <login> </login>
      </div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
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
  position: absolute;
  bottom: 0;
  width: 100vw;
  /* text-align: left;
    padding: 0vw 3vw;
    background-color: grey;
    color: white; */
}

.footer .grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  background-color: grey;
  /* padding: 10px; */
}

.footer .grid-item {
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  padding: 20px 20px;
  /* font-size: 30px; */
  text-align: left;
}

.footer input {
  padding: 5px;
}
</style>
