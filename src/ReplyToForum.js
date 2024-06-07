import React, { useState, useEffect } from "react";
import NavigationSideBar from "./ReuseableComponents/NavigationSideBar";
import ModuleMenuNavigation from "./ReuseableComponents/ModuleMenuNavigation";
import { FaUser, FaImage } from "react-icons/fa";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {checkAuth} from './FunctionReused/checkAuth.js'

function ReplyToForum() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState(5);
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  const { discussion_id } = useParams();
  const { questionTitle } = useParams();
  const { userid } = useParams();
  const nav = useNavigate();
  

  const insertNotification = async () => {
    const notification = {
      notiTitle: "A Reply has been posted to your Question :",
      notiMessage: questionTitle + ": " + (content.slice(0, 10) + ".."),
      ReplyPersonUserID: userid,
      link: `/ReplyToForum/${courseId}/${discussion_id}/${questionTitle}`
    };
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true 
    });
      await axiosInstance.post('/notificationInsert', notification);
    } catch (error) {
      console.error('Error inserting notification:', error);
    }
  };


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
    const response = await axiosInstance.post("/reply", { discussion_id, content});
    if (response.status === 201) {
      console.log("Message sent");
      setContent('');
      setError('');
      insertNotification();
      window.location.reload();
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
      const response = await axios.post("http://localhost:3001/viewReply",{discussion_id : discussion_id });
      if (response.status === 200) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.log(error);
      console.log("Reply not found!")
    }
  };

  useEffect(() => {
    const checkEnrollment = async () => {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true 
    });
      try {
        const response = await axiosInstance.post('/CheckEnrollment', { courseID: courseId});
        console.log("Enrollment Check Response:", response.data);
        if (response.data.success && response.data.enrolled) {
          console.log("User is enrolled");
          setPurchased(true);
        } else {
          console.log("User is not enrolled");
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
      } finally {
        setLoading(false);
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

  return (
    <div className="flex flex-col item-center justify-center overflow-y-auto m-5">
      <NavigationSideBar />
      <div className="flex flex-col item-center justify-center mt-10 mr-20 ml-20 mb-10">
        <ModuleMenuNavigation />

        <div>
          <h1 className="mt-5 text-2xl font-bold">Reply Forum - {questionTitle}</h1> {/* Display question title */}
          <input className="p-5 rounded-xl mb-5 h-2 mt-5 border" placeholder="Search" />
        </div>

        <div className="p-4 border overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-gray-600 text-center">No replies yet.</div>
          ) : (
            messages.slice(-visibleMessages).map((message, index) => (
              <div id={`message_${message.message_id}`} key={index} className="bg-white p-4 my-4 border shadow-md">
                <div className="flex items-center mb-2">
                  <FaUser className="text-xl mr-2" />
                  <div className="text-gray-700 font-semibold">User : {message.user_id}</div>
                  <div className="text-gray-500 ml-auto">{new Date(message.created_at).toLocaleString()}</div>
                </div>
                <div className="ml-6 text-gray-800 border p-5">{message.content}</div>

                {message.image ? (
              <div className="ml-6 flex items-center">
                <img src={message.image} alt="Uploaded" className="w-72 h-72 mt-3 mr-2" />
              </div>
            ) : (
              <div>
              </div>
            )}

                <div className="flex justify-end mt-2">
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
            Reset
          </button>
        )}

        <div className="flex flex-col mb-5 mt-10">
          <h1 className="mt-5 text-2xl font-bold mb-5">Reply to Question</h1>

          <textarea
            className="p-5 mb-5 border resize-none"
            placeholder="Type your reply..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
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

export default ReplyToForum;
