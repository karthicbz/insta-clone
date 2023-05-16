import homePhones from '../assets/images/home-phones.png';
import LoginComponent from './login-component';
import '../App.css';

const LoginPage = ()=>{
    return(
    <div className='login-page'>
        <div className="loginpage-header"></div>
        <div className="loginpage-main">
            <div className='phones-section'>
                <img src={homePhones} alt='iphone and android'/>
            </div>
            <div className='login-section'>
                <LoginComponent />
            </div>
        </div>
        <div className="loginpage-footer"></div>
    </div>
    );
}

export default LoginPage;