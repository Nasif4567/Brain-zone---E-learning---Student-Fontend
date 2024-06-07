import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Registration from './Registration'
import CustomSelectionBox from './CourseSelect';
import EnrolledCourses from './EnrolledCourses';
import DiscussionForum from './DicussionForum';
import LearningMaterials from './LearningMaterial';
import BrowseCourses from './BrowseCourses';
import ShoppingCart from './ShoppingCart';
import Notification from './Notification';
import SearchView from './SearchView';
import ModuleShow from './ModuleShow';
import ReplyToForum from './ReplyToForum';
import AccountView from './AccountView';
import TakeTest from './TakeTest';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Register" element={<Registration/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<BrowseCourses/>}/>
        <Route path="/CourseSelect" element={<CustomSelectionBox/>}/>
        <Route path="/EnrolledCourses" element={<EnrolledCourses />} />
        <Route path="/DiscussionForum/:courseId" element={<DiscussionForum />} />
        <Route path="/LearningMaterials/:courseId/:contentID/:prog" element={<LearningMaterials/>} />
        <Route path="/LearningMaterials/:courseId" element={<LearningMaterials/>} />
        <Route path="/BrowseCourses" element={<BrowseCourses/>} />
        <Route path="/ShoppingCart" element={<ShoppingCart/>} />
        <Route path="/Notification" element={<Notification/>} />
        <Route path="/SearchView" element={<SearchView/>} /> 
        <Route path="/ModuleShow/:courseId" element={<ModuleShow/>} /> 
        <Route path="/AccountView" element={<AccountView/>} /> 
        <Route path="/ReplyToForum/:courseId/:discussion_id/:questionTitle" element={<ReplyToForum/>} /> 
        <Route path="/ReplyToForum/:courseId/:discussion_id/:messageid" element={<ReplyToForum/>} /> 
        <Route path='/TakeTest/:courseId' element={<TakeTest/>} />
        <Route path="/ReplyToForum/:courseId/:discussion_id/:questionTitle/:userid" element={<ReplyToForum/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);