// App.js
import React from "react";
import NavigationSideBar from "./ReuseableComponents/NavigationSideBar";
import CourseImage from "./Image/Mobile.jpg";
import { BsMessenger } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function EnrolledCourses() {
  const navigate = useNavigate(); 

const goToCourse = ()=>{
      navigate('/ModuleHome');
}

  return (
    <div className=" flex flex-col item-center justify-center overflow-y-auto">
      <NavigationSideBar />
    
    <div className="flex">
      <div className="flex flex-col items-start justify-center bg-aliceblue p-10 w-[600px] h-auto bg-blue-96 mt-5 ml-10 rounded-sm">
        <h1 className="text-2xl font-bold mb-5">My Courses</h1>

        <input className="p-5 rounded-xl mb-5 h-2" placeholder="Search"/>

        <div className="grid grid-cols-2 gap-8">

          <div onClick={goToCourse} className="w-[260px] bg-white shadow-md rounded-lg cursor-pointer">
            <img src={CourseImage} alt="Course" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="mt-4 p-5">
              <h2 className="text-lg font-bold">Mobile App Development</h2>
              <p className="text-sm text-gray-600 mb-4">by Ahmed Shahriar</p>
            </div>
          </div>

          <div className="w-[260px] bg-white shadow-md rounded-lg">
            <img src={CourseImage} alt="Course" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="mt-4 p-5">
              <h2 className="text-lg font-bold">Mobile App Development</h2>
              <p className="text-sm text-gray-600 mb-4">by Ahmed Shahriar</p>
            </div>
          </div>

          <div className="w-[260px] bg-white shadow-md rounded-lg">
            <img src={CourseImage} alt="Course" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="mt-4 p-5">
              <h2 className="text-lg font-bold">Mobile App Development</h2>
              <p className="text-sm text-gray-600 mb-4">by Ahmed Shahriar</p>
            </div>
          </div>

          <div className="w-[260px] bg-white shadow-md rounded-lg">
            <img src={CourseImage} alt="Course" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="mt-4 p-5">
              <h2 className="text-lg font-bold">Mobile App Development</h2>
              <p className="text-sm text-gray-600 mb-4">by Ahmed Shahriar</p>
            </div>
          </div>

        </div>

      </div>

      <div className="bg-aliceblue ml-5 mt-5 min-w-4xl h-5/6 rounded-xl p-9">
      <h1 className="text-lg font-bold mb-5">Course Progress</h1>
      <div className="mb-5">
      <p>Mobile App Developement</p>
      <progress value={50} max="100"></progress>
      </div>

      <div>
      <p>OOP Developement</p>
      <progress value={50} max="100"></progress>
      </div>

      </div>

      <div className="bg-aliceblue ml-5 w-[300px] mt-5 h-5/6 rounded-xl p-9 mr-5">
      <h1 className="text-lg font-bold mb-5">Announcement</h1>
      <div className="p-5 bg-white mt-2">
            <BsMessenger/>
            <p>Hi , you have text from  your teacher..</p>
            </div>

            <div className="p-5 bg-white mt-2">
            <BsMessenger/>
            <p>Hi , you have text from  your teacher..</p>
            </div>

            <div className="p-5 bg-white mt-2">
            <BsMessenger/>
            <p>Hi , you have text from  your teacher..</p>
            </div>
      </div>

    </div>

    </div>
  );
}

export default EnrolledCourses;
