<template>
 <div class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between ">          
            <div>
           <router-link to="/"><a class="navbar-brand" href="#">Meus Clientes</a></router-link>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#">
                <i class="fa fa-bars"></i>
            </button>  
            </div> 
            <div>
                <span class="text-white mr-5" >Seja bem vindo {{ user }}</span>
                <a class="text-white mr-5" href="#" v-on:click="logout">Logout</a>            
            </div>        
        </nav>
 </div>        
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth"; 
export default {

    mounted(){    
         let local = JSON.parse(localStorage.getItem('usuario'))  
        console.log(local)  
        this.user  = 'teste'                
    },
    data(){          
        return{
            user: ''
        } 
    },
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