import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderImg2 from '../Image/sliderimg2.jpg';
import SliderImg1 from '../Image/SliderImg1.jpg'
import SliderImg3 from '../Image/sliderimg3.jpg'

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
       <img src={SliderImg2} className="w-full h-[400px] object-cover" alt="Slide 2" />
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">Develop Yourself</div>
       </div>
        <div>
        <img src={SliderImg3} className="ml-20 w-5/6 h-[400px] object-cover" alt="Slide 1" />
        </div>
        <div>
        <img src={SliderImg1} className="ml-[400px] w-1/2 h-[400px] object-cover" alt="Slide 1" />
        </div>
      </Slider>
    </div>
  );
}
