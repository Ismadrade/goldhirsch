<template>
        <nav class="sb-topnav navbar navbar-inverse navbar-dark sb-new-blue d-flex justify-content-between"> 
            <ul>
            </ul>          
            <ul class="nav navbar-nav navbar-right">
                <router-link to="/"><v-img src="@/assets/logo.png" width="160px" height="65px" position="center"/></router-link>          
            </ul>
            <ul class="nav navbar-nav ">
                <li><a class=" mr-5" href="#" v-on:click="logout" style="color: #777777 !important;"><i class="fa fa-power-off"></i></a></li>            
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
                this.$toastr.s("Usuario deslogado com sucesso!");

            }, error =>{
                this.$toastr.e(error.message, "Ocorreu um erro:");
            })
        }
    }
};
</script>

<style>
</style>