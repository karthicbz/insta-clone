import '../App.css';
import googleIcon from '../assets/images/google.png'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LoginComponent = ()=>{
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const checkUserIdLength = (e)=>{
        setUserId(e.target.value);
    }

    const checkPassLength = (e)=>{
        setPassword(e.target.value);
    }

    useEffect(()=>{
        const loginButton = document.querySelector('.login-button');
        const passField = document.querySelector('.user-pass');
        const userIdField = document.querySelector('.user-id');

        if(passField.value.length <= 5 || userIdField.value.length <=0){
            loginButton.setAttribute('style', 'background-color: rgb(121, 169, 121)');
            loginButton.disabled = true;
        }else{
            loginButton.removeAttribute('style');
            loginButton.disabled = false;
        }
    }, [password, userId])


    return(
        <div className="login-component">
            <div className="login-main">
                <div className="header">
                    <p>Instagram</p>
                </div>
                <div className="main">
                    <input className="user-id" type="text" placeholder="Phone number, username, or email" value={userId} onChange={checkUserIdLength}/>
                    <input className="user-pass" type="password" placeholder="Password" value={password} onChange={checkPassLength}/>
                    <button className='login-button'>Log in</button>
                    <div className="divider">
                        <hr className="divider-left"/>
                        <div>or</div>
                        <hr className="divider-right"/>
                    </div>
                    <div className='google-login'>
                        <button><img src={googleIcon} alt="google icon"/>Log in with google</button>
                    </div>
                    <div className='login-err'>
                        <p></p>
                    </div>
                </div>
            </div>
            <div className="signup-section">
                    <p>Don't have an account? <Link to={'/signup'}><button>Sign up</button></Link></p>
            </div>
        </div>
    )
}

export default LoginComponent;