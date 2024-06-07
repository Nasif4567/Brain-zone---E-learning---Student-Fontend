import React, { useState, useEffect } from "react";
import NavigationSideBar from "./ReuseableComponents/NavigationSideBar";
import CourseImage from "./Image/Mobile.jpg";
import { useNavigate } from 'react-router-dom';
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import {checkAuth} from './FunctionReused/checkAuth.js'

function EnrolledCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [ratingView, setRatingView] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    async function verifySession() {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          navigate('/login');
        }
    }
    verifySession();
}, []);

  useEffect(() => {
    ViewEnrolledCourses();
  }, []);

  const ViewEnrolledCourses = async () => {
    try {
      const response = await axios.post('http://localhost:3001/EnrolledCoursesView', null, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setEnrolledCourses(response.data.data);
        console.log(response.data.data)
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleRating = (course) => {
    setSelectedCourse(course);
    setRatingView(true);
  }

  const submitRating = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true 
    });
      const response = await axiosInstance.post('/submitRating', {
        courseId: selectedCourse.courseID,
        rating: rating,
        feedback: feedback
      });

      if (response.status === 200) {
        setRatingView(false);
        // Update enrolledCourses state to reflect that the user has rated this course
        setEnrolledCourses(prevCourses => prevCourses.map(course => {
          if (course.courseID === selectedCourse.courseID) {
            return { ...course, hasRated: true };
          }
          return course;
        }));
        // You may want to update the state or show a message indicating successful submission
      }
    } catch (error) {
      console.log(error.response);
      // Handle error
    }
  }

  // Handler for image load error
  const handleImageError = (e) => {
    e.target.src = CourseImage; // Set the fallback image if the original fails to load
  };

  return (
    <div className="flex flex-col item-center justify-center overflow-y-auto m-5">
      <NavigationSideBar />
      <div className="flex flex-row">
        <div className="flex flex-col items-start justify-center p-10 h-auto bg-blue-96 mt-5 ml-10">
          <h1 className="text-2xl font-bold mb-5">My Courses</h1>
          <div className="grid grid-cols-4 gap-10">
            {enrolledCourses.map((course, index) => (
              <div key={index} className="border bg-white shadow-md rounded-lg cursor-pointer w-[300px]">
                 <img src={course.courseImage} onError={handleImageError} alt="Course" className="w-full object-cover rounded-t-lg" />
                <div className="mt-4 p-5">
                  <div onClick={() => navigate(`/ModuleShow/${course.courseID}`)}>
                    <h2 className="text-lg mb-4 font-bold">{course.courseName}</h2>
                    <p className="text-sm text-gray-600 mb-2">by {course.courseInstructor}</p>
                    {course.hasRated ? (
                      <p className="text-sm text-gray-600">Rating already made</p>
                    ) : (
                      <p className="text-sm text-gray-600">Leave a rating</p>
                    )}
                  </div>
                  <Rating
                    readonly={false}
                    initialRating={0}
                    emptySymbol={<i className='fa fa-star-o' style={{ color: 'yellow' }}></i>}
                    fullSymbol={<i className='fa fa-star' style={{ color: 'yellow' }}></i>}
                    onClick={() => handleRating(course)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {ratingView && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col space-y-5">
      <div className="flex justify-end">
        <button className="text-sm" onClick={() => setRatingView(false)}>Close</button>
      </div>
      <h1 className="font-bold text-xl">Place Rating</h1>
      <Rating
        readonly={false}
        initialRating={rating}
        onChange={(value) => setRating(value)}
        emptySymbol={<i className='fa fa-star-o 3xl' style={{ color: 'yellow', fontSize: '50px' }}></i>}
        fullSymbol={<i className='fa fa-star 3xl' style={{ color: 'yellow', fontSize: '50px' }}></i>}
      />
      <input className="border p-3" placeholder="Leave your feedback" onChange={(e) => setFeedback(e.target.value)} />
      <button className="border p-2 bg-gray" onClick={submitRating}>Send Feedback</button>
    </div>
  </div>
)}



    </div>
  );
}

export default EnrolledCourses;
