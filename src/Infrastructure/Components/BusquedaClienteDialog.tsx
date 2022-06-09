import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ClienteTable from "./ClienteTable";
import { ICliente } from "../../Domain/Models/ICliente";
import { IFilterCustomer } from "../../Domain/Models/IFilterCustomer";

interface IProps{
    Visible: boolean
    CloseDialog: any
    Customers: Array<ICliente>
    SelectionCustomer: any
    ResponsePaginator: any
    FilterCustomer: IFilterCustomer
    Load: boolean
}

export default function BusquedaClienteDialog(Props: IProps){

    const [FilterCustomer, setFilterCustomer] = useState(Props.FilterCustomer);

    useEffect(() => {
        setFilterCustomer(Props.FilterCustomer);
    },[Props.FilterCustomer]);

    const HandleChange = (Event: any) => {
        setFilterCustomer({
            ...FilterCustomer,
            [Event.target.name]: Event.target.value
        })
    }

    const OnClickAdaptFiltro = (Event : any) => {
        Props.ResponsePaginator(FilterCustomer);
    }

    return(
        <Dialog
            visible={Props.Visible}
            style={{width: '1040px'}}
            header="Todos los clientes"
            modal
            onHide={Props.CloseDialog}>
                <div className="p-fluid">
                    <div className="grid">
                        <div className="col-12">
                            <h4>Filtros</h4>
                            <div className="p-fluid">
                                <div className="grid">
                                    <div className="col-12 md:col-6 lg:col-2">
                                        <label htmlFor="Codigo">Codigo</label>
                                        <InputText
                                            value={FilterCustomer.fil_Codigo}
                                            onChange={HandleChange}
                                            name="fil_Codigo"/>
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-2">
                                        <label htmlFor="DocIdentidad">Doc. Identidad</label>
                                        <InputText
                                            value={FilterCustomer.fil_DocIdentidad}
                                            onChange={HandleChange}
                                            name="fil_DocIdentidad"/>
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-3">
                                        <label htmlFor="Apellido">Apellido</label>
                                        <InputText
                                            value={FilterCustomer.fil_Apellidos}
                                            onChange={HandleChange}
                                            name="fil_Apellidos"/>
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-3">
                                        <label htmlFor="Nombre">Nombre</label>
                                        <InputText
                                            value={FilterCustomer.fil_Nombres}
                                            onChange={HandleChange}
                                            name="fil_Nombres"/>
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-2">
                                        <div className="p-d-flex p-mt-3">
                                            <label htmlFor="AdaptFiltro">Adapt Filtro</label>
                                            <Button
                                                type="button"
                                                label="Ir"
                                                className="p-button-sm"
                                                onClick={OnClickAdaptFiltro}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <ClienteTable
                                Customers = {Props.Customers}
                                SelectionCustomer = {Props.SelectionCustomer}
                                FilterCustomer = {Props.FilterCustomer}
                                ResponsePaginator = {Props.ResponsePaginator}
                                Load = {Props.Load}/>
                        </div>
                    </div>
                </div>
        </Dialog>
    )
}