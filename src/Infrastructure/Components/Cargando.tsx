import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'

import '../Assets/Css/Spinner.css'

interface IProps{
    Load: boolean
}

export default function Cargando(Props : IProps){
    return(
        <>
            {Props.Load ? 
                    <div className="PosSpinner">
                        <ProgressSpinner/>
                        <p>Consultando...</p>
                    </div>
                :
                <>
                </>
            }
        </>
    )
}