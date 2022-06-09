import { HTTP } from "../Http/Http"

const CONTROLLER = 'User';

export const UsuarioRepository = {
    Auntenticar: async (body : any) => {
        return HTTP.POST(CONTROLLER + '/Autenticate',body,{})
    }
}