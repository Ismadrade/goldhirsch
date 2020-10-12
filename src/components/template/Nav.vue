<template>
        <nav class="sb-topnav navbar navbar-inverse navbar-dark sb-new-blue">           
            <div class="navbar-header">
                <router-link to="/"><a class="navbar-brand" href="#">Meus Clientes</a></router-link>
                <button class="btn btn-link btn-sm order-1 order-lg-0 mt-0" id="sidebarToggle" href="#">
                    <i class="fa fa-bars"></i>
                </button>             
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li><a class="text-white mr-5" href="#" v-on:click="logout">Logout</a></li>            
            </ul>        
        </nav>       
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth"; 
export default {
   
    methods: {
        logout(){
            firebase.auth().signOut()
            .then( () => {
                console.log("Deslogado com sucesso!");

            }, error =>{
                console.log(error.message);
            })
        }
    }
};
</script>

<style>
</style>