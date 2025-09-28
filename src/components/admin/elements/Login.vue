<template>
  <div :id="'site_page_el_' + elIndex" class="login-container">
    <div class="login">
      <div class="login-body">
        <div class="login-username">
          <i class="fa-solid fa-user"></i>
          <input type="text" placeholder="Username" class="loginInpts" autocomplete="username" />
        </div>

        <div class="login-password">
          <i class="fa-solid fa-key"></i>
          <input
            type="password"
            placeholder="Password"
            class="loginInpts"
            autocomplete="current-password"
            minlength="8"
          />
          <button style="color: grey">
            <span class="fa-solid fa-eye"></span>
          </button>
        </div>

        <button>
          <span>Log In</span>
        </button>

        <input type="submit" value="Reset" />

        <div class="login-remember">
          <input type="checkbox" name="remember" /><span style="user-select: none"> Remember me? </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
}
.login {
  width: 290px;
}
.login-title {
  position: relative;
  padding: 20px;
}
.login-body {
  padding: 10px 20px 20px 20px;
  text-align: center;
}
.login-body button,
.login-body input[type='submit'] {
  position: relative;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
.login-username {
  position: relative;
}
.login-password {
  position: relative;
}
.login-username i,
.login-password i {
  position: absolute;
  top: 7px;
  left: 7px;
  color: grey;
}
.login-password button {
  width: 30px;
  position: absolute;
  top: 2px;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;
}
.login-body input[type='text'],
.login-body input[type='password'] {
  width: 100%;
  padding: 5px 0px 5px 30px;
  margin-bottom: 10px;
}
.login-body select {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
.login-remember {
  position: relative;
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
</style>
