import Lancamento from '../services/lancamento'
export default{
  state: {
    lancamentos: localStorage.getItem('lancamentos') || null
  },
  getters: {
    
  },
  mutations: {
    lancamento(state, lancamento) {
      state.lancamentos = lancamento
    }
  },
  actions: {
    inserirLancamento(context, payload){
      return new Promise((resolve, reject) => {
        Lancamento.criarLancamento(payload)
          .then( resp => {
            const lancamento = JSON.stringify(resp.data)
            localStorage.setItem('lancamentos', lancamento)   
            context.commit("lancamento", lancamento ) 
            resolve(resp) 
          }, error =>{
            console.log(error.message);
          })
        .catch(err => {
          console.log(err);
          reject(err)
        })
      })
    },
    buscarLancamentos(context, payload){
      return new Promise((resolve, reject) => {
        Lancamento.buscarLancamento(payload)
          .then( resp => {
            const lancamento = JSON.stringify(resp.data)
            localStorage.setItem('lancamentos', lancamento)   
            context.commit("lancamento", lancamento ) 
            resolve(resp) 
          }, error =>{
            console.log(error.message);
          })
        .catch(err => {
          console.log(err);
          reject(err)
        })
      })
    }
  }
}