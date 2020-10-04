import * as firebase from "firebase/app";
import "firebase/auth";
import Usuario from '../services/usuarios'


export default {
  state: {
    usuario: localStorage.getItem('usuario') || null
  },
  getters: {
    loggedIn(state){
      return state.usuario;
    }
  },
  mutations: {
    usuario(state, usuario) {
      state.usuario = usuario
    }
  },
  actions: {
    logar (context, credentials) {
      return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.senha)
        .then(() => {
          Usuario.logar(credentials.email)
            .then(resp => {
              const usuario = JSON.stringify(resp.data)
              localStorage.setItem('usuario', usuario)   
              context.commit("usuario", usuario ) 
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