<template>
  <div class="login">
    <div class="login-title" v-if="isValid === 'admin' && !loggedIn">
      <i style="font-size: 30px" class="ba-icons ba-k1pro-regular"></i>
      <span style="font-size: 18px">Pro - {{ appName }}</span>
    </div>

    <h2 v-if="!loggedIn && isValid !== 'admin'">Login</h2>

    <div
      class="login-body"
      :style="{
        width: isValid === 'admin' ? '290px' : 'auto',
        padding: isValid === 'admin' ? '10px 20px 20px 20px' : '0',
      }"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        autocomplete="email"
        v-model="email"
        :disabled="loggedIn"
        :class="{
          invalid: isUsernameValid,
        }"
        @keyup="removeInvalidLoginFn"
        @keyup.enter="loginFn"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        autocomplete="current-password"
        minlength="8"
        v-model="password"
        :disabled="loggedIn"
        :class="{
          invalid: isPasswordValid,
        }"
        @keyup="removeInvalidLoginFn"
        @keyup.enter="loginFn"
      />

      <button :disabled="loggedIn || spinLogin" @click.prevent="loginFn">
        <i v-if="spinLogin" class="spin fa-sharp fa-solid fa-circle-notch"></i>
        <span v-else>Log In</span>
      </button>

      <button @click="goToURL" type="button" :disabled="loggedIn">Reset</button>

      <div class="login-remember" :style="{ opacity: loggedIn ? 0.5 : 1 }">
        <input type="checkbox" name="remember" :disabled="loggedIn" />Remember
        me?
      </div>

      <div
        :style="{
          'margin-bottom': msg.login ? '0px' : '35px',
          padding: msg.login ? '5px' : '0px',
        }"
        class="validation-message"
      >
        {{ msg.login ? msg.login : '' }}
      </div>

      <div v-if="isValid === 'admin'" class="login-copyright">
        © {{ server.fullDateTime.getFullYear() }} K1Pro | All Rights Reserved
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      spinLogin: false,
      allInputsError: 'Username and password required',
      loginUsernameErr: 'Username cannot be blank',
      loginPasswordErr: 'Password cannot be blank',
      loginUsernamePasswordErr: 'Username or password is incorrect',
    };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'sessionID',
      'accessToken',
      'loggedIn',
      'email',
      'password',
      'msg',
      'isValid',
      'site',
      'endPts',
      'appName',
      'deleteCookie',
      'getLoginUser',
      'appName',
      'server',
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

    async postLogin() {
      this.spinLogin = true;
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
            AddAuth: this.site.folderPath,
            Referer: this.endPts.url,
            AppName: this.appName,
          }),
        });
        const logInResJSON = await response.json();
        if (logInResJSON.success) {
          console.log('<-- Login Info -->');
          console.log(logInResJSON);
          this.accessToken = logInResJSON.data.accesstoken;
          this.sessionID = logInResJSON.data.session_id;
          this.getLoginUser();
          this.msg.login = '';
          this.msg.snackBar = 'Logged in';
        } else {
          this.deleteCookie();
          this.msg.login = logInResJSON.messages[0];
          this.msg.snackBar = logInResJSON.messages[0];
          if (logInResJSON.messages[0].toLowerCase().includes('incorrect')) {
            this.email = '';
            this.password = '';
          }
        }
        console.log(logInResJSON);
        this.spinLogin = false;
      } catch (error) {
        this.deleteCookie();
        console.log(error);
        this.msg.snackBar = 'Login error';
        this.spinLogin = false;
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
      window.location.href = this.endPts.accountResetURL;
    },
  },
};
</script>
<style>
.login-title {
  width: 290px;
  padding: 20px;
}
.login-body {
  text-align: center;
}
.login-body button {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
.login-body input[type='text'],
.login-body input[type='password'] {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
.login-remember {
  white-space: nowrap;
  overflow: hidden;
  padding: 6px;
  text-align: left;
  font-size: 12px;
  border-width: 1px;
  border-radius: 2px;
  border-style: solid;
  border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  background-color: white;
  margin-bottom: 10px;
}
.login-remember input {
  margin: 0px 5px 0px 0px;
}
.login-copyright {
  font-size: 12px;
  padding: 15px 0px 0px 0px;
}
</style>
