import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../page/Login";
import { Register } from "../page/Register";

export const RouteApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/> 
            </Routes>
        </BrowserRouter>
    )
}