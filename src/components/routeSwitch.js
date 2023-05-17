import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "../App";
import LoginPage from "./login-page";
import SignupPage from "./signUpPage";

const RouteSwitch = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/signup" element={<SignupPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;