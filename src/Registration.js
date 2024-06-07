import React from "react";
import Lottie from "lottie-react";
import Logo from "./Logo/BrainZonee.png";
import RegisterAnimation from "./Animations/RegisterAnimation.json";
import { Checkbox } from "pretty-checkbox-react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios  from "axios";

function Registration() {
  const[Name , setName]= useState('');
  const[Email , setEmail]= useState('');
  const[Password , SetPassword]= useState('');
  const[ConfirmPassword , setConfimPassword]= useState(''); // this one only used to check if the password matches 
  const[Username , setUsername]= useState('');
  const[error , setError]= useState('');


  const navigate = useNavigate(); 

  const HandleRegister = async () => {
    const Role = "Student";
    
    if(Password === ConfirmPassword){
    try {
      const response = await axios.post(
        "http://localhost:3001/Register",
        {
          Name,
          Username,
          Email,
          Role,
          Password,
        },
      );
  
      if (response.data.success) {
        document.cookie = `token=${response.data.token}`
        navigate("/CourseSelect");
      }
    } catch (error) {
      console.error("Register Error:", error);
  
      // Log more details about the error
      console.log("Error response status:", error.response.status);
      console.log("Error response data:", error.response.data);
  
      setError(error.response?.data?.error || 'An error occurred');
    }

  } else {
    setError("Password doesn't match")
  }

  };
  
  return (
    <div className="flex flex-row justify-center items-center bg-blue-300">
      <Lottie className="h-screen w-full" animationData={RegisterAnimation} />

      <div className="flex flex-col w-500 h-screen bg-white p-10">
        <img src={Logo} alt="Logo" className="h-20 w-20" />
        <h1 className="mb-5 text-3xl">Register</h1>

        <div className="flex flex-row">
          <div className="flex flex-col">
            <input placeholder="Name" onChange={(e)=>setName(e.target.value)} class="border border-black h-12 w-60 p-4 mb-3" required/>
            <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className="border border-black h-12 w-60 p-4 mb-3" required/>
            <input placeholder="Email" type="email" onChange={(e)=>setEmail(e.target.value)} className="border border-black h-12 w-60 p-4 mb-3" required/>
          </div>
          <div className="flex flex-col ml-4">
            <input placeholder="Password" type="password" onChange={(e)=>SetPassword(e.target.value)} className="border border-black h-12 w-60 p-4 mb-3" required/>
            <input placeholder="Confirm" type="password" onChange={(e)=>setConfimPassword(e.target.value)} className="border border-black h-12 w-60 p-4 mb-3" required/>
          </div>
        </div>

        {error === '' ? null : (
          <p className="p-5 mt-5 mb-5 bg-red-500 text-white">{error}</p>
        )}

        <div className="flex flex-row mt-2 mb-4">
          <Checkbox name="tac" color="info">
            Do you agree to the terms and conditions?
          </Checkbox>
        </div>

        <button onClick={HandleRegister} className="h-10 w-50 border-none bg-blue-500 text-white mb-4">Register</button>
        <p onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer mt-3">
          Existing member ? Login here.
        </p>
      </div>
    </div>
  );
}

export default Registration;
