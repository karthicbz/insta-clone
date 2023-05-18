import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "../App";
import LoginPage from "./login-page";
import SignupPage from "./signUpPage";
import Mainpage from "./main-page";

const RouteSwitch = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/signup" element={<SignupPage />}/>
                <Route path="/:userRefId" element={<Mainpage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;