import { Link } from "react-router-dom";
import styled from "styled-components";

const SignupPage = ()=>{

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
                    <UserInput type="email" placeholder="Email" required></UserInput>
                    <UserInput placeholder="Full name" required></UserInput>
                    <UserInput placeholder="Username" required></UserInput>
                    <UserInput type="password" placeholder="Password" required></UserInput>
                    <ColorButton>Sign up</ColorButton>
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