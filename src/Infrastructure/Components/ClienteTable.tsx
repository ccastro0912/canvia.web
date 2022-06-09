import React from "react";
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { ICliente } from "../../Domain/Models/ICliente";
import Paginator from "./Paginator";
import { IFilterCustomer } from "../../Domain/Models/IFilterCustomer";

interface IProps{
    Customers: Array<ICliente>
    SelectionCustomer: any
    FilterCustomer: IFilterCustomer
    ResponsePaginator: any
    Load: boolean
}

export default function ClienteTable(Props: IProps){

    const HandlePreviousLL = () => {
        Props.ResponsePaginator({
            ...Props.FilterCustomer,
            numeroPagina: 1,
            registrosPagina: 20,
            numeroPaginas: 0
        })
    }

    const HandlePrevious = () => {
        Props.ResponsePaginator({
            ...Props.FilterCustomer,
            numeroPagina: Props.FilterCustomer.numeroPagina - 1
        })
    }

    const HandleFollowing = () =>{
        Props.ResponsePaginator({
            ...Props.FilterCustomer,
            numeroPagina: Props.FilterCustomer.numeroPagina + 1
        })
    }

    const HandleFollowingLL = () =>{
        Props.ResponsePaginator({
            ...Props.FilterCustomer,
            numeroPagina: Props.FilterCustomer.numeroPaginas
        })
    }

    const OnRegistroChange = (Event : any) => {
        Props.ResponsePaginator({
            ...Props.FilterCustomer,
            registrosPagina: Event.value.registrosPagina
        })
    }

    const ActivoBodyTemplate = (Estado: boolean) => {
        return <p style={{textAlign: 'left'}}>{Estado ? "Si" : "No"}</p>
    }

    return(
        <div>
            <DataTable
                value = {Props.Customers}
                onSelectionChange={(Event) => Props.SelectionCustomer(Event.value.pkid)}
                selectionMode = "single"
                loading = {Props.Load}
                size="small" 
                responsiveLayout="scroll"
                emptyMessage = "No se encuentra ningún cliente registrado.">
                    <Column field="persona.codigo" header="Codigo"/>
                    <Column field="persona.apellidoPaterno" header="A. Paterno"/>
                    <Column field="persona.apellidoMaterno" header="A. Materno"/>
                    <Column field="persona.primerNombre" header="PrimerNombre"/>
                    <Column field="persona.segundoNombre" header="SegundoNombre"/>
                    <Column field="persona.tipoDocIdentidad.abreviacion" header="Tipo Doc. Identidad"/>
                    <Column field="persona.docIdentidad" header="Doc. Identidad"/>
                    <Column body={(Event) => ActivoBodyTemplate(Event.persona.activo)} header="Activo"/>
            </DataTable>
            <Paginator
                Paginado= {Props.FilterCustomer}
                HandlePreviousLL= {HandlePreviousLL}
                HandlePrevious= {HandlePrevious}
                HandleFollowing= {HandleFollowing}
                HandleFollowingLL= {HandleFollowingLL}
                OnRegistroChange= {OnRegistroChange}/>
        </div>
    )
}