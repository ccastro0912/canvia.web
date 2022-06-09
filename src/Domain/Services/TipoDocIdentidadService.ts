import { TipoDocIdentidadRepository } from '../../Infrastructure/Repositories/TipoDocIdentidadRepository'

export const TipoDocIdentidadService = {
    Listar: () => {
        return TipoDocIdentidadRepository.Listar()
    },
}