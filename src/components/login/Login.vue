<template>
<div class="bg-gradient-primary">
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form @submit.prevent="logar" class="user">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="inputEmail"
                        v-model="usuario.email"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="inputPassword"
                        v-model="usuario.senha"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck"
                        />
                        <label class="custom-control-label" for="customCheck"
                          >Remember Me</label
                        >
                      </div>
                    </div>
                  <button
                    class="btn btn-primary btn-user btn-block"
                    id="btnLogin"
                  >
                    Login
                  </button>
                  </form>
                  <hr />

                  <div class="text-center">
                    <a class="small" href="forgot-password.html"
                      >Forgot Password?</a
                    >
                  </div>
                  <div class="text-center">
                    <router-link to="/register">Create an Account!</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>	
</template>

<script>
import "./login.css";
import "firebase/auth";
import { mapActions } from 'vuex';
export default {
  name: 'login',
  data(){
    return{
      usuario: {
        email: '',
        senha: ''
      }
    }
  },
  methods:{
    ...mapActions(['logarUsuario', "doLogin"]),
   logar() {
     this.$store.dispatch("logar", {
       email: this.usuario.email,
       senha: this.usuario.senha
     })
     .then( (resp) => {
       this.doLogin(resp.data.token);
       this.$toastr.s("Usuario logado com sucesso!");
       this.$router.push('/')
     })
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i");
</style>