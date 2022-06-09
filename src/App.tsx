import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import Login from "./Infrastructure/Pages/Login"
import Pedido from "./Infrastructure/Pages/Pedido"

interface IProps {
}

interface IState {
    Token: string | null
}

export default class App extends React.Component<IProps, IState> {

    constructor(props : any){
        super(props)
        this.state = {
            Token: localStorage.getItem('TOKEN-CANVIA')
        }
    }

    render(){

        const PrivateRoute: any = ({ children } : any) =>{
            return this.state.Token ? ( 
                <>
                {children} 
                <Outlet />
                </>
            ) : (
                <Navigate to="/" replace />
            );
        }

        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/Pedido" element={<PrivateRoute/>}>
                        <Route index element={<Pedido/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}