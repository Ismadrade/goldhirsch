<template>
 <div class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between ">          
            <div>
            <a class="navbar-brand" href="#">Meus Clientes</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#">
                <i class="fa fa-bars"></i>
            </button>  
            </div>         
            <a class="mr-5" href="#" v-on:click="logout">Logout</a>
        </nav>
 </div>        
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    methods: {
        logout(){
            firebase.auth().signOut()
            .then(resp => {
                console.log(resp);
                firebase.auth().onAuthStateChanged(user => {
                if(user){
                console.log(user.uid);
                }else{
                console.log("nao logado");
                }
            })
            }, error =>{
                console.log(error.message);
            })
        }
    }
};
</script>

<style>
</style>