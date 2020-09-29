import { http } from './config'

export default {
  criar: (usuario) => {
    return http.post('usuarios',usuario);
  }
}