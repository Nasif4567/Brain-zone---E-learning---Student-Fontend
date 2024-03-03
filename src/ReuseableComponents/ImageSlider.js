import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CourseImage from '../Image/Mobile.jpg';
import SliderImg1 from '../Image/SliderImg1.jpg'

export default function ImageSlider() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...sliderSettings}>
        <div>
          <img src={SliderImg1} className="w-full h-[400px] object-cover" alt="Slide 1" />
        </div>
        <div>
          <img src={CourseImage} className="w-full h-[400px] object-cover" alt="Slide 2" />
        </div>
        <div>
          <img src={CourseImage} className="w-full h-[400px] object-cover" alt="Slide 3" />
        </div>
        <div>
          <img src={CourseImage} className="w-full h-[400px] object-cover" alt="Slide 4" />
        </div>
      </Slider>
    </div>
  );
}
