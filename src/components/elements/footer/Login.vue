<template>
  <div class="login">
    <h2 v-if="site.isValid === 'admin'">Admin login</h2>
    <input
      type="text"
      name="username"
      placeholder="Username"
      autocomplete="email"
      :class="{
        invalid: isUsernameValid,
      }"
      v-model="email"
      @keyup="removeInvalidLoginFn"
      @keyup.enter="loginFn"
    /><br />
    <input
      type="password"
      name="password"
      placeholder="Password"
      autocomplete="current-password"
      :class="{
        invalid: isPasswordValid,
      }"
      v-model="password"
      @keyup="removeInvalidLoginFn"
      @keyup.enter="loginFn"
    />
    <div v-if="msg.login" class="validation-message">{{ msg.login }}</div>
    <br />
    <button @click.prevent="loginFn">
      <i
        v-if="spinLogin && spinGlobal"
        class="spin fa-sharp fa-solid fa-circle-notch"
      ></i>
      <span v-else>Log In</span>
    </button>
    <p></p>
    <button>Reset</button>
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
      if (this.email != '' && this.password != '') {
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
  },

  watch: {
    spinGlobal(newSpin, oldSpin) {
      if (newSpin == false) {
        this.spinLogin = false;
      }
    },
  },

  created() {},
};
</script>

<style>
.login button {
  width: 60px;
  padding: 3px;
}

.login input[type='text'],
.login input[type='password'] {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
