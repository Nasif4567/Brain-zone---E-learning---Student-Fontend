import React from 'react'
import SliderImg1 from '../Image/SliderImg1.jpg'
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome styles
import Rating from 'react-rating';

export default function CourseBlockProgression() {
  return (
    <div>
            <img src={SliderImg1} alt={"Image"} />
            <h3 className='mt-2 font-bold text-lg'>Python Programming</h3>
            <p>This is a course</p>
            <div className="flex flex-col">
              <div className='flex flex-row space-x-1'>
                <p className='font-bold'>4.5</p>
                <Rating
                  readonly={true}
                  initialRating={4.5}
                  emptySymbol={<i className='fa fa-star-o' style={{ color: 'yellow' }}></i>}
                  fullSymbol={<i className='fa fa-star' style={{ color: 'yellow' }}></i>}
                  placeholderSymbol={<i className='fa fa-star-half-o' style={{ color: 'yellow' }}></i>}
                />
              </div>
            </div>
          </div>
  )
}
