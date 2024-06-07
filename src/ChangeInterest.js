import React, { useState } from 'react';
import Axios from 'axios';

export default function ChangeInterest({ handleCloseChangeView })  { 
  const [SelectedOptions, setSelectedOptions] = useState([]);
  const options = ['Mobile App Development', 'Web Development', 'Software Testing', 'Programming Languages', 'Database Design'];

  const HandleSaveInterst = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/SaveInterst", {
        SelectedOptions,
      });

      if (response.data.success) {
        console.log("Saved changed")
        handleCloseChangeView()
      }
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-md rounded-lg p-5 flex flex-col space-y-5">
        <div className="flex justify-end">
          <button className="text-sm" onClick={handleCloseChangeView}>Close</button>
        </div>
        <h1 className="font-bold text-xl">Update you interest topics</h1>
        <div className="flex space-x-4">
          {options.map((op) => (
            <div
              key={op}
              onClick={() => handleOptionClick(op)}
              className={`p-4 border cursor-pointer rounded-lg ${SelectedOptions.includes(op) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {op}
            </div>
          ))}
        </div>
        <button onClick={HandleSaveInterst} className="border w-32 p-2 bg-gray">Save Changes</button>
      </div>
    </div>
  )
}
