import React, { useState, useEffect } from 'react';
import NavigationSideBar from './ReuseableComponents/NavigationSideBar';
import CoursesSlider from './ReuseableComponents/CoursesSlider';
import ImageSlider from './ReuseableComponents/ImageSlider';
import VideoProgressionView from './VideoProgrssionView';
import axios from 'axios';
import ChangeInterest from './ChangeInterest';
import { checkAuth } from './FunctionReused/checkAuth.js';
import { useNavigate } from 'react-router-dom';

export default function BrowseCourses() {
  const [searchResults, setSearchResults] = useState('');
  const [courses, setCourses] = useState([]);
  const [searchcourses, setSearchCourses] = useState([]);
  const [ChangeView, setChangeView] = useState(false);
  const [reloadCourses, setReloadCourses] = useState(false); 
  const navigate = useNavigate();
  const [courseProgression, setCourseProgression] = useState([]);

  useEffect(() => {
    const fetchProgression = async () => {
      try {
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:3001',
          withCredentials: true 
        });
        const response = await axiosInstance.post('/ViewModuleProgress', {});
        console.log('Progression data response:', response.data.data); // Log the response data

        // Ensure response.data is wrapped in an array if it's an object
        if (response.data) {
          const progressionData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
          setCourseProgression(progressionData);
          console.log('Set courseProgression:', progressionData); // Log the set data
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching progression data:', error);
      }
    };

    fetchProgression(); // Call the function to fetch progression data
  }, []);

  const fetchTopCoursesOnInterest = async () => {
    try {
      const response = await axios.post('http://localhost:3001/TopTenEnrollementCourses', null, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const coursesData = response.data.data[0];
        setCourses(coursesData);
      }
    } catch (error) {
      console.error('Error fetching other data:', error);
      console.log("Connected");
    }
  };

  const fetchSearchCourses = async (keyword) => {
    try {
      const response = await axios.post("http://localhost:3001/Search", { keyword });
      if (response.status === 200) {
        setSearchCourses(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
    fetchTopCoursesOnInterest();
    const savedSearchResults = localStorage.getItem('searchKeyword');
    if (savedSearchResults) {
      setSearchResults(savedSearchResults);
      fetchSearchCourses(savedSearchResults);
    }
  }, [reloadCourses]); 

  const sliderClick = (index) => {
    console.log(`Slide clicked: ${index}`);
  };

  const groupCoursesByCategory = () => {
    const groupedCourses = {};
    courses.forEach((course) => {
      const category = course.courseCategory;
      if (!groupedCourses[category]) {
        groupedCourses[category] = [];
      }
      groupedCourses[category].push({
        id: course.courseId,
        image: course.courseImage,
        title: course.courseName,
        description: course.courseCategory,
        enrollments: course.studentEnrolled,
        rating: course.courseRating,
        clickEvent: sliderClick,
      });
    });
    return groupedCourses;
  };

  const handleCloseChangeView = () => {
    setChangeView(false);
    setReloadCourses(prev => !prev); 
  };

  const renderCoursesByCategory = () => {
    const groupedCourses = groupCoursesByCategory();

    return Object.keys(groupedCourses).map((category) => (
      <div key={category}>
        <h1 className='text-2xl font-bold mt-10'>{`Popular Courses in ${category}`}</h1>
        <div className='mt-5'>
          <CoursesSlider slides={groupedCourses[category]} />
        </div>
      </div>
    ));
  };

  const renderFilteredCourses = () => {
    return (
      <div className='mt-5'>
        <CoursesSlider slides={searchcourses.map(course => ({
          id: course.courseID,
          image: course.courseImage,
          title: course.courseName,
          description: course.courseCategory,
          enrollments: course.studentEnrolled,
          rating: course.courseRating,
          clickEvent: sliderClick,
        }))} />
      </div>
    );
  };

  return (
    <div className='flex flex-col item-center w-auto justify-center m-5 overflow-hidden'>
      <NavigationSideBar />

      <div className='mr-10 ml-10 mt-10'>
        <ImageSlider />
      </div>

      {Array.isArray(courseProgression) && courseProgression.length > 0 && (
        <div className='mt-10 w-full p-5'>
          <h1 className='text-2xl font-bold'>Continue Learning</h1>
          <div className='flex flex-row'>
            {courseProgression.map((bar, index) => (
              <div key={index}>
                <VideoProgressionView data={bar} />
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults && (
        <div className='mt-10 w-full p-5'>
          <h1 className='text-2xl font-bold'>{`Because you searched "${searchResults}"`}</h1>
          <div>{renderFilteredCourses()}</div>
        </div>
      )}

      <div className='mt-5 w-full p-5'>
        <h1 className='text-4xl font-bold'>These are top suggestions based on your interest.</h1>
        <button onClick={() => setChangeView(true)} className='mt-4 p-3 bg-gray rounded'>Update and Change topic</button>
        {renderCoursesByCategory()}
      </div>

      {ChangeView && (
        <ChangeInterest handleCloseChangeView={handleCloseChangeView} />
      )}
    </div>
  );
}
