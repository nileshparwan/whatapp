import Head from 'next/head';
import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../config/firebase';

const Login = () => {

    const SignIn = () => {       
        auth
            .signInWithPopup(provider)
            .catch(alert);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Login</title>
            </Head>

            <LoginStyle>
                <div className="login__container">
                    <LogoStyle
                        src="/image/whatsapp-logo.png"
                        alt="logo"
                    />
                    <Button variant="outlined" onClick={SignIn}>Sign in with Google</Button>
                </div>

            </LoginStyle>
        </React.Fragment>
    );
};

const LoginStyle = styled.div`
display:grid; 
place-items:center; 
height: 100vh; 
background-color:white;

.login__container{
padding: 100px;
display:flex;
flex-direction:column; 
align-items:center;
background-color:whitesmoke;
border-radius:5px; 
box-shadow: 0px 4px 14px -3px rgba(0,0,0.7); 
}
`;

const LogoStyle = styled.img`
height: 200px; 
width: 200px; 
margin-bottom: 50px;
`;

export default Login;
