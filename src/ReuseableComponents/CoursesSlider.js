import React from 'react';
import Slider from 'react-slick';
import Rating from 'react-rating';
import 'slick-carousel/slick/slick.css';
import 'font-awesome/css/font-awesome.min.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import FallbackImage from "../Image/Mobile.jpg";

export default function CoursesSlider({slides}) {
  const navigate = useNavigate();

    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      };

  // This function is used to average the rating and give a total rating
  // Calculate rating
  function calculateRating(ratings) {
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return (sum / ratings.length).toFixed(1);
  }
    
      const ratingSymbolStyle = {
        fontSize: '15px', 
      };


      const navigateToCourseDetails = (courseId) => {
        // Navigate to ModuleShow page with course details
        navigate(`/ModuleShow/${courseId}`);
      };

      
  // Handler for image load error
  const handleImageError = (e) => {
    e.target.src = FallbackImage; // Set the fallback image if the original fails to load
  };


  return (
    <div>
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index} onClick={() => slide.clickEvent(index)}>
            <img src={slide.image} alt={slide.title} onError={handleImageError} />
            <h3 className='mt-2 font-bold text-lg'>{slide.title}</h3>
            <p>{slide.description}</p>
            <div className="flex flex-col">
              <div className='flex flex-row space-x-1'>
                <p className='font-bold'>{slide.rating}</p>
                <Rating
                  readonly={true}
                  initialRating={slide.rating}
                  emptySymbol={<i className='fa fa-star-o' style={{ color: 'yellow' }}></i>}
                  fullSymbol={<i className='fa fa-star' style={{ color: 'yellow' }}></i>}
                  placeholderSymbol={<i className='fa fa-star-half-o' style={{ color: 'yellow' }}></i>}
                />
                <p className='text-sm text-gray-500'>({slide.enrollments})</p>
              </div>
              <button onClick={()=>navigateToCourseDetails(slide.id)} className="mt-3 w-40 border border-blue-700 hover:bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded">Enroll</button>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center w-200 bg-gray p-10">
        <p>More to come !</p>
        </div>
      </Slider>
    </div>
  );
}
