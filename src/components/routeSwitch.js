import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "./login-page";

const RouteSwitch = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;