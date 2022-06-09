import React from "react"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { ICliente } from "../../Domain/Models/ICliente"

interface IProps{
    Visible: boolean
    Cliente: ICliente
    CloseDialog: any
    HandleSubmit: any
    HandleChange: any
    TipoDocIdentidad: Array<object>
    Request: boolean
    Errores: any
}

export default function ClienteDialog(Props: IProps){

    const Footer = (
        <React.Fragment>
            <Button 
                type="button" 
                label={Props.Request ? "Cargando..." : "Cancelar"}
                icon={Props.Request ? "" : "pi pi-times" }
                className="p-button-text" 
                onClick={Props.CloseDialog} 
                disabled={Props.Request}/>
            <Button 
                type="button" 
                label={Props.Request ? "Cargando..." : "Guardar"}
                icon={Props.Request ? "" : "pi pi-check" }
                className="p-button-text" 
                onClick={Props.HandleSubmit}
                disabled={Props.Request}
                autoFocus/>
        </React.Fragment>
    )

    return(
        <Dialog 
            visible={Props.Visible} 
            style={{ width: '480px' }} 
            header="Detalles del cliente" 
            modal 
            className="p-fluid" 
            footer={Footer} 
            onHide={Props.CloseDialog}>
                <form autoComplete="off" onSubmit={Props.HandleSubmit}>
                    <div className="p-grid nested-grid">
                        <div className="p-col-12 p-md-6">
                            <Dropdown
                                value = {Props.Cliente.persona.tipoDocIdentidad}
                                options = {Props.TipoDocIdentidad}
                                onChange={Props.HandleChange}
                                name = "tipoDocIdentidad"
                                optionLabel = "abreviacion"
                                placeholder = "Tipo de documento"/>
                            {Props.Errores.TipoDocIdentidad && <small className="p-invalid p-d-block">{Props.Errores.TipoDocIdentidad}</small>}
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText
                                value={Props.Cliente.persona.docIdentidad}
                                onChange={Props.HandleChange}
                                name="docIdentidad"
                                placeholder="Doc. Identidad"
                                type="number"/>
                            {Props.Errores.DocIdentidad && <small className="p-invalid p-d-block">{Props.Errores.DocIdentidad}</small>}
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText
                                value={Props.Cliente.persona.apellidoPaterno}
                                onChange={Props.HandleChange}
                                name="apellidoPaterno"
                                placeholder="Ape. Paterno"
                                type="text"/>
                            {Props.Errores.ApePaterno && <small className="p-invalid p-d-block">{Props.Errores.ApePaterno}</small>}
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText
                                value={Props.Cliente.persona.apellidoMaterno}
                                onChange={Props.HandleChange}
                                name="apellidoMaterno"
                                placeholder="Ape. Materno"
                                type="text"/>
                            {Props.Errores.ApeMaterno && <small className="p-invalid p-d-block">{Props.Errores.ApeMaterno}</small>}
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText
                                value={Props.Cliente.persona.primerNombre}
                                onChange={Props.HandleChange}
                                name="primerNombre"
                                placeholder="P. Nombre"
                                type="text"/>
                            {Props.Errores.PNombre && <small className="p-invalid p-d-block">{Props.Errores.PNombre}</small>}
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputText
                                value={Props.Cliente.persona.segundoNombre}
                                onChange={Props.HandleChange}
                                name="segundoNombre"
                                placeholder="S. Nombre"
                                type="text"/>
                        </div>
                        <div className="p-col-12">
                            <InputText
                                value={Props.Cliente.persona.email}
                                onChange={Props.HandleChange}
                                name="email"
                                placeholder="Correo Electrónico"
                                type="email"/>
                            {Props.Errores.Email && <small className="p-invalid p-d-block">{Props.Errores.Email}</small>}
                        </div>
                        <div className="p-col-12">
                            <InputTextarea
                                value={Props.Cliente.persona.observacion}
                                onChange={Props.HandleChange}
                                name="observacion"
                                placeholder="Observacion"
                                rows={3}
                                autoResize/>
                        </div>
                    </div>
                </form>
        </Dialog>
    )
}