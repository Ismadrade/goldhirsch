import * as firebase from "firebase/app";
import "firebase/auth";
import Usuario from '../services/usuarios'
import { api } from '../services/config'


export default {
  state: {
    usuario: localStorage.getItem('usuario') || null,
    token: localStorage.getItem('token') || null,
  },
  getters: {
    loggedIn(state){
      return state.usuario;
    },
    getToken(state) {
      return state.token;
    }
  },
  mutations: {
    usuario(state, usuario) {
      state.usuario = usuario      
    },
    token(state, token){
      state.token = token
      if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}` 
      }
    }
  },
  actions: {
    logar (context, credentials) {
      return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.senha)
        .then(() => {
          Usuario.logar(credentials)
            .then(resp => {
              const usuario = {
                "id": resp.data.id,
                "nome": resp.data.nome,
                "sobrenome": resp.data.sobrenome,
                "email": resp.data.email
              }
              const token = JSON.stringify(resp.data.token)
              localStorage.setItem('usuario', JSON.stringify(usuario))
              localStorage.setItem('token', token)                 
              context.commit("usuario", JSON.stringify(usuario) )
              context.commit("token", token) 
              resolve(resp)     
            }, error =>{
              console.log(error)
            })            
        }, error =>{
            console.log(error.message);
          })
        .catch(err => {
          console.log(err);
          reject(err)
        })
      })
    },
  }
}
