import Lancamento from '../services/lancamento'

export default {
  state: {
    lancamentos: []
  },
  mutations: {
    SET_LANCAMENTOS(state, lancamento) {
      state.lancamentos = lancamento
    },
    DELETE_LANCAMENTO(state, lancamento){
      var index = state.lancamentos.findIndex(lanc => lanc.id == lancamento.id);
      state.lancamentos.splice(index, 1);
    },
    EDIT_LANCAMENTO(state, payload){
      var index = state.lancamentos.findIndex(l => l.id === payload.id);
      if(index !== -1) {
        state.lancamentos.splice(index, 1, payload);
    }    

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
    },  
    excluirLancamento( {commit}, lancamento){
      
        Lancamento.excluirLancamento(lancamento.id)
        commit('DELETE_LANCAMENTO', lancamento);

    },
    async editarLancamento({commit}, lancamento){
      let response = await Lancamento.editarLancamento(lancamento.id, lancamento);
      commit('EDIT_LANCAMENTO', response.data);
    }
  },  
}