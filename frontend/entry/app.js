import Vue from "vue"
import VueRouter from "vue-router"

import App from "./App.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  fallback: false,
  routes: [
    { path: "/", component: require("../pages/index.vue").default },
    { path: "/about", component: require("../pages/about.vue").default },
    { path: "/contact", component: require("../pages/contact.vue").default },
  ],
})
const app = new Vue({
  router,
  render: h => h(App),
})

app.$mount("#app")
