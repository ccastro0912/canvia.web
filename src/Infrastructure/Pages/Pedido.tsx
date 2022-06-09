import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import BusquedaClienteDialog from "../Components/BusquedaClienteDialog";
import { ClienteService } from "../../Domain/Services/ClienteService";
import { ICliente } from "../../Domain/Models/ICliente";
import { IFilterCustomer } from "../../Domain/Models/IFilterCustomer";
import { InputTextarea } from "primereact/inputtextarea";

interface IProps{

}

interface IState{
    DialogBusquedaCliente: boolean
    FilterCustomer: IFilterCustomer
    Customers: Array<ICliente>
    Customer: ICliente
}

export default class Pedido extends React.Component<IProps, IState>{

    cFilterCustomer = {
        numeroPagina : 1,
        registrosPagina : 5,
        numeroPaginas : 0,
        fil_Codigo: '',
        fil_DocIdentidad: '',
        fil_Apellidos: '',
        fil_Nombres: ''
    }

    cCustomer: ICliente = {
        pkid: 0,
        persona:{
            pkid: 0,
            codigo: "",
            tipoDocIdentidad: {
                pkid: 0,
                codigo: "",
                descripcion: "",
                longitud: 0,
                abreviacion: "",
            },
            docIdentidad: "",
            email: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            primerNombre: "",
            segundoNombre: "",
            activo: false,
            fechaCumpleaños: "",
            observacion: "",
        }
    }

    constructor(props: any){
        super(props);
        this.state = {
            DialogBusquedaCliente: false,
            FilterCustomer: this.cFilterCustomer,
            Customers: [],
            Customer: this.cCustomer
        }
    }

    OnClickSearchCustomer = () =>{
        this.setState({
            DialogBusquedaCliente : !this.state.DialogBusquedaCliente
        },() => {
            if(this.state.DialogBusquedaCliente) this.GetAllCustomerPagination();
        });
    }

    GetAllCustomerPagination = () => {
        ClienteService.GetAllCustomerPagination(this.state.FilterCustomer)
        .then((data : any) => {
            if(data.success){
                this.setState({
                    Customers: data.data.customers,
                    FilterCustomer: data.data.filter
                })
            }else{
                this.setState({ Customers : []});
            }
        })
        .catch( error => {
            alert(error)
        })
    }

    SelectionCustomer = (IdCustomer: number) => {
        ClienteService.Get(IdCustomer)
        .then( (data : any) => {
            if(data.success){
                this.setState({
                    DialogBusquedaCliente: false,
                    Customer: data.data})
            } else throw data.mensaje;
        })
        .catch( error => {
            alert(error)
        })
    }

    ResponsePaginatorCustomer = (FilterCustomer: IFilterCustomer) => {
        this.setState({
            FilterCustomer: FilterCustomer
        }, () => this.GetAllCustomerPagination());
    }

    render(){
        return(
            <div className="Container">
                <div className="p-col-12">
                    <BusquedaClienteDialog
                        Visible={this.state.DialogBusquedaCliente}
                        CloseDialog={this.OnClickSearchCustomer}
                        Customers = {this.state.Customers}
                        SelectionCustomer = {this.SelectionCustomer}
                        ResponsePaginator = {this.ResponsePaginatorCustomer}
                        FilterCustomer = {this.state.FilterCustomer}
                        Load = {false}/>
                    <div className="p-card">
                        <div className="p-card-body">
                            <div className="p-card-title">Datos del cliente</div>
                            <div className="p-card-content">
                                <div className="p-fluid">
                                    <div className="grid">
                                        <div className="col-12 md:col-6">
                                            <label>Código</label>
                                            <div className="p-inputgroup">
                                                <InputText
                                                    value={this.state.Customer.persona.codigo}
                                                    disabled/>
                                                <Button icon="pi pi-search" className="p-button-warning" onClick={this.OnClickSearchCustomer}/>
                                            </div>
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <label>Doc. Identidad</label>
                                            <div className="p-inputgroup">
                                                <InputText
                                                    value={this.state.Customer.persona.docIdentidad}
                                                    disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <label>Ape. Paterno</label>
                                            <div className="p-inputgroup">
                                                <InputText
                                                    value={this.state.Customer.persona.apellidoPaterno}
                                                    disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <label>Ape. Materno</label>
                                            <div className="p-inputgroup">
                                                <InputText
                                                    value={this.state.Customer.persona.apellidoMaterno}
                                                    disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <label>P. Nombre</label>
                                            <div className="p-inputgroup">
                                                <InputText
                                                    value={this.state.Customer.persona.primerNombre}
                                                    disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <label>S. Nombre</label>
                                            <div className="p-inputgroup">
                                                <InputText
                                                    value={this.state.Customer.persona.segundoNombre}
                                                    disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label>Correo Electrónico</label>
                                            <div className="p-inputgroup">
                                                <InputText
                                                    value={this.state.Customer.persona.email}
                                                    disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label>Observación</label>
                                            <InputTextarea
                                                value={this.state.Customer.persona.observacion}
                                                disabled
                                                name="observacion"
                                                rows={3}
                                                autoResize/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}