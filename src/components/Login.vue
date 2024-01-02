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
    <button type="button" @click.prevent="loginFn">
      <i v-if="spinLogin && spinGlobal" class="spin fa-sharp fa-solid fa-circle-notch"></i> Log In</button
    ><br /><br />
    <button type="button">Reset</button>
    <!-- </template> -->
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return { spinLogin: false };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'accessToken',
      'sessionID',
      'loggedIn',
      'email',
      'password',
      'message',
      'spinGlobal',
      'site',
      'user',
      'endPts',
      'deleteCookie',
      'getLoginUser',
      'postLogin',
    ]),
  },

  methods: {
    loginFn() {
      this.spinLogin = true;
      this.postLogin();
    },
  },

  watch: {
    accessToken(newToken, oldToken) {
      console.log('token changed');
    },
    spinGlobal(newSpin, oldSpin) {
      if (newSpin == false) {
        this.spinLogin = false;
      }
    },
  },

  created() {},
};
</script>

<style></style>
