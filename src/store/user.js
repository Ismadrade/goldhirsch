import * as firebase from "firebase/app";
import "firebase/auth";
import Usuario from '../services/usuarios'
import { api } from '../services/config'
import {encryptData} from "../utils";

var pick = require("lodash/pick");

export const getUserFromToken = (token) => {
  let user = null;

  if (/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token)) {

    const base64Url = token.split('.')[1];
    const decoded = Buffer.from(base64Url, 'base64').toString();

    user = pick(JSON.parse(decoded), ["sub","nome", "sobrenome"]);
  }

  console.log(user);

  return user
};



export default {
  state: {
    usuario: localStorage.getItem('usuario') || null,
    token: localStorage.getItem('token') || null,
    user: null,
    logged: false,
  },
  getters: {
    loggedIn(state){
      return state.usuario;
    },
    getToken(state) {
      return state.token;
    },
    isLoggedIn(state) {
      return state.logged;
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
    },
    setLogged(state, updatedState) {
      state.logged = updatedState;
    },

    setUser(state, updatedState) {
      state.user = updatedState;
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

    doLogin(context, token) {
      console.log("token", token);
      console.log("env ",  process.env.VUE_APP_ROOT_SECRET_ENCRYPTION_SEQUENCE)

      localStorage.setItem('1', "true");
      localStorage.setItem('2', encryptData(token, process.env.VUE_APP_ROOT_SECRET_ENCRYPTION_SEQUENCE));

      context.commit("setUser", getUserFromToken(token));
      context.commit("setLogged", true);
    },

  }
}
