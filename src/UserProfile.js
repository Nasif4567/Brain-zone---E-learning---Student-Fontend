import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Import icons as needed
import CourseImage from "./Image/Mobile.jpg";
import { useNavigate } from 'react-router-dom';
import { checkAuth } from './FunctionReused/checkAuth.js';

const UserProfile = () => {
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

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Clear the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Navigate to login
    nav('/login');
  };

  return (
    <Popup
      trigger={
        <div className='rounded-full overflow-hidden bg-gray-300 w-12 h-12 cursor-pointer'>
          <img src={CourseImage} alt="Profile" className='w-full h-full object-cover' />
        </div>
      }
      on='click'
      closeOnDocumentClick
    >
      <div className='bg-white border rounded-md p-2 shadow-md mr-5'>
        <div className='flex items-center space-x-2 hover:bg-gray p-2'>
          <FaUser className='text-gray-600' />
          <span className='cursor-pointer' onClick={() => nav('/AccountView')}>Profile</span>
        </div>
        
        <div className='flex items-center space-x-2 hover:bg-gray p-2'>
          <FaSignOutAlt className='text-gray-600' />
          <span onClick={handleLogout} className='cursor-pointer'>Logout</span>
        </div>
      </div>
    </Popup>
  );
};

export default UserProfile;
