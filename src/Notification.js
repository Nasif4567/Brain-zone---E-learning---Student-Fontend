import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsBell } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import NavigationSideBar from './ReuseableComponents/NavigationSideBar';
import { checkAuth } from './FunctionReused/checkAuth.js';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function verifySession() {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        nav('/login');
      }
    }
    verifySession();
  }, [nav]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:3001',
          withCredentials: true 
      });

        const response = await axiosInstance.post('/notifications' );
        setNotifications(response.data.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    }
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notificationID, link) => {
    try {
      await axios.put('http://localhost:3001/notificationReadStatus', { notificationID });
      setNotifications(prevNotifications =>
        prevNotifications.map(noti =>
          noti.notificationID === notificationID ? { ...noti, read: true } : noti
        )
      );
      nav(link);
    } catch (error) {
      console.error('Failed to update notification status:', error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen m-5'>
      <NavigationSideBar />
      <div className='flex flex-col items-start justify-center bg-gray-100 mt-10 ml-32'>
        <div className='w-5/6 p-8 bg-white shadow-lg rounded-md'>
          <h1 className='text-3xl font-bold mb-6'>Notifications</h1>
          {notifications.slice().reverse().map((noti, index) => (
            <div key={index} onClick={() => handleNotificationClick(noti.notificationID, noti.link)} className={`border cursor-pointer rounded-md p-6 mb-4 ${noti.read ? 'bg-gray-200' : 'bg-LightGray'}`}>
              <div className='flex items-center mb-4'>
                <BsBell className='text-2xl mr-4' />
                <h2 className='font-bold text-lg'>{noti.notiTitle}</h2>
              </div>
              <p className='text-gray-700'>{noti.notiMessage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
