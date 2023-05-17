import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

const ColorButton = styled.button`
        background-color: rgb(67, 167, 67);
        border: none;
        border-radius: 8px;
        color: white;
        font-weight: 700;
        width: 280px;
        height: 2.3rem;
        margin: 1rem 0;
        &:hover{
            cursor: pointer;
        }
    `;

const UserInput = styled.input`
    width: 280px;
    height: 2.3rem;
    padding-left: 3px;
    border: 1px solid rgb(223, 221, 221);;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 0.9rem;
    gap: 1rem;
`
const WrapperChild = styled.div`
    border: 1px solid rgb(223, 221, 221);;
    padding: 1rem;
    width: 340px;
`;

const WrapperSignup = styled(Wrapper)`
    border: none;
    padding: 0;
    display: flex;
    gap: 8px;
`
const HeaderText = styled.p`
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Pacifico', cursive;
    font-size: 3rem;
`;

const Line = styled.hr`
    border-top: 1px solid rgb(223, 221, 221);
`;

const LinkButton = styled.button`
    border: none;
    background: transparent;
    color: rgb(67, 167, 67);
    font-weight: 700;
    font-size: 0.9rem;
    &:hover{
        cursor: pointer;
    }
`;

const Para = styled.p`
    font-size: 1.1rem;
    color: gray;
    font-weight: 600;
    width: 270px;
`;

const SignupPara = styled(Para)`
    font-size: 0.9rem;
    color: black;
    font-weight: 400;
`

const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ErrorText = styled.span`
    font-size: 0.8rem;
    width: 280px;
    color: red;
    font-weight: 500;
    white-space: pre;
`;

const SignupPage = ()=>{

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handleUsername = (e)=>{
        setUserName(e.target.value);
    }
    const handleFullname = (e)=>{
        setFullName(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    useEffect(()=>{
        const signupButton = document.querySelector('.signup-button');
        const fullNameError = document.querySelector('.fullName-error')
        if(email.length <=0 || userName.length <= 5 || fullName.length <= 5 || password.length <= 7){
            signupButton.setAttribute('style', 'background-color:rgb(121, 169, 121);');
            signupButton.disabled = true;
            fullNameError.textContent = "Full Name & Username must be 6\r\n characters long\r\n";
            fullNameError.textContent += 'Password must be 8 characters long';
        }else{
            signupButton.removeAttribute('style');
            signupButton.disabled = false;
            fullNameError.textContent = '';
        }
    }, [email, userName, fullName, password])

    useEffect(()=>{
        const fullNameError = document.querySelector('.fullName-error');
        if(email.length === 0 && userName.length === 0 && fullName.length === 0 && password.length === 0){
            fullNameError.textContent = '';
        }
    }, [email, userName, fullName, password])

    return(
    <Wrapper className="signup-page">
        <WrapperChild>
            <HeaderText>Instagram</HeaderText>
            <WrapperSignup className="signup-component">
                <Para>Sign up to see photos and videos from your friends</Para>
                <ColorButton>Log in with google</ColorButton>
                <div className="divider">
                    <Line className="divider-left"/>
                    <div>or</div>
                    <Line className="divider-right"/>
                </div>
                <SignupForm>
                    <UserInput type="email" placeholder="Email" value={email} onChange={handleEmail} required></UserInput>
                    <UserInput placeholder="Full Name" value={fullName} onChange={handleFullname} required></UserInput>
                    <UserInput placeholder="Username" value={userName} onChange={handleUsername} required></UserInput>
                    <UserInput type="password" value={password} onChange={handlePassword} placeholder="Password" required></UserInput>
                    <ErrorText className="fullName-error"></ErrorText>
                    <ColorButton className="signup-button">Sign up</ColorButton>
                </SignupForm>
            </WrapperSignup>
        </WrapperChild>
        <WrapperChild>
            <SignupPara>Have an account? <Link to={"/"}><LinkButton>Login</LinkButton></Link></SignupPara>
        </WrapperChild>
    </Wrapper>
    );
}

export default SignupPage;