import { api } from './config'

export default {
  criar: (usuario) => {
    return api.post('usuarios',usuario);
  },
  logar: (loginFormRequest) =>{
    return api.post('usuarios/logar', loginFormRequest )
  }
}