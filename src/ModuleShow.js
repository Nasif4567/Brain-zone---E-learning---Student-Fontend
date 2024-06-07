import React, { useState, useEffect } from "react";
import NavigationSideBar from "./ReuseableComponents/NavigationSideBar";
import ModuleMenuNavigation from "./ReuseableComponents/ModuleMenuNavigation";
import ProfilePic from "./Image/profilepic.jpg";
import Rating from 'react-rating';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {checkAuth} from './FunctionReused/checkAuth.js'
import FallbackImage from "./Image/Mobile.jpg";

function ModuleShow() {
    const [courseDetails, setCourseDetails] = useState([]);
    const [purchased, setPurchased] = useState(false);
    const { courseId } = useParams();
    const nav = useNavigate();

    
  useEffect(() => {
    async function verifySession() {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
            nav('/login');
        }
    }
    verifySession();
}, []);

useEffect(() => {
    const checkEnrollment = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3001/CheckEnrollment',
                {courseID: courseId}, 
                {withCredentials: true}
            );

            if (response.data.success && response.data.enrolled) {
                setPurchased(true);
            }
        } catch (error) {
            console.error("Error checking enrollment:", error);
        }
    };

    checkEnrollment();
}, []);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.post('http://localhost:3001/ModuleShow', { courseID: courseId });
                if (response.data.success) {
                    setCourseDetails(response.data.data);
                    //console.log(response.data.data);
                    console.log(response.data.data);
                } else {
                    console.error("Failed to fetch course details:", response.data.error);
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetails();
    }, []);


    // The handling of add to cart or view learning materials 
    const handleADORL = () => {
        if (purchased) {
            nav(`/LearningMaterials/${courseId}`);
        } else {
            const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

            const isAlreadyInCart = existingCartItems.some(item => item.courseID === courseId);
            
            if (!isAlreadyInCart) {
                const updatedCart = [...existingCartItems, ...courseDetails];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                window.location.reload();
            } else {
                alert('Product is already in the cart');
            }
        }
    };
    

    return (
        <div className="flex flex-col item-center overflow-y-auto m-5">
            <NavigationSideBar />
            <div className="flex flex-col ml-20 mt-2 mr-10 mb-10 item-center justify-start">
                {purchased && (
                    <div className="mt-5">
                        <ModuleMenuNavigation />
                    </div>
                )}

{courseDetails.map((detail, index) => (
    <div key={index} className="grid grid-cols-2 p-10 bg-aliceblue rounded-lg mt-5 h-[430px]">
        <div>
            <h1 className="mt-5 text-3xl font-bold mb-8">{detail.courseName}</h1>
            <p className="text-xl mb-5">{detail.courseDescription}</p>
            <p className="text-xl font-bold">{detail.courseRating}</p>
            <Rating
                readonly={true}
                initialRating={detail.courseRating}
                emptySymbol={<i className='fa fa-star-o' style={{ color: 'yellow' }}></i>}
                fullSymbol={<i className='fa fa-star' style={{ color: 'yellow' }}></i>}
                placeholderSymbol={<i className='fa fa-star-half-o' style={{ color: 'yellow' }}></i>}
            />
            <p className="text-lg mb-5 mt-3">{detail.studentEnrolled} students</p>
            <p className="text-lg mb-5 mt-3">Level {detail.courseDifficulty}</p>
            <p className="text-lg mb-5 mt-3">Created By {detail.courseInstructor}</p>
        </div>

        <div className="flex-col max-w-[350px] max-h-[450px] ml-auto">
            <div className="w-full h-[400px] bg-white shadow-md rounded-lg cursor-pointer overflow-hidden ">
            <img src={detail.courseImage} alt="Course" onError={(e) => e.target.src = FallbackImage}  className="object-fit rounded-t-lg" />
                <div className="mt-5 text-center p-1 bg-white">
                {purchased ? (          <div>
                                         <p className="text-lg text-black font-medium">Welcome to course !</p>
                                        <button onClick={()=>handleADORL()} className="mt-5 w-5/6 h-[40px] mb-5 bg-blue-500 text-white px-4 p-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                            Go to Course
                                        </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-5xl text-black font-medium">${detail.coursePrice}</p>
                                            <button onClick={()=>handleADORL()} className="mt-5 w-5/6 h-[40px] mb-5 bg-blue-500 text-white px-4 p-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                Add to Cart
                                            </button>
                                        </div>
                                    )}
                </div>
            </div>
        </div>
    </div>
))}



{courseDetails.map((detail, index) => (
    <div key={index} className="grid grid-cols-2 gap-7">
        <div className="p-5 border bg-aliceblue rounded-lg mt-5">
            <h1 className="mt-5 text-xl font-bold mb-5">Tutor</h1>
            <img src={ProfilePic} alt="Course" className="w-[100px] h-[100px] object-cover rounded-lg mb-4" />
            <p className="font-bold">{detail.courseInstructor}</p>
            <p className="font-bold">{detail.courseInstructorContact}</p>
        </div>
      

        <div className="p-5 border rounded-lg mt-5">
            <h1 className="mt-5 text-xl font-bold mb-5">Course Description</h1>
            <p>{detail.courseDescription}</p>
            <h1 className="mt-5 text-xl font-bold mb-5">Course Duration</h1>
            <p>{detail.courseDuration}</p>
            <h1 className="mt-5 text-xl font-bold mb-5">Course Outcome</h1>
            <p>{detail.courseOutcome}</p>
        </div>
    </div>
))}


            </div>
        </div>
    );
}

export default ModuleShow;
