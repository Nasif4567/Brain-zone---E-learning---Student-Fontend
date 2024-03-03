import React from "react";
import SearchResultBox from '../SearchResult.';
import { BsBag } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import UserProfile from '../UserProfile';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import Logo from "../Logo/BrainZonee.png";
import { Link } from 'react-router-dom';
import filterCoursesByKeyword from "../FunctionReused/FilterCoursesByKeyword";



function NavigationSideBar() {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className='flex flex-row items-center justify-between w-full border-b p-3'>
  <div className='flex items-center'>
    <h1 className='text-2xl font-bold'><Link to="/BrowseCourses">BrainZone</Link></h1>
    <span className='ml-2 mr-10'><img src={Logo} alt="Logo" className="h-10 w-10" /></span>
        <p className='mr-5'><Link to="/EnrolledCourses">My Courses</Link></p>
        <p className='mr-5'><Link to="/resources">Resources</Link></p>
        <p className='mr-12'><Link to="/test">Test</Link></p>

    <div className='relative'>
      <input
        className='pl-10 pr-5 h-10 w-[500px] rounded-2xl border'
        placeholder="Search"
        type="search"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <FaSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' />

      {searchKeyword.length > 0 && (
        <div className='absolute top-full left-0 w-48'>
          <SearchResultBox
            resultSearch={filterCoursesByKeyword(searchKeyword)}
            className='bg-white border border-gray-300 shadow-md '
          />
        </div>
      )}
    </div>

  </div>

  <div className='flex items-center space-x-3'>

    <BsBag className='w-[50px] h-[20px]' />
    <FaBell className='w-[50px] h-[25px]' />

    <UserProfile/>
  </div>
</div>
  )
}

export default NavigationSideBar;
