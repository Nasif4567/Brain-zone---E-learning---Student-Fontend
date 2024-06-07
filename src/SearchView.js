import React, { useState, useEffect } from 'react';
import NavigationSideBar from './ReuseableComponents/NavigationSideBar';
import CourseImage from "./Image/Mobile.jpg";
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {checkAuth} from './FunctionReused/checkAuth.js'

export default function SearchView() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(""); // Default keyword
    const [filterOption, setFilterOption] = useState("option1"); // Default filter option

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
        const keyword = localStorage.getItem('searchKeyword');
        if (keyword) {
            setSearchKeyword(keyword);
            fetchCourses(keyword);
        }
    }, []);

    useEffect(() => {
        filterCourses();
    }, [courses, filterOption]);

    const fetchCourses = async (keyword) => {
        try {
            const response = await Axios.post("http://localhost:3001/Search", { keyword });
            if (response.status === 200) {
                setCourses(response.data.data);
                console.log(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const filterCourses = () => {
        switch (filterOption) {
            case "option1": // Most Popular (Default)
                // Already sorted by enrollment (most popular)
                break;
            case "option2": // Most Rated
                setCourses([...courses].sort((a, b) => parseFloat(b.courseRating) - parseFloat(a.courseRating)));
                break;
            case "option3": // Latest
                setCourses([...courses].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));
                break;
            default:
                break;
        }
    }

    const navigateToCourseDetails = (courseId) => {
        // Navigate to ModuleShow page with course details
        navigate(`/ModuleShow/${courseId}`);
    };

    // Handler for image load error
  const handleImageError = (e) => {
    e.target.src = CourseImage; // Set the fallback image if the original fails to load
  };

    return (
        <div className='flex flex-col m-5'>
            <NavigationSideBar />

            <div className='flex flex-col m-5'>
                <h1 className="text-xl font-bold mb-4">{courses.length} Search Results for '{searchKeyword}'</h1>

                {/* Filter Section */}
                <div className="mb-4">
                    <label htmlFor="filter" className="text-lg font-semibold mr-5">Filter:</label>
                    <select id="filter" className="border border-gray-300 rounded-md py-2 px-4 mt-2"
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                    >
                        <option value="option1">Most Popular</option>
                        <option value="option2">Most Rated</option>
                        <option value="option3">Latest</option>
                    </select>
                </div>

                {/* Course Listing */}
                {courses.map((course, index) => (
                    <div key={index} className='grid grid-cols-2 gap-4 w-[2000px]'>
                        <div className="bg-white border mt-5 overflow-hidden flex">
                            <img src={course.courseImage} onError={handleImageError} alt="Course" className="w-72 h-full object-cover" />
                            <div className='flex flex-col p-5 w-full'>
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold">{course.courseName}</h2>
                                    <p className="text-gray-600 ml-auto">{course.coursePrice}$</p>
                                </div>
                                <p className="text-gray-600">{course.courseDescription}</p>
                                <p className="text-gray-600 mb-2">By {course.courseInstructor}</p>
                                <div className='flex items-center'>
                                    <p className='text-lg font-semibold mr-2'>{course.courseRating}</p>
                                    <Rating
                                        readonly={true}
                                        initialRating={course.courseRating}
                                        emptySymbol={<i className='fa fa-star-o text-yellow-500'></i>}
                                        fullSymbol={<i className='fa fa-star text-yellow-500'></i>}
                                    />
                                    <p className='text-sm text-gray-500 ml-2'>({course.studentEnrolled})</p>
                                </div>
                                <p className='text-gray-600 text-sm mt-2'>{course.courseDuration}</p>
                                <button onClick={() => navigateToCourseDetails(course.courseID)} className="mt-3 w-40 border border-blue-700 hover:bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded">Enroll</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
