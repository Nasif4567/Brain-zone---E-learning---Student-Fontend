import React, { useState,  useRef } from "react";
import NavigationSideBar from "./ReuseableComponents/NavigationSideBar";
import ModuleMenuNavigation from "./ReuseableComponents/ModuleMenuNavigation";

function AssignmentSubmission() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    // Handle file selection
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    // Handle file upload logic here
    if (selectedFile) {
        console.log("File Uploaded")
    }
  };

  const handleClearFile = () => {
    // Clear the file input by resetting the form
    setSelectedFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
  };

  return (
    <div className="flex items-center justify-center overflow-y-auto">
      <NavigationSideBar />
      <div className="flex flex-col items-center justify-center mt-5">
        <ModuleMenuNavigation />
        <div className="flex flex-col item-center justify-center p-5 bg-aliceblue mt-10 rounded-lg w-[500px]">
          <h1 className="mb-20 mt-2 text-2xl font-bold">Assignment Upload Portal</h1>
          
          {selectedFile ? (
        <div className="mt-2 flex items-center">
          <p className="mr-2">Selected File: {selectedFile.name}</p>
          <button
            onClick={handleClearFile}
            className="text-red-500 hover:underline cursor-pointer"
          >
            Clear
          </button>
        </div>
      ) : (
        <p className="mt-2 text-gray-500">No file selected</p>
      )}


          <label className="mt-2 rounded-md border-2 border-blue-500 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">
      <span>Choose File</span>
      <input
       ref={fileInputRef}
       type="file"
       accept=".pdf, .doc, .docx"
       onChange={handleFileChange}
       className="hidden"
       />
       </label>  

          <button
            onClick={handleFileUpload}
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentSubmission;
