import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'
import Layout from '../components/layout/Layout.vue'
import firebase from "firebase/app";
import "firebase/auth";
/* import store from '../store/store' */

Vue.use(Router);

 const openRoutes=['login', 'register']; 
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
       beforeEnter:((to, from, next) =>{
        firebase.auth().onAuthStateChanged(user => {
          if(openRoutes.includes(to.name)){
            next();
          }
          else if(user){
            next();   
          }else{
            localStorage.removeItem('usuario');
            next('/login');  
          }
        });   
      }) 
    }
  ]
})
export default router