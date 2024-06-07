import React, { useState, useEffect, useRef } from "react";
import NavigationSideBar from "./ReuseableComponents/NavigationSideBar";
import ModuleMenuNavigation from "./ReuseableComponents/ModuleMenuNavigation";
import { FaUser, FaImage , FaTimes} from "react-icons/fa";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {checkAuth} from './FunctionReused/checkAuth.js'

function DiscussionForum() {
  const [question, setQuestion] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState(5);
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [image, setImage] = useState(null);
  const { courseId } = useParams();
  const nav = useNavigate();
  const [Name , setName] = useState('')
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function verifySession() {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          nav('/login');
        }

    }
    verifySession();
}, []);
  

  const SendMessage = async () => {
    try {
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:3001',
          withCredentials: true 
      });
      const response = await axiosInstance.post("/sendDiscussionForm", { question , body,image,courseId});
      if (response.status === 201) {
        console.log("Message sent");
        setQuestion('');
        setError('');
        setImage(null);
        fileInputRef.current.value = "";
        setBody('');
        getAllMessage();
      }
    } catch (error) {
      console.log("Error response status:", error.response.status);
      console.log("Error response data:", error.response.data);
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  const getAllMessage = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true
      });
      
      const response = await axiosInstance.post("/viewMessageDF", { courseID: courseId }); // Ensure the parameter name matches the backend expectation
      if (response.status === 200) {
        setMessages(response.data.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
          const axiosInstance = axios.create({
            baseURL: 'http://localhost:3001',
            withCredentials: true 
        });
        const response = await axiosInstance.post('/CheckEnrollment', { courseID: courseId });
        console.log("Enrollment Check Response:", response.data); // Log the response data
        if (response.data.success && response.data.enrolled) {
          console.log("User is enrolled"); // Log if user is enrolled
          setPurchased(true);
        } else {
          console.log("User is not enrolled"); // Log if user is not enrolled
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
      } finally {
        setLoading(false); // Set loading to false after enrollment check completes
      }
    };

    checkEnrollment();
  }, [courseId]);

  useEffect(() => {
    if (!loading && !purchased) { // Navigate only after loading is complete and purchased is true
      nav("/BrowseCourses");
    }
  }, [loading, purchased, nav]);

  useEffect(() => {
    getAllMessage();
  }, []);

  const increaseVisibleMessages = () => {
    setVisibleMessages((prevVisibleMessages) => prevVisibleMessages + 5);
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  
  const clearImage = () => {
    setImage(null);
    fileInputRef.current.value = "";
    
  };

  return (
    <div className="flex flex-col item-center justify-center overflow-y-auto m-5">
      <NavigationSideBar />
      <div className="flex flex-col item-center justify-center mt-10 mr-20 ml-20 mb-10">
        <ModuleMenuNavigation />

        <div>
          <h1 className="mt-5 text-2xl font-bold">Discussion Forum</h1>
          <input className="p-5 rounded-xl mb-5 h-2 mt-5 border" placeholder="Search" />
        </div>

        <div className="p-4 border overflow-y-auto">
        {messages.length === 0 ? (
            <div className="text-gray-500 text-center">There are no discussions yet. Ask a question to start the discussion!</div>
          ) : (
            messages.slice(-visibleMessages).reverse().map((message, index) => (
              <div key={index} className="bg-white p-4 my-4 border shadow-md">
                <div className="flex items-center mb-2">
                  <FaUser className="text-xl mr-2" />
                  <div className="text-gray-700 font-semibold">User : {message.created_by}</div>
                  <div className="text-gray-500 ml-auto">{new Date(message.created_at).toLocaleString()}</div>
                </div>
                <div className="flex flex-col text-gray-800 border p-5 my-5">
                  <h1 className="text-gray-800 mb-2 font-bold">Question-</h1>
                  {message.Question}
                </div>
                <div className="flex justify-end mt-2">
                  <button onClick={() => nav(`/ReplyToForum/${courseId}/${message.discussion_id}/${message.Question}/${message.created_by}`)} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    View body and replies
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {visibleMessages < messages.length && (
          <button
            onClick={increaseVisibleMessages}
            className="p-3 bg-blue-500 text-white hover:bg-blue-600"
          >
            See More
          </button>
        )}

        {visibleMessages > 5 && (
          <button
            onClick={() => setVisibleMessages(5)}
            className="p-3 bg-blue-400 text-white mt-2"
          >
            reset
          </button>
        )}

        <div className="flex flex-col mb-5 mt-10">
          <h1 className="mt-5 text-2xl font-bold mb-5">Ask Question</h1>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} className="p-5 mb-5 h-2 mt-2 border" placeholder="Question Title" required/>

          <div className="flex items-center border p-2"> 
            <div className="flex items-center border p-2 relative">
            <input type="file" onChange={handleImageUpload} accept="image/*" className="opacity-0 absolute" ref={fileInputRef} />
        <label htmlFor="file-upload" className="cursor-pointer">
        <FaImage/>
        </label>
          </div>
    
            
          </div>

          {image ? (
              <div className="flex items-center">
                <img src={image} alt="Uploaded" className="w-20 h-20 mt-3 mr-2" />
                <FaTimes onClick={clearImage} className="cursor-pointer" />
              </div>
            ) : (
              <div>
              </div>
            )}

            
          <textarea
            className="p-5 mb-5 border resize-none"
            placeholder="Type your message..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
            id="MessageArea"
            required
          />

          {error === '' ? null : (
            <p className="p-5 mt-5 mb-5 bg-red-500 text-white">{error}</p>
          )}

          <button
            onClick={SendMessage}
            className="p-3 bg-blue-500 w-[200px] text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscussionForum;
