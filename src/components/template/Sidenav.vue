<template>
<div class="teste">
    
      <v-navigation-drawer
        permanent
        expand-on-hover 
        dark        
        mini-variant-width="8vh"
        fixed
        width="300px"  
      >
        <v-list>       
          <v-list-item link>
            <v-list-item-avatar  size="50px" >
              <v-img src="@/assets/Ismael2.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">
                <span class="mr-5" v-if="loggedIn" >{{ loggedIn }}</span>
              </v-list-item-title>
              <v-list-item-subtitle v-if="getEmail">{{ getEmail }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
          flat
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item to="/lancamentos">
            <v-list-item-icon>
              <v-icon>fa fa-money</v-icon>
            </v-list-item-icon>
             <v-list-item-title>Lançamentos</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    
  </div>
</template>

<script>
export default {
     computed:{
       loggedIn(){
           let user = this.$store.getters.loggedIn;
           console.log("user: ", user.nome)
           console.log("user: ", user.sobrenome)
           return user.nome + " " + user.sobrenome
       },
       getEmail(){
          let user = this.$store.getters.loggedIn;
          console.log("user: ", user.sub)
          return user.sub
       }
   },
    data(){          
        return{
            user: ''
        } 
    }
    
};
</script>

<style>
.teste{
  z-index: 9999999;
}
</style>