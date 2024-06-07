import  Axios  from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {checkAuth} from './FunctionReused/checkAuth.js'
import axios from 'axios';


const CustomSelectionBox = () => {
  const options = ['Mobile App Development', 'Web Development', 'Software Testing', 'Programming Languages','Database Design'];
  const [SelectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate()
  const [error , setError]= useState('');

  useEffect(() => {
    async function verifySession() {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
            navigate('/login');
        }
    }
    verifySession();
}, []);





   const HandleSaveInterst = async()=>{
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3001',
      withCredentials: true 
  });
         try {
          const response = await axiosInstance.post("/SaveInterst",{SelectedOptions})

          if (response.data.success){
             navigate('/BrowseCourses')
          }
         }
          catch (error) {
             console.error(error);
             console.log(error.response.data);
             setError(error.response.data.error)
          }

   }


  const handleOptionClick = (option) => {
    const managecurrentstate = (prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((selectedOption) => selectedOption !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    };

    setSelectedOptions(managecurrentstate);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <h2 className="text-2xl font-bold mb-8">Select the fields you are interested in Software Development</h2>
      <div className="flex space-x-4">
        {options.map((op) => (
          <div
            key={op}
            onClick={() => handleOptionClick(op)}
            className={`p-4 cursor-pointer rounded-lg ${SelectedOptions.includes(op) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {op}
          </div>
        ))}
      </div>

      <button onClick={HandleSaveInterst} className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">Next</button>
      
      {error === '' ? null : (
          <p className="p-5 mt-5 mb-5 bg-red-500 text-white rounded">{error}</p>
        )}

    </div>
  );
};

export default CustomSelectionBox;
