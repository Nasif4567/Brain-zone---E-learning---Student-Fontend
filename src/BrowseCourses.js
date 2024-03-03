import React, { useState ,useEffect } from 'react';
import NavigationSideBar from './ReuseableComponents/NavigationSideBar';
import CourseImage from "./Image/Mobile.jpg";
import filterCoursesByKeyword from './FunctionReused/FilterCoursesByKeyword';
import recommendTopCourses from './FunctionReused/TopCourses';
import CoursesSlider from './ReuseableComponents/CoursesSlider';
import ImageSlider from './ReuseableComponents/ImageSlider';

export default function BrowseCourses() {
  const [searchResults, setSearchResults] = useState('');

  useEffect(() => {
  // Load search results from LocalStorage on component mount
  const savedSearchResults = localStorage.getItem('searchResults');
  if (savedSearchResults) {
    setSearchResults(savedSearchResults);
  }
}, []);


// Course dataset will be replaced by database and backned
  const courses = [
    { id: 1, image: CourseImage, title: "Android Mobile App Development", description: "This is a description", enrollments: 100, ratings: [4.5, 4.7, 4.2]  },
    { id: 2, image: CourseImage, title: "Swift", description: "This is a second description", enrollments: 80, ratings: [4.0, 4.2, 3.8] },
    { id: 3, image: CourseImage, title: "Kotlin", description: "This is a third description", enrollments: 20, ratings: [4.0, 4.8, 3.8] },
    { id: 4, image: CourseImage, title: "Flutter", description: "This is a fourth description", enrollments: 50, ratings: [4.0, 4.2, 3.8] },
    { id: 5, image: CourseImage, title: "Flutter and Dart", description: "This is a fifth description", enrollments: 50, ratings: [4.0, 4.2, 3.8] },
  ];



  // suggest top 4 courses based on enrollments count
  const topCourses = recommendTopCourses(courses, 4);

  // Then showed in the slider 
  const sliderClick = (index) => {
    console.log(`Slide clicked: ${index}`);
  };

  const slides = topCourses.map(Topcourse => ({
    id: Topcourse.id,
    image: Topcourse.image,
    title: Topcourse.title,
    description: Topcourse.description,
    enrollments:Topcourse.enrollments,
    rating: Topcourse.ratings,
    clickEvent: sliderClick,
  }));

  //========================================================================
  
  // Dont forget this the interst can change
  // Other show based on his enrollments
  // and other other developement topic which he might be interested in show topics 
  
  // This populated or show filtered courses in block
  const filteredCourses = filterCoursesByKeyword(searchResults); // the search result over here is coming from local host

  const renderFilteredCourses = () => {
    return filteredCourses.map((filteredcourse) => (
      <div key={filteredcourse.id} className='rounded-lg shadow-lg border p-5 min-w-[350px] max-w-[350px]'>
        <img className='rounded-lg' src={filteredcourse.image} alt={filteredcourse.title} />
        <h3 className='mt-2 font-bold text-lg'>{filteredcourse.title}</h3>
        <p>{filteredcourse.description}</p>
        {/* ... rest of course information rendering */}
      </div>
    ));
  };





  return (
    <div className='flex flex-col item-center w-auto justify-center m-5 overflow-hidden'>
        <NavigationSideBar/>

        <div className='mr-10 ml-10 mt-10'>
             <ImageSlider/>
        </div>

        <div className='mt-10 w-full p-5'>
          <h1 className='text-2xl font-bold'>Popular Courses in Mobile Development</h1>
          <div className='mt-5'>
            <CoursesSlider slides={slides}/>
          </div>
        </div>


        <div className='mt-10 w-full p-5'>
        <h1 className='text-2xl font-bold'>Because you searched "{searchResults}"</h1>
        <div className='mt-5 flex flex-row space-x-8 w-full overflow-x-auto'>
        {searchResults.length > 0 ? (
            renderFilteredCourses()
          ) : (
            <p>No results found</p>
          )}
        </div>
        </div>

  



    </div>
  );
}
