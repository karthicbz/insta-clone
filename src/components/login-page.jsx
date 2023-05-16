import homePhones from '../assets/images/home-phones.png';

const LoginPage = ()=>{
    return(<div>
        <div className="loginpage-header"></div>
        <div className="loginpage-main">
            <div className='phones-section'>
                <img src={homePhones} alt='iphone and android'/>
            </div>
            <div className='login-section'>
                
            </div>
        </div>
        <div className="loginpage-footer"></div>
    </div>);
}

export default LoginPage;