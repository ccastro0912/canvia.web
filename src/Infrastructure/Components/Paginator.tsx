import React, { MouseEventHandler } from 'react';
import { Dropdown } from 'primereact/dropdown';

interface IProps {
    Paginado : any,
    HandlePreviousLL : MouseEventHandler,
    HandlePrevious : MouseEventHandler,
    HandleFollowing : MouseEventHandler,
    HandleFollowingLL : MouseEventHandler,
    OnRegistroChange : any
}

interface IState {
    Registros: Array<{registrosPagina: number}>
}

export default class Paginator extends React.Component<IProps, IState> {

    constructor(props : any){
        super(props)
        this.state = {
            Registros: [
                { registrosPagina: 5 },
                { registrosPagina: 10 },
                { registrosPagina: 15 }
            ]
        }
    }

    render(){
        return(
            <div className="p-paginator p-component p-paginator-bottom">
                {this.props.Paginado.numeroPagina > 1 ? 
                    <>
                        <button type="button" className="p-paginator-first p-paginator-element p-link" onClick={this.props.HandlePreviousLL}>
                            <span className="p-paginator-icon pi pi-angle-double-left"></span>
                        </button>
                        <button type="button" className="p-paginator-prev p-paginator-element p-link" onClick={this.props.HandlePrevious}>
                            <span className="p-paginator-icon pi pi-angle-left"></span>
                        </button>
                    </>
                    :
                    <>
                        <button type="button" className="p-paginator-first p-paginator-element p-link p-disabled" disabled>
                            <span className="p-paginator-icon pi pi-angle-double-left"></span>
                        </button>
                        <button type="button" className="p-paginator-prev p-paginator-element p-link p-disabled" disabled>
                            <span className="p-paginator-icon pi pi-angle-left"></span>
                        </button>
                    </>
                }
                <span className="p-paginator-pages">
                    <button type="button" className="p-paginator-page p-paginator-element p-link p-highlight">{this.props.Paginado.numeroPagina}</button>
                </span>
                {this.props.Paginado.numeroPagina < this.props.Paginado.numeroPaginas ? 
                    <>
                        <button type="button" className="p-paginator-next p-paginator-element p-link" onClick={this.props.HandleFollowing}>
                            <span className="p-paginator-icon pi pi-angle-right"></span>
                        </button>
                        <button type="button" className="p-paginator-last p-paginator-element p-link" onClick={this.props.HandleFollowingLL}>
                            <span className="p-paginator-icon pi pi-angle-double-right"></span>
                        </button>
                    </>
                    :
                    <>
                        <button type="button" className="p-paginator-next p-paginator-element p-link p-disabled" disabled>
                            <span className="p-paginator-icon pi pi-angle-right"></span>
                        </button>
                        <button type="button" className="p-paginator-last p-paginator-element p-link p-disabled" disabled>
                            <span className="p-paginator-icon pi pi-angle-double-right"></span>
                        </button>
                    </>
                }
                <div>
                    <Dropdown 
                        value={{ registrosPagina : this.props.Paginado.registrosPagina}} 
                        options={this.state.Registros} 
                        onChange={this.props.OnRegistroChange} 
                        optionLabel="registrosPagina"/>
                </div>
            </div>
        )
    }
}