import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'
import Layout from '../components/layout/Layout.vue'
import firebase from "firebase/app";
import "firebase/auth";

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
    }
  ]
})

const openRoutes=['login', 'register'];
let userLogado;
router.beforeEach( async (to, from, next)  =>{
  
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      console.log(user);
      userLogado = true;      
    }else{
      console.log("nao logado");
      userLogado = false;  
    }
  });

  console.log(userLogado)

  if(openRoutes.includes(to.name)){
    next();
  }else if(userLogado){
    next();
  }else{
    next('/login');
  }
})


export default router