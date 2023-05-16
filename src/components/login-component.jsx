import '../App.css';
import googleIcon from '../assets/images/google.png'

const LoginComponent = ()=>{
    return(
        <div className="login-component">
            <div className="login-main">
                <div className="header">
                    <p>Instagram</p>
                </div>
                <div className="main">
                    <input className="user-id" type="text" placeholder="Phone number, username, or email"/>
                    <input className="user-pass" type="password" placeholder="Password"/>
                    <button className='login-button'>Log in</button>
                    <div className="divider">
                        <hr className="divider-left"/>
                        <div>or</div>
                        <hr className="divider-right"/>
                    </div>
                    <div className='google-login'>
                        <button><img src={googleIcon} alt="google icon"/>Log in with google</button>
                    </div>
                </div>
            </div>
            <div className="signup-section">
                    <p>Don't have an account? <button>Sign up</button></p>
            </div>
        </div>
    )
}

export default LoginComponent;