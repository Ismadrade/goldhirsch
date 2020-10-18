<template>
  <div class="bg-gradient-warning">
    <div class="container">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form @submit.prevent="salvar" class="user">
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input type="text"
                        class="form-control form-control-user"
                        id="exampleFirstName"
                        placeholder="First Name"
                        v-model="usuario.nome"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        id="exampleLastName"
                        placeholder="Last Name"
                        v-model="usuario.sobrenome"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Email Address"
                      v-model="usuario.email"
                    />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        v-model="usuario.senha"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Repeat Password"
                      />
                    </div>
                  </div>
                   <button
                    class="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </button>
                  <hr />
                  <a
                    href="index.html"
                    class="btn btn-google btn-user btn-block"
                  >
                    <i class="fab fa-google fa-fw"></i> Register with Google
                  </a>
                  <a
                    href="index.html"
                    class="btn btn-facebook btn-user btn-block"
                  >
                    <i class="fab fa-facebook-f fa-fw"></i> Register with
                    Facebook
                  </a>
                </form>
                <hr />
                <div class="text-center">
                  <a class="small" href="forgot-password.html"
                    >Forgot Password?</a
                  >
                </div>
                <div class="text-center">
                   <router-link to="/login">Already have an account? Login!</router-link>
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
import Usuario from '../../services/usuarios';
import * as firebase from "firebase/app";
import "firebase/auth";
export default {

  data(){
    return{
      usuario: {
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
      }
    }
  },

  methods:{
    salvar() {
        firebase.auth().createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha)
        .then( result => {
          console.log(result);
          Usuario.criar(this.usuario).then(resposta => {
            this.resposta = resposta;
            this.$toastr.s("Usuario cadastrado com sucesso!");
            this.$router.push('login')
          })
        }, error =>{
          this.$toastr.e(error.message, "Ocorreu um erro:");
        });
      }
    }
  }
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i");
</style>