import React from "react"
import Cargando from "../Components/Cargando"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { UsuarioService } from "../../Domain/Services/UsuarioService"
import { ICredencial } from "../../Domain/Models/ICredencial"

import "../Assets/Css/Login.css"

interface IProps {
}

interface IState {
    Credencial: ICredencial,
    Load: boolean
}

export default class Login extends React.Component<IProps, IState>{
    
    cCredencial: ICredencial = {
        Nombre: "",
        Contraseña: ""
    }

    constructor(props : any){
        super(props)
        this.state = {
            Credencial: this.cCredencial,
            Load: false
        }
    }

    componentDidMount(){
        localStorage.removeItem('TOKEN-CANVIA')
    }

    HandleChange = (Event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            Credencial:{
                ...this.state.Credencial,
                [Event.target.name]: Event.target.value
            }
        })
    }

    HandleSubmit = (Event : React.ChangeEvent<HTMLFormElement>) => {
        Event.preventDefault();
        this.setState({
            Load: true
        }, () => {this.Autenticar()})
    }

    Autenticar(){ 
        UsuarioService.Autenticar(this.state.Credencial)
        .then( (data : any) => {
            if(data.success){
                localStorage.setItem('TOKEN-CANVIA',data.data.access_token)
                  window.location.assign('Cliente')
            }else{
                alert(data.data)
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

    render(){
        return(
            <>
                {this.state.Load ? 
                    <Cargando Load={this.state.Load}/>
                    :
                    <div>
                        <header className="toolbar">
                            <nav className="toolbar_navigation">
                            </nav>
                        </header>
                        <div className="authBox">
                            <div className="box">
                                <div className="subtitleAuth">Iniciar sesión en</div>
                                <div className="titleAuth">Sales Orders</div>
                                <form autoComplete="off" onSubmit={this.HandleSubmit}>
                                    <div className="p-col-fixed p-mt-4">
                                        <div className="p-grid p-fluid">
                                            <div className="p-col-12 p-mt-3">
                                                <InputText 
                                                    value={this.state.Credencial.Nombre}
                                                    name="Nombre"
                                                    onChange={this.HandleChange}
                                                    type="text" 
                                                    placeholder="Usuario"/>
                                            </div>
                                        </div>
                                        <div className="p-grid p-fluid">
                                            <div className="p-col-12 p-mt-3">
                                                <InputText 
                                                    value={this.state.Credencial.Contraseña}
                                                    name="Contraseña"
                                                    onChange={this.HandleChange}
                                                    type="password"
                                                    placeholder="Contraseña"/>
                                            </div>
                                        </div>
                                        <div className="p-mt-1">
                                            <Button 
                                                label="Ingresar"
                                                style={{
                                                    background:'#293686',
                                                    border:'#293686',
                                                    width:'100%'
                                                }}
                                                className="p-ml-auto"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}