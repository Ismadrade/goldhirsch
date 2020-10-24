import Lancamento from '../services/lancamento'

export default {
  state: {
    lancamentos: []
  },
  mutations: {
    SET_LANCAMENTOS(state, lancamento) {
      state.lancamentos = lancamento
    }
  },
  actions: {
    inserirLancamento(context, payload){
      return new Promise((resolve, reject) => {
        Lancamento.criarLancamento(payload)
          .then( resp => {                        
            resolve(resp) 
          })
          .catch(err => {
          console.log(err);
          reject(err)
        })
      })
    },
    async buscarLancamentos({commit}, payload){
        let response = await Lancamento.buscarLancamento(payload);
        console.log(response.data);
        commit('SET_LANCAMENTOS', response.data);
    }
  }
}