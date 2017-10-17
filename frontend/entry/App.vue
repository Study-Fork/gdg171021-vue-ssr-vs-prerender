<template>
  <div id="app">
    <nav class="navbar navbar-dark fixed-top navbar-expand justify-content-between bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/about">About</router-link>
          <router-link class="nav-item nav-link" to="/contact">Contact</router-link>
          <a class="nav-item nav-link" @click="login" v-if="!isLogin">Login</a>
          <a class="nav-item nav-link" @click="logout" v-else>Logout</a>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="footer">
      <div class="container">
        <p>© Company 2017</p>
      </div>
    </footer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isLogin: window.localStorage.getItem("login") === "true",
      }
    },
    methods: {
      login() {
        window.localStorage.setItem("login", "true")
        this.isLogin = true
      },
      logout() {
        window.localStorage.setItem("login", "false")
        this.isLogin = false
      },
    },
  }
</script>
