import { ClienteRepository } from '../../Infrastructure/Repositories/ClienteRepository'
import { ITipoDocIdentidad } from '../Models/ITipoDocIdentidad'
import { ICliente } from '../Models/ICliente'
import { IFilterCustomer } from '../Models/IFilterCustomer'

interface IErroresCliente{
    TipoDocIdentidad?: string
    DocIdentidad?: string
    ApePaterno?: string
    ApeMaterno?: string
    PNombre?: string
    Email?: string
}

const Get = (idCustomer : number) => {
    return ClienteRepository.Get(idCustomer);
}

const GetAll = () => {
    return ClienteRepository.GetAll();
}

const ValidarDocumentoIndentidad = (TipoDocIdentidad: ITipoDocIdentidad, Documento: string) => {
    let band: boolean = false
    if(Documento.length === TipoDocIdentidad.longitud) band = true
    return band
}

const ValidarSchema = (Cliente: ICliente) => {
    const errores : IErroresCliente = {}
    if(!Cliente.persona.tipoDocIdentidad.pkid){
        errores.TipoDocIdentidad = 'Tipo de documento es requerido'
        return errores
    }
    if(!Cliente.persona.docIdentidad) errores.DocIdentidad  = 'Documento de identidad es requerido'
    if(!ValidarDocumentoIndentidad(Cliente.persona.tipoDocIdentidad, Cliente.persona.docIdentidad)) errores.DocIdentidad  = 'Formato inválido de documento'
    if(!Cliente.persona.apellidoPaterno) errores.ApePaterno = 'Apellido paterno es requerido'
    if(!Cliente.persona.apellidoMaterno) errores.ApeMaterno = 'Apellido materno es requerido'
    if(!Cliente.persona.primerNombre) errores.PNombre = 'Nombre es requerido'
    if(!Cliente.persona.email) errores.Email = 'Correo electrónico es requerido'
    return errores
}

const CrearActualizar = (Cliente: ICliente) => {
    return ClienteRepository.CrearActualizar(Cliente);
}

const GetAllCustomerPagination = (FilterCustomer : IFilterCustomer) => {
    return ClienteRepository.GetAllCustomerPagination(FilterCustomer);
}

export const ClienteService = {
    Get,
    GetAll,
    ValidarSchema,
    CrearActualizar,
    GetAllCustomerPagination
}