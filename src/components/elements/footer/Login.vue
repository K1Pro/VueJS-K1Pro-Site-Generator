<template>
  <div
    class="login"
    :style="{
      width: site.isValid === 'admin' ? '250px' : 'auto',
      height: site.isValid === 'admin' ? '300px' : 'auto',
    }"
  >
    <h2 v-if="!loggedIn && site.isValid !== 'admin'">Login</h2>
    <h2 v-if="site.isValid === 'admin'">{{ site.params.site }} Admin Login</h2>

    <input
      type="text"
      name="username"
      placeholder="Username"
      autocomplete="email"
      :disabled="loggedIn"
      :class="{
        invalid: isUsernameValid,
      }"
      :style="{
        width: site.isValid === 'admin' ? 'calc(100% - 14px)' : '100%',
      }"
      v-model="email"
      @keyup="removeInvalidLoginFn"
      @keyup.enter="loginFn"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      autocomplete="current-password"
      minlength="8"
      :disabled="loggedIn"
      :class="{
        invalid: isPasswordValid,
      }"
      :style="{
        width: site.isValid === 'admin' ? 'calc(100% - 14px)' : '100%',
      }"
      v-model="password"
      @keyup="removeInvalidLoginFn"
      @keyup.enter="loginFn"
    />
    <button :disabled="loggedIn || spinLogin" @click.prevent="loginFn">
      <i
        v-if="spinLogin && spinGlobal"
        class="spin fa-sharp fa-solid fa-circle-notch"
      ></i>
      <span v-else>Log In</span>
    </button>
    <button @click="goToURL" type="button" :disabled="loggedIn">Reset</button>
    <div v-if="msg.login" class="validation-message">{{ msg.login }}</div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      spinLogin: false,
      allInputsError: 'All inputs required',
      loginUsernameErr: 'Username cannot be blank',
      loginPasswordErr: 'Password cannot be blank',
      loginUsernamePasswordErr: 'Username or password is incorrect',
    };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'email',
      'password',
      'msg',
      'spinGlobal',
      'site',
      'endPts',
      'postLogin',
    ]),
    isUsernameValid() {
      return (
        this.msg.login.toLowerCase().includes('incorrect') ||
        (this.email.length < 1 &&
          (this.msg.login == this.allInputsError ||
            this.msg.login == this.loginUsernameErr))
      );
    },
    isPasswordValid() {
      return (
        this.msg.login.toLowerCase().includes('incorrect') ||
        (this.password.length < 1 &&
          (this.msg.login == this.allInputsError ||
            this.msg.login == this.loginPasswordErr))
      );
    },
  },

  methods: {
    loginFn() {
      if (
        this.email != '' &&
        this.password != '' &&
        this.password.length < 20
      ) {
        this.msg.login = '';
        this.spinLogin = true;
        this.postLogin();
      } else {
        if (this.email == '' && this.password == '') {
          this.msg.snackBar = this.allInputsError;
          this.msg.login = this.allInputsError;
        } else if (this.email == '') {
          this.msg.snackBar = this.loginUsernameErr;
          this.msg.login = this.loginUsernameErr;
        } else if (this.password == '') {
          this.msg.snackBar = this.loginPasswordErr;
          this.msg.login = this.loginPasswordErr;
        } else if (this.password.length >= 20) {
          this.email = '';
          this.password = '';
          this.msg.snackBar = this.loginUsernamePasswordErr;
          this.msg.login = this.loginUsernamePasswordErr;
        }
      }
    },
    removeInvalidLoginFn(event) {
      if (this.msg.login.toLowerCase().includes(event.target.name)) {
        if (event.target.value.length < 1) {
          event.target.classList.add('invalid');
        } else {
          event.target.classList.remove('invalid');
        }
      }
    },
    goToURL() {
      window.location.href = this.endPts.resetPasswordUrl;
    },
  },

  watch: {
    spinGlobal(newSpin, oldSpin) {
      if (newSpin == false) {
        this.spinLogin = false;
      }
    },
  },

  created() {
    console.log(this.endPts.resetPasswordUrl);
  },
};
</script>

<style>
.login button {
  width: 100%;
  padding: 3px;
  margin-bottom: 10px;
}

.login input[type='text'],
.login input[type='password'] {
  padding: 5px;
  margin-bottom: 10px;
}
</style>
