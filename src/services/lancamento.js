import { api } from './config'

export default {
  criarLancamento: (lancamento) => {
    return api.post('lancamentos/inserir-lancamento',lancamento);
  }
}