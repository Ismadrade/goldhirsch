import Lancamento from '../services/lancamento'

export default {
  state: {
    lancamentos: [],
    lucroMensal: 0.00,
    gastoMensal: 0.00,
    valorConta: 0.00
  },
  getters: {
    lucroMensal(state){
      return state.lucroMensal;
    },
    gastoMensal(state){
      return state.gastoMensal;
    },
    valorConta(state){
      return state.valorConta;
    }
  },
  mutations: {
    SAVE_LANCAMENTOS(state, lancamento) {
      state.lancamentos.push(lancamento);
    },
    SET_LANCAMENTOS(state, lancamento) {
      state.lancamentos = lancamento
    },
    DELETE_LANCAMENTO(state, lancamento){
      var index = state.lancamentos.findIndex(lanc => lanc.id == lancamento.id);
      state.lancamentos.splice(index, 1);
    },
    EDIT_LANCAMENTO(state, payload){
      var index = state.lancamentos.findIndex(l => l.id === payload.id);  
      state.lancamentos.splice(index, 1, payload);        
    },
    LUCRO_MENSAL(state, lancamentos){
      let currentMonth = new Date().getMonth();
      let currentYear = new Date().getFullYear();
      let lucro = lancamentos
                    .filter(lancamento => lancamento.calendario.codigo === currentMonth && lancamento.ano === currentYear  && lancamento.tipo === "RECEITA")
                    .reduce((acc, lancamento) => acc + lancamento.valor, 0);                   
      state.lucroMensal = lucro;
    },
    GASTO_MENSAL(state, lancamentos){
      let currentMonth = new Date().getMonth();
      let currentYear = new Date().getFullYear();
      let gasto = lancamentos
                    .filter(lancamento => lancamento.calendario.codigo === currentMonth && lancamento.ano === currentYear && lancamento.tipo === "DESPESA" )
                    .reduce((acc, lancamento) => acc + lancamento.valor, 0);                      
      state.gastoMensal = gasto;
    },
    VALOR_CONTA(state, lancamentos){
      let receita = lancamentos
                      .filter(lancamento => lancamento.tipo === "RECEITA" )
                      .reduce((acc, lancamento) => acc + lancamento.valor, 0);               
      let despesa = lancamentos
                      .filter(lancamento => lancamento.tipo === "DESPESA" )
                      .reduce((acc, lancamento) => acc + lancamento.valor, 0);                      
      console.log("receita: ", receita);
      console.log("despesa: ", despesa);                 
      state.valorConta = receita - despesa;
    }
  },
  actions: {
    async inserirLancamento({commit} , payload){
      let response = await Lancamento.criarLancamento(payload);
      commit('SAVE_LANCAMENTOS', response.data);
    },
    async buscarLancamentos({commit}, payload){
      let response = await Lancamento.buscarLancamento(payload);
      console.log(response.data)
      commit('SET_LANCAMENTOS', response.data);
      commit('LUCRO_MENSAL', response.data);
      commit('GASTO_MENSAL', response.data);
      commit('VALOR_CONTA', response.data);
    },  
    excluirLancamento( {commit}, lancamento){      
      Lancamento.excluirLancamento(lancamento.id);
      commit('DELETE_LANCAMENTO', lancamento);
    },
    async editarLancamento({commit}, lancamento){
      await Lancamento.editarLancamento(lancamento.id, lancamento);
      commit('EDIT_LANCAMENTO', lancamento);
    },
  },  
}