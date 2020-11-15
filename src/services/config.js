import axios from 'axios'
import store from '../store/store'
import VueJwtDecode from 'vue-jwt-decode'
import * as firebase from "firebase/app";
import "firebase/auth"; 


export const api = axios.create({
  baseURL: 'http://localhost:8080/'
})

api.interceptors.response.use( (response) => {
  return response;
}, error => {
 const token = JSON.parse(store.getters.getToken);
 const tokenDecoded = VueJwtDecode.decode(token);
 const expiration = new Date(tokenDecoded.exp * 1000);
 if(expiration < new Date()){
    firebase.auth().signOut()
    return Promise.reject("Sessão Expirada!")
 }
 console.log('token', expiration)
 return error
})



