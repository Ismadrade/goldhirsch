import Vue from 'vue';
import Vuex from 'vuex';

import User from './user'
import Lancamento from './lanc'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user: User,
    lanc: Lancamento
  }


})
