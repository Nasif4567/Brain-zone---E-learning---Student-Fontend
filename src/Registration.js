import React from "react";
import Lottie from "lottie-react";
import Logo from "./Logo/BrainZonee.png";
import RegisterAnimation from "./Animations/RegisterAnimation.json";
import { Checkbox } from "pretty-checkbox-react";
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate(); 

const HandleRegister= ()=>{
      navigate('/CourseSelect');
}
  return (
    <div className="flex flex-row justify-center items-center bg-blue-300">
      <Lottie className="h-screen w-full" animationData={RegisterAnimation} />

      <div className="flex flex-col w-500 h-screen bg-white p-10">
        <img src={Logo} alt="Logo" className="h-20 w-20" />
        <h1 className="mb-5 text-3xl">Register</h1>

        <div className="flex flex-row">
          <div className="flex flex-col">
            <input placeholder="First Name" class="border border-black h-12 w-60 p-4 mb-3"/>
            <input placeholder="Last Name" className="border border-black h-12 w-60 p-4 mb-3" />
            <input placeholder="Date of Birth" type="date" className="border border-black h-12 w-60 p-4 mb-3" />
            <input placeholder="Email" type="email" className="border border-black h-12 w-60 p-4 mb-3" />
          </div>

          <div className="flex flex-col ml-4">
            <input placeholder="Contact Number" type="number" className="border border-black h-12 w-60 p-4 mb-3" />
            <input placeholder="Password" type="password" className="border border-black h-12 w-60 p-4 mb-3" />
            <input placeholder="Confirm" type="password" className="border border-black h-12 w-60 p-4 mb-3" />
          </div>
        </div>

        <div className="flex flex-row mt-2 mb-4">
          <Checkbox name="tac" color="info">
            Do you agree to the terms and conditions?
          </Checkbox>
        </div>

        <button onClick={HandleRegister} className="h-10 w-50 border-none bg-blue-500 text-white mb-4">Register</button>
        <p>Existing Member?</p>
      </div>
    </div>
  );
}

export default Registration;
