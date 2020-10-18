<template>
    <div id="layoutSidenav_nav">
      <nav class="sb-sidenav accordion sb-sidenav-primary" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
          <div class="nav">
            <div class="sb-sidenav-menu-heading">Sistema</div>
            <a class="nav-link" href="index.html"
              ><div class="sb-nav-link-icon">
                <i class="fa fa-tachometer-alt"></i>
              </div>
              Dashboard</a
            >
            <div class="sb-sidenav-menu-heading">Lançamento</div>
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
              ><div class="sb-nav-link-icon">
                <i class="fa fa-search"></i>
              </div>
              Consultar
              </a>            
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
              ><div class="sb-nav-link-icon">
                <i class="fa fa-money"></i>
              </div>
              Cadastrar
              </a> 
          </div>
        </div>
        <div class="sb-sidenav-footer text-white">
          <div class="small">Logged in as:</div>
          <span class="mr-5" v-if="loggedIn" >{{ loggedIn }}</span>
        </div>                                          
      </nav>
    </div>
</template>

<script>
export default {
     computed:{
       loggedIn(){
           let user = JSON.parse(this.$store.getters.loggedIn);
           console.log("user: ", user.nome)
           return user.nome + " " + user.sobrenome
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
</style>