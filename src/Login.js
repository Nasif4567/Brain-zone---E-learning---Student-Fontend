import './CSS/App.css';
import React from 'react';
import Button from '@mui/material/Button';
import LoginAnimation from './Animations/LoginAnimation';
import Lottie from 'lottie-react';
import Logo from './Logo/BrainZonee.png'

function Login() {
  return (
    <div>
      <div className="LoginContainer">
      <Lottie animationData={LoginAnimation} />
        <div className="LoginBox">
          <img src={Logo} alt="Logo"></img>
          <h1>Login</h1>
          <input placeholder='Username' />
          <input placeholder='Password' type='password' />
          <button>Login</button>
          <p>Forgot password ?</p>
        </div>
      </div>
    </div>
  );
}

export default Login;