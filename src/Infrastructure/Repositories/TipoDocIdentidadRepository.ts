import { HTTP } from "../Http/Http"

const CONTROLLER = 'IdentityDocument';

export const TipoDocIdentidadRepository = {
    Listar: async () => {
        return HTTP.GET(`${CONTROLLER}/GetAll`)
    }
}