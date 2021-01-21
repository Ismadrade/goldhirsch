import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import "primeicons/primeicons.css"
import "primevue/resources/primevue.min.css"
import "primevue/resources/themes/saga-blue/theme.css"
import firebase from "firebase/app";
import store from './store/store'
import VueToastr from "vue-toastr";
import VueJwtDecode from 'vue-jwt-decode'
import vuetify from '@/plugins/vuetify'
import VuetifyMoney from "vuetify-money";





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
Vue.config.productionTip = false
Vue.prototype.$primevue = {ripple: true};

Vue.use(VueToastr, {
  defaultPosition: "toast-top-right",
  clickClose: true,
  defaultClassNames: ["animated", "zoomInUp"]
});
Vue.use(VuetifyMoney);




new Vue({
  router,
  store,
  VueJwtDecode,
  vuetify,
  render: h => h(App),
}).$mount('#app')
