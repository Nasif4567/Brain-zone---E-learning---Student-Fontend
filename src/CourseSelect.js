import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CustomSelectionBox = () => {

  const options = ['Mobile Development', 'Web Development', 'Software Testing', 'Programming Languages','Database Design'];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate()


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
            className={`p-4 cursor-pointer rounded-lg ${selectedOptions.includes(op) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {op}
          </div>
        ))}
      </div>

      <button onClick={()=>{navigate('/BrowseCourses')}} className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">Next</button>

      {/* Commented out block */}
      {/* 
      {selectedOptions.length > 0 ? (
        <p className="mt-2">Selected Fields: {selectedOptions.join(', ')}</p>
      ) : (
        <p className="mt-2">No field selected.</p>
      )}
      */}
    </div>
  );
};

export default CustomSelectionBox;
