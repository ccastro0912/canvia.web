import { HTTP } from "../Http/Http"

const CONTROLLER = 'Customer';

export const ClienteRepository = {
    Get: async (idCustomer: number) => {
        return HTTP.GET(`${CONTROLLER}/Get`,{ params: { idCustomer }});
    },
    GetAll: async () => {
        return HTTP.GET(`${CONTROLLER}/GetAll`);
    },
    CrearActualizar: async (Cliente: any) => {
        return HTTP.POST(`${CONTROLLER}/CreateEdit`,Cliente,{});
    },
    GetAllCustomerPagination: async (PaginatorCustomer : any) =>{
        return HTTP.POST(`${CONTROLLER}/GetAllPagination`,PaginatorCustomer,{});
    }
}