import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Registration from './Registration'
import CustomSelectionBox from './CourseSelect';
import EnrolledCourses from './EnrolledCourses';
import ModuleHome from './ModuleHome';
import DiscussionForum from './DicussionForum';
import AssignmentSubmission from './AssignmentSubmission';
import LearningMaterial from './LearningMaterial';
import BrowseCourses from './BrowseCourses';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Register" element={<Registration/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<BrowseCourses/>}/>
        <Route path="/CourseSelect" element={<CustomSelectionBox/>}/>
        <Route path="/EnrolledCourses" element={<EnrolledCourses />} />
        <Route path="/ModuleHome" element={<ModuleHome />} />
        <Route path="/DiscussionForum" element={<DiscussionForum />} />
        <Route path="/AssignmentSub" element={<AssignmentSubmission />} />
        <Route path="/LearningMaterials" element={<LearningMaterial/>} />
        <Route path="/BrowseCourses" element={<BrowseCourses/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);