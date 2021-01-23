import Usuario from '../services/usuarios'
import { api } from '../services/config'
import {encryptData} from "../utils";

var pick = require("lodash/pick");

export const getUserFromToken = (token) => {
  let user = null;

  if (/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token)) {

    const base64Url = token.split('.')[1];
    const decoded = Buffer.from(base64Url, 'base64').toString();

    user = pick(JSON.parse(decoded), ["sub","nome", "sobrenome", "idUsuario"]);
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
      return state.user;
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
    async logarUsuario (context, credentials) {
      let usuario = await Usuario.logar(credentials);
    
      console.log("token", usuario.data.token);
      console.log("env ",  process.env.VUE_APP_ROOT_SECRET_ENCRYPTION_SEQUENCE)

      localStorage.setItem('1', "true");
      localStorage.setItem('2', encryptData(usuario.data.token, process.env.VUE_APP_ROOT_SECRET_ENCRYPTION_SEQUENCE));

      context.commit("setUser", getUserFromToken(usuario.data.token));
      context.commit("setLogged", true);
    },
    async doLogin (context, token){
      context.commit("setUser", getUserFromToken(token));
      context.commit("setLogged", true);
    },
    doLogout(context) {
      console.log("Logging out...");
      localStorage.removeItem('1');
      localStorage.removeItem('2');
      context.commit("setUser", null);
      context.commit("setLogged", false);
    }


  }
}
