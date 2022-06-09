import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import ClienteDialog from "../Components/ClienteDialog";
import ClienteTable from "../Components/ClienteTable";
import { ClienteService } from "../../Domain/Services/ClienteService"
import { TipoDocIdentidadService } from "../../Domain/Services/TipoDocIdentidadService"
import { ICliente } from "../../Domain/Models/ICliente"
import { ITipoDocIdentidad } from "../../Domain/Models/ITipoDocIdentidad"
import { IFilterCustomer } from "../../Domain/Models/IFilterCustomer";


interface IProps {
}

interface IState {
    Load: boolean
    FilterCustomer: IFilterCustomer
    Clientes: Array<ICliente>
    Dialog: boolean
    Cliente: ICliente
    TipoDocIdentidad: Array<ITipoDocIdentidad>
    Request: boolean
    Errores: any
}

export default class Cliente extends React.Component<IProps, IState>{

    cFilterCustomer = {
        numeroPagina : 1,
        registrosPagina : 5,
        numeroPaginas : 0,
        fil_Codigo: '',
        fil_DocIdentidad: '',
        fil_Apellidos: '',
        fil_Nombres: ''
    }

    cCliente: ICliente = {
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
    
    constructor(props : any){
        super(props)
        this.state = {
            Load: true,
            FilterCustomer: this.cFilterCustomer,
            Clientes: [],
            Dialog: false,
            Cliente: this.cCliente,
            TipoDocIdentidad: [],
            Request: false,
            Errores: {}
        }
    }

    componentDidMount(){
        this.ListarCliente()
        this.ListarTipoDocIdentidad()
    }

    ListarCliente(){
        ClienteService.GetAll()
        .then( (data : any) => {
            if(data.success){
                this.setState({
                    Clientes: data.data
                })
            }
        })
        .catch( error => {
            alert(error)
        })
        .finally( () => {
            this.setState({
                Load: false
            })
        })
    }

    ListarTipoDocIdentidad(){
        TipoDocIdentidadService.Listar()
        .then( (data: any) => {
            if(data.success){
                this.setState({ TipoDocIdentidad: data.data })
            }
        })
        .catch( error => {
            alert(error)
        })
    }

     LeftToolbar = () => {
        return(
            <React.Fragment>
                <Button 
                    type="button"
                    label="Nuevo" 
                    icon="pi pi-plus" 
                    className="p-button-success p-mr-2" 
                    onClick= {() => this.HandleResponse(this.state.Cliente, true)} />
            </React.Fragment>
        )
    }

    HandleResponse = (Cliente : ICliente | null, Mode: boolean) => {
        this.setState({
            Cliente: Cliente ? Cliente : this.cCliente,
            Dialog: Mode,
            Errores: {}
        })
    }

    HandleChange = (Event: any) => {
        switch(Event.target.name){
            case "TipoDocIdentidad": 
                let aObj: Array<ITipoDocIdentidad> =  
                this.state.TipoDocIdentidad.filter( (Obj : ITipoDocIdentidad) => {
                    return Obj.pkid === parseInt(Event.value.pkid,10) 
                })
                if(aObj.length > 0){
                    this.setState({
                        Cliente:{
                            ...this.state.Cliente,
                            persona:{
                                ...this.state.Cliente.persona,
                                tipoDocIdentidad: aObj[0]
                            }
                        }
                    })
                }
                break
            default:
                this.setState({
                    Cliente:{
                        ...this.state.Cliente,
                        persona:{
                            ...this.state.Cliente.persona,
                            [Event.target.name]: Event.target.value
                        }
                    }
                })
                break
        }
    }

    HandleSubmit = (Event : React.ChangeEvent<HTMLFormElement>) => {
        Event.preventDefault()
        const result = ClienteService.ValidarSchema(this.state.Cliente)
        if(Object.keys(result).length){
            return this.setState({Errores: result})
        }else{
            this.setState({
                Request: true
            },() => {
                this.CrearActualizarCliente()
            })
        }
    }

    CrearActualizarCliente = () => {
        ClienteService.CrearActualizar(this.state.Cliente)
        .then((response: any) => {
            if(response.success){

            }else{
                alert(response.data)
            }
        })
        .catch( (error) => {
            alert(error)
        })
        .finally( () => {
            this.setState({
                Request: false
            })
        })
    }

    SelectionCustomer = (IdCustomer: number) => {
        ClienteService.Get(IdCustomer)
        .then( (data : any) => {
            if(data.success){
                this.setState({
                    Cliente: data.data
                },() => {
                    this.setState({
                        Dialog: true
                    })
                })
            }else throw data.mensaje;
        })
        .catch( error => {
            alert(error)
        })
        .finally( () => {
            this.setState({
                Load: false
            })
        })
    }

    ResponsePaginatorCustomer = (FilterCustomer: IFilterCustomer) => {
        console.log(FilterCustomer)
    }

    render(){
        return(
            <div className="Container">
                <div className="p-col-12">
                    <div className="p-card">
                        <Toolbar className="p-mb-4" left={this.LeftToolbar}/>
                        <ClienteTable
                            Customers = {this.state.Clientes}
                            SelectionCustomer = {this.SelectionCustomer}
                            FilterCustomer = {this.state.FilterCustomer}
                            ResponsePaginator = {this.ResponsePaginatorCustomer}
                            Load = {this.state.Load}/>
                        <ClienteDialog
                            Visible = {this.state.Dialog}
                            Cliente = {this.state.Cliente}
                            TipoDocIdentidad = {this.state.TipoDocIdentidad}
                            CloseDialog = {this.HandleResponse}
                            HandleSubmit = {this.HandleSubmit}
                            HandleChange = {this.HandleChange}
                            Request = {this.state.Request}
                            Errores = {this.state.Errores}/>
                    </div>
                </div>
            </div>
        )
    }
}