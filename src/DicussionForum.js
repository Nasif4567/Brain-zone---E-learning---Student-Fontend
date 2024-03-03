import React from "react";
import NavigationSideBar from "./ReuseableComponents/NavigationSideBar";
import ModuleMenuNavigation from "./ReuseableComponents/ModuleMenuNavigation";
import { FaUser, FaImage } from "react-icons/fa";
import { Input } from "@mui/icons-material";

function DiscussionForum(){
  return(
    <div className="flex flex-col item-center justify-center overflow-y-auto">
        <NavigationSideBar/>
    <div className="flex flex-col item-center justify-center mt-5">
        <ModuleMenuNavigation/>

        <div>
        <h1 className="mt-5 text-2xl font-bold ">Discussion Forum</h1>
        <input className="p-5 rounded-xl mb-5 h-2 mt-5 border" placeholder="Search"/>
        </div>
        
        <div className=" p-4 rounded-md shadow-md">

        <div className="bg-white p-4 my-4 rounded-md shadow-md">
        <div className="flex items-center mb-2">
        <FaUser className="text-xl mr-2" />
        <div className="text-gray-700 font-semibold">Ahmed Nasif Shahriar</div>
        <div className="text-gray-500 ml-auto">1 Hour ago</div>
         </div>
        <div className="ml-6 text-gray-800">This is a message</div>
        </div>

        <div className="bg-white p-4 my-4 rounded-md shadow-md">
        <div className="flex items-center mb-2">
        <FaUser className="text-xl mr-2" />
        <div className="text-gray-700 font-semibold">Ahmed Nasif Shahriar</div>
        <div className="text-gray-500 ml-auto">1 Hour ago</div>
         </div>
        <div className="ml-6 text-gray-800">This is a message</div>
        </div>
      
        </div>


        
        <button className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                See More
              </button>


       <div className="flex flex-col mb-5 mt-10">
          <h1 className="mt-5 text-2xl font-bold mb-5">Ask Question</h1>
          <input className="p-5 mb-5 h-2 mt-2 border" placeholder="Question Title"/>

          <div className="flex items-center border p-2">
            <button className="mr-5 font-bold">
              <strong>B</strong>
            </button>
            <button className="mr-5 font-bold">
              <em>I</em>
            </button>
            <button className="mr-2 text-blue-500" >
              <FaImage />
            </button>
          </div>
          <textarea
            className="p-5 mb-5 border resize-none"
            placeholder="Type your message..."
          />
          <button
            className="p-3 bg-blue-500 w-[200px] text-white rounded-md hover:bg-blue-600">
            Send
          </button>
        </div>



    </div>

    </div>
  )
}

export default DiscussionForum