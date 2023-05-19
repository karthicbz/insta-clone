import '../App.css';
import googleIcon from '../assets/images/google.png'
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import checkCredentials from '../scripts/checkCredentials';
import { LoginCheck } from './routeSwitch';

const LoginComponent = ()=>{
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const loginStatus = useContext(LoginCheck);

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

    const checkValidUser = async ()=>{
        const loginError = document.querySelector('.login-err');
        const checkedCredentials = await checkCredentials(userId, password);
        // console.log(checkedCredentials);
        if(checkedCredentials.userId === false){
            loginError.textContent = 'UserName/Email not found';
        }else if(checkedCredentials.password === false){
            loginError.textContent = 'Incorrect password';
        }else{
            loginStatus();
            navigate(`/${checkedCredentials.userRef}`);
        }
    }


    return(
        <div className="login-component">
            <div className="login-main">
                <div className="header">
                    <p>Instagram</p>
                </div>
                <div className="main">
                    <input className="user-id" type="text" placeholder="Username, or email" value={userId} onChange={checkUserIdLength}/>
                    <input className="user-pass" type="password" placeholder="Password" value={password} onChange={checkPassLength}/>
                    <button className='login-button' onClick={checkValidUser}>Log in</button>
                    <div className="divider">
                        <hr className="divider-left"/>
                        <div>or</div>
                        <hr className="divider-right"/>
                    </div>
                    <div className='google-login'>
                        <button><img src={googleIcon} alt="google icon"/>Log in with google</button>
                    </div>
                    <span className='login-err'></span>
                </div>
            </div>
            <div className="signup-section">
                    <p>Don't have an account? <Link to={'/signup'}><button>Sign up</button></Link></p>
            </div>
        </div>
    )
}

export default LoginComponent;