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
                    <button>Log in</button>
                    <div className="divider">
                        <div className="divider-left"></div>
                        <div>or</div>
                        <div className="divider-right"></div>
                    </div>
                    <p>Log in with Google</p>
                </div>
            </div>
            <div className="signup-section">
                    <p>Don't have an account? <button>Sign up</button></p>
            </div>
        </div>
    )
}

export default LoginComponent;