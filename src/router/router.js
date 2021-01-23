import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'
import Layout from '../components/layout/Layout.vue'
import Lancamentos from '../components/layout/lancamento/Lancamentos.vue'
import Dashboard from '../components/layout/dashboard/Dashboard.vue'


import store from '../store/store'
import { isEmpty } from 'lodash';
import {decryptData} from "../utils";

Vue.use(Router);

const router = new Router({
  routes: [
    { 
      path:'/login', 
      name: "login", 
      component: Login 
    },
    { 
      path:'/register', 
      name: 'register',
      component: Register 
    },
    { 
      path:'/', 
      name: 'index',
      component: Layout,
      children: [
        { path: '/lancamentos', component: Lancamentos },
        { path: '/', component: Dashboard }
      ],
       beforeEnter:((to, from, next) =>{
        const { isLoggedIn } = store.getters;
        
        const redirect = () => {
          next("/login");
        };

        const doLogin = (token) => {
          store.dispatch("doLogin", token);
          next();
        };
        
        if (to.path !== '/login' || to.path !== '/register') {
          if (isLoggedIn) {
            next();
          }else if (!isEmpty(localStorage.getItem('1')) && localStorage.getItem('1') === "true") {
            if (!isEmpty(localStorage.getItem('2'))) {
              const token = decryptData(localStorage.getItem('2'), process.env.VUE_APP_ROOT_SECRET_ENCRYPTION_SEQUENCE);
              doLogin(token);
            } else {
              redirect();
            }
          }
          else {
            redirect();
          }
        } else {
          isLoggedIn ? next({
            path: "/",
          }) : next();
        } 
      }) 
    }
  ]
})
export default router