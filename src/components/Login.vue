<template>
  <div class="login">
    <template v-if="loggedIn == null"></template>
    <template v-else-if="loggedIn">
      <p>{{ this.user.Username }} is logged in</p>
      <button type="button" @click.prevent="deleteLogin">Log Out</button>
    </template>
    <template v-else>
      <input type="text" name="email" placeholder="Username" autocomplete="email" v-model="this.email" /><br /><br />
      <input
        type="password"
        name="password"
        minlength="8"
        placeholder="Password"
        v-model="this.password"
        @keyup.enter="postLogin"
      /><br /><br />
      <button type="button" @click.prevent="postLogin">Log In</button>
    </template>
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
    ]),
  },

  methods: {
    async postLogin() {
      try {
        const response = await fetch(this.endPts.loginURL + this.endPts.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            Email: this.email.toLowerCase(),
            Password: this.password,
            IP_Address: userIP,
          }),
        });
        const logInResJSON = await response.json();
        if (logInResJSON.success) {
          this.accessToken = logInResJSON.data.accesstoken;
          this.sessionID = logInResJSON.data.session_id;
          this.getLoginUser();
        } else {
          this.deleteCookie();
        }
        this.message = logInResJSON.messages[0];
      } catch (error) {
        this.error = error.toString();
        this.message = this.error;
      }
    },

    async deleteLogin() {
      try {
        const response = await fetch(this.endPts.loginURL + this.endPts.logout + this.sessionID, {
          method: 'DELETE',
          headers: {
            Authorization: this.accessToken,
            'Cache-Control': 'no-store',
          },
        });
        const logOutResJSON = await response.json();
        if (logOutResJSON.success) {
          this.deleteCookie();
        }
        this.message = logOutResJSON.messages[0];
      } catch (error) {
        this.error = error.toString();
        this.message = this.error;
      }
    },
  },

  watch: {
    accessToken(newToken, oldToken) {
      // console.log('new access token');
      //   this.userData = '';
      // this.loggedIn = false;
      //   if (newToken != undefined) this.getLoginUser(this.endPts.userData);
    },
  },

  created() {},
};
</script>

<style></style>
