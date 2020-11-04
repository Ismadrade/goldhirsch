import { api } from './config'

export default {
  criarLancamento: (lancamento) => {
    return api.post('lancamentos/inserir-lancamento',lancamento);
  },
  buscarLancamento: (id) => {
    return api.get(`lancamentos?usuario=${id}`);
  },
  excluirLancamento: (id) => {
    return api.delete(`lancamentos/${id}`);
  },
  editarLancamento: (id, lancamento) => {
    return api.put(`lancamentos/${id}`, lancamento);
  }
}