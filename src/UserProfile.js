import React from 'react';
import Popup from 'reactjs-popup';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons as needed
import CourseImage from "./Image/Mobile.jpg";

const UserProfile = () => {
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
      <div className='bg-white border rounded-md p-2 shadow-md'>
        <div className='flex items-center space-x-2'>
          <FaUser className='text-gray-600' />
          <span>Profile</span>
        </div>
        <div className='flex items-center space-x-2'>
          <FaCog className='text-gray-600' />
          <span>Settings</span>
        </div>
        <div className='flex items-center space-x-2'>
          <FaSignOutAlt className='text-gray-600' />
          <span>Logout</span>
        </div>
      </div>
    </Popup>
  );
};

export default UserProfile;
