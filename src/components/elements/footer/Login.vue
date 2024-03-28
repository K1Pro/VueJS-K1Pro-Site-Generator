<template>
  <div
    class="login"
    :style="{ border: site.isValid === 'admin' ? '1px solid grey' : '0px' }"
  >
    <div
      class="login-title"
      v-if="site.isValid === 'admin' && !loggedIn"
      style="
        color: rgb(0, 0, 0);
        background-color: white;
        width: 270px;
        padding: 10px;
        border-bottom: 1px solid grey;
      "
    >
      <i style="font-size: 30px" class="ba-icons ba-k1pro-regular"></i>
      <span style="font-size: 18px">Pro - {{ appName }}</span>
    </div>

    <div
      class="login-body"
      :style="{
        width: site.isValid === 'admin' ? '250px' : 'auto',
        'background-color': site.isValid === 'admin' ? 'white' : '#FFFFFF00',
        padding: site.isValid === 'admin' ? '10px 20px 20px 20px' : '0',
      }"
    >
      <h2 v-if="!loggedIn && site.isValid !== 'admin'">Login</h2>
      <template v-if="site.isValid === 'admin'">
        <div class="login-icon">
          <i class="ba-icons ba-k1pro-sitegt"></i>
        </div>
        <h3>{{ site.params.site }}</h3>
      </template>

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
        :style="{
          width: site.isValid === 'admin' ? 'calc(100% - 14px)' : '100%',
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
        :style="{
          width: site.isValid === 'admin' ? 'calc(100% - 14px)' : '100%',
        }"
        @keyup="removeInvalidLoginFn"
        @keyup.enter="loginFn"
      />
      <button :disabled="loggedIn || spinLogin" @click.prevent="loginFn">
        <i v-if="spinLogin" class="spin fa-sharp fa-solid fa-circle-notch"></i>
        <span v-else>Log In</span>
      </button>
      <button @click="goToURL" type="button" :disabled="loggedIn">Reset</button>
      <div
        :style="{
          'margin-bottom': msg.login ? '0px' : '25px',
          padding: msg.login ? '5px' : '0px',
        }"
        class="validation-message"
      >
        {{ msg.login ? msg.login : '' }}
      </div>
      <div
        v-if="site.isValid === 'admin'"
        class="login-copyright"
        style="padding: 15px 0px 0px 0px; font-size: 12px"
      >
        © {{ new Date().getFullYear() }} K1Pro | All Rights Reserved
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
      'site',
      'endPts',
      'appName',
      'deleteCookie',
      'getLoginUser',
      'appName',
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
        this.msg.snackBar = 'Login error 2';
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
.login {
  border-radius: 5px;
}
.login-title {
  border-radius: 5px 5px 0px 0px;
}
.login-body {
  border-radius: 0px 0px 5px 5px;
}
.login-copyright,
.login h3 {
  text-align: center;
}
.login-icon {
  padding: 0px;
  font-size: 100px;
  /* width: 250px; */
  text-align: center;
}
.login-body button {
  width: 100%;
  padding: 3px;
  margin-bottom: 10px;
}

.login-body input[type='text'],
.login-body input[type='password'] {
  padding: 5px;
  margin-bottom: 10px;
}
</style>
