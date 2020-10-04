import { api } from './config'

export default {
  criar: (usuario) => {
    return api.post('usuarios',usuario);
  }
}