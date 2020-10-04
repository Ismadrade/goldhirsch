import { api } from './config'

export default {
  criar: (usuario) => {
    return api.post('usuarios',usuario);
  },
  logar: (email) =>{
    return api.post('usuarios/logar?email=' + email )
  }
}