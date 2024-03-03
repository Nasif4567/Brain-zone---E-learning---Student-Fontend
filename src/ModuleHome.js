import React from "react";
import NavigationSideBar from "./ReuseableComponents/NavigationSideBar";
import ModuleMenuNavigation from "./ReuseableComponents/ModuleMenuNavigation";
import CourseImage from "./Image/Mobile.jpg";
import ProfilePic from "./Image/profilepic.jpg"
import { useNavigate } from 'react-router-dom';
import { BsMessenger } from "react-icons/bs";




function ModuleHome(){
    const navigate = useNavigate()
    const gotToLearningMaterial = ()=>{
        navigate('/LearningMaterials');
    }
  return(
    <div className="flex flex-col item-center overflow-y-auto">
        <NavigationSideBar/>
    <div className="flex flex-col m-10 item-center justify-start mt-5">
        <ModuleMenuNavigation/>
        <div className="p-5 bg-aliceblue rounded-lg mt-5">
        <h1 className="mt-5 text-2xl font-bold mb-5">Mobile App Developement</h1>
        </div>
    <div className="grid grid-cols-2 gap-1">

    <div className="p-10 bg-aliceblue w-[550px] rounded-lg mt-5">  
    <h1 className="mt-5 text-2xl font-bold mb-5">Module Home</h1>
        <div className="flex space-x-5">
    <div onClick={gotToLearningMaterial} className="w-[220px] bg-white shadow-md rounded-lg cursor-pointer">
            <img src={CourseImage} alt="Course" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="mt-4 p-5">
              <h2 className="text-lg font-bold">Learning Materials</h2>
            </div>
          </div>  

          <div className="w-[220px] bg-white shadow-md rounded-lg cursor-pointer">
            <img src={CourseImage} alt="Course" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="mt-4 p-5">
              <h2 className="text-lg font-bold">Resources</h2>
            </div>
          </div>        

        </div> 
        </div>  

        <div className="bg-aliceblue ml-5 w-[500px] mt-5 h-5/6 rounded-xl p-9 mr-5">
      <h1 className="text-lg font-bold mb-5">Activity Feed</h1>
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

      <div className="p-5 bg-aliceblue rounded-lg mt-5 mb-5 w-[400px]">
        <h1 className="mt-5 text-xl font-bold mb-5">Tutor Contact</h1>
        <img src={ProfilePic} alt="Course" className="w-[100px] h-[100px] object-cover rounded-lg mb-4" />
        <p className="font-bold">Vesilios Germanos</p>
        <p  className="font-bold">+4473749590</p>
        <p  className="font-bold">Phd in Computer Science</p>
        </div>

      </div>

        <div>
    </div>


    </div>
  )
}

export default ModuleHome