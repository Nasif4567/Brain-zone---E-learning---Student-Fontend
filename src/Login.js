import './CSS/App.css';
import React, { useState } from 'react';
import LoginAnimation from './Animations/LoginAnimation';
import Lottie from 'lottie-react';
import Logo from './Logo/BrainZonee.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      if (response.data.message) {
        nav('/BrowseCourses');
      }
    } catch (error) {
      console.error('Login failed:', error);
      console.log(error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  const handleForgotPassword = () => {
    // Add logic for handling forgot password
    console.log('Forgot Password clicked');
  };

  return (
    <div className="grid grid-cols-2 h-screen w-full overflow-hidden">
      <Lottie animationData={LoginAnimation} />
      <div className="p-10 flex flex-col justify-center ml-48">
        <img src={Logo} className="w-20 h-20" alt="Logo" />
        <h1 className="mt-10 mb-10 text-4xl">Login</h1>
        <input
          className="p-3 mb-5 border-2 border-black rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="p-3 border-2 border-black rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />
         <p className="text-blue-500 cursor-pointer mt-3" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <div className="flex items-center mt-5 mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <button
          onClick={handleLogin}
          className="p-3 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-gray-900"
        >
          Login
        </button>
        <p onClick={() => nav("/Register")} className="text-blue-500 cursor-pointer mt-3">
          New here ? Register here.
        </p>
        {message === '' ? null : (
          <p className="p-5 mt-5 bg-red-500 text-white">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
