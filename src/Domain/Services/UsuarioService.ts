import { UsuarioRepository } from '../../Infrastructure/Repositories/UsuarioRepository'
import { ICredencial } from '../Models/ICredencial'

export const UsuarioService = {
    Autenticar: (body : ICredencial) => {
        return UsuarioRepository.Auntenticar(body)
    },
}