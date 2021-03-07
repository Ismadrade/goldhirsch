import axios from 'axios'
import store from '../store/store'
import VueJwtDecode from 'vue-jwt-decode'
import { isEmpty } from 'lodash';
import {decryptData} from "../utils";


export const api = axios.create({
  baseURL: 'http://localhost:8080/'
})

api.interceptors.request.use( (request) => {  
  if (!isEmpty(localStorage.getItem('2'))) {
    const token = decryptData(localStorage.getItem('2'), process.env.VUE_APP_ROOT_SECRET_ENCRYPTION_SEQUENCE);
    console.log(token)
    request.headers.Authorization = `Bearer ${token}`
  }
  return request;
})

api.interceptors.response.use( (response) => {  
  return response;
}, error => {
const token = decryptData(localStorage.getItem('2'), process.env.VUE_APP_ROOT_SECRET_ENCRYPTION_SEQUENCE);
 const tokenDecoded = VueJwtDecode.decode(token);
 const expiration = new Date(tokenDecoded.exp * 1000);
 if(expiration < new Date()){
    store.dispatch("doLogout")
    this.$router.push("/login");
    return Promise.reject("Sessão Expirada!")
 }
 return error
})



