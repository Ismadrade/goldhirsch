import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/login/Login.vue'
import Register from './components/login/Register.vue'
import Layout from './components/layout/Layout.vue'
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import firebase from "firebase/app";
Vue.use(VueRouter);

const config = {
  apiKey: "AIzaSyDQlcX71M5VJ772OvkUf4e0J-UGDty80lo",
  authDomain: "authenticationgoldhirsch.firebaseapp.com",
  databaseURL: "https://authenticationgoldhirsch.firebaseio.com",
  projectId: "authenticationgoldhirsch",
  storageBucket: "authenticationgoldhirsch.appspot.com",
  messagingSenderId: "339124633925",
  appId: "1:339124633925:web:09f87eeb4a9caccbe73e2c",
  measurementId: "G-DJDDLPXFZC"
};

firebase.initializeApp(config);

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
