<template>
  <div class="login">
    <template v-if="loggedIn == null"></template>
    <!-- <template v-else-if="loggedIn">
      <p>{{ this.user.Username }} is logged in</p>
      <button type="button" @click.prevent="deleteLogin">Log Out</button>
    </template>
    <template v-else> -->
    <input type="text" name="email" placeholder="Username" autocomplete="email" v-model="email" /><br />
    <input
      type="password"
      name="password"
      minlength="8"
      placeholder="Password"
      v-model="password"
      @keyup.enter="postLogin"
    /><br />
    <button type="button" @click.prevent="postLogin">Log In</button>
    <!-- </template> -->
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {};
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'accessToken',
      'sessionID',
      'loggedIn',
      'email',
      'password',
      'message',
      'site',
      'user',
      'endPts',
      'deleteCookie',
      'getLoginUser',
      'postLogin',
    ]),
  },

  methods: {},

  watch: {
    accessToken(newToken, oldToken) {
      console.log('token changed');
    },
  },

  created() {},
};
</script>

<style></style>
