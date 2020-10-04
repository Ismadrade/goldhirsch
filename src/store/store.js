import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    authenticated: false
   
  },

  mutations: {
    setAuthentication(state, status){
      state.authenticated = status;
    }
  }

}) 
