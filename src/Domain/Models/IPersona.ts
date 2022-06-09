import { ITipoDocIdentidad } from "../Models/ITipoDocIdentidad"

export type IPersona = {
    pkid: number
    codigo: string
    tipoDocIdentidad: ITipoDocIdentidad
    docIdentidad: string
    email: string
    apellidoPaterno: string
    apellidoMaterno: string
    primerNombre: string
    segundoNombre: string
    activo: boolean
    fechaCumpleaños: string
    observacion: string
}