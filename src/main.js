import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/login/Login.vue'
import Register from './components/login/Register.vue'
import Layout from './components/layout/Layout.vue'
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import "./main.css"



Vue.use(VueRouter);

const routes = [
  { path:'/login', component: Login },
  { path:'/register', component: Register },
  { path:'/', component: Layout }
];

const router = new VueRouter({
  routes
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
