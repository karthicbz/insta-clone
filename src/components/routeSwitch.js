import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useState } from "react";
// import App from "../App";
import LoginPage from "./login-page";
import SignupPage from "./signUpPage";
import Mainpage from "./main-page";
import NewpostPage from "./newPost-page";

export const LoginCheck = createContext('');

const RouteSwitch = ()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    function changeLoginStatus(){
        setIsLoggedIn(true);
    }

    return(
        <BrowserRouter>
            <LoginCheck.Provider value={changeLoginStatus}>
            <Routes>
                    <Route path="/" element={<LoginPage />}/>
                    <Route path="/signup" element={<SignupPage />}/>
                    <Route path="/:userRefId" element={isLoggedIn?<Mainpage />:<Navigate to="/" replace/>}/>
                    <Route path="/newpost" element={<NewpostPage/>}/>
            </Routes>
            </LoginCheck.Provider>
        </BrowserRouter>
    )
}

export default RouteSwitch;