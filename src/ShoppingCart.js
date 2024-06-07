import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from './FunctionReused/checkAuth.js';
import NavigationSideBar from './ReuseableComponents/NavigationSideBar';
import FallbackImage from "./Image/Mobile.jpg";

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function verifySession() {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
            nav('/login');
        }
    }
    verifySession();
  }, [nav]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart.map(item => ({
      ...item,
      coursePrice: parseFloat(item.coursePrice)
    }));
    setCart(updatedCart);
  }, []);

  const insertNotification = async () => {
    const courseNames = cart.map(course => course.courseName).join(', ');
    const notification = {
      notiTitle: "You Purchased the course !",
      notiMessage: `This is confirmation that you have purchased the following course(s): ${courseNames}`,
      link: '/EnrolledCourses'
    };
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true 
      });
      await axiosInstance.post('/notificationInsertCheckout', notification , {withCredentials: true});
    } catch (error) {
      console.error('Error inserting notification:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/Checkout', {
        cart: cart.map(item => ({ courseID: item.courseID })),
      }, {
        withCredentials: true 
    });
      if (response.status === 200) {
        setCart([]);
        localStorage.removeItem('cart');
        await insertNotification();
        alert('Checkout successful!');
        window.location.reload()
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error during checkout. Please try again later.');
    }
  };


  const reduceFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.courseID !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="flex flex-col items-center m-5">
      <NavigationSideBar />
      <div className='flex flex-row'>
        <div className="container p-4 bg-gray-100 mr-18 mt-5 ml-20">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
              {cart.map((product) => (
                <div key={product.courseID} className="flex flex-row bg-white p-4 border w-[850px] shadow-md rounded-md mb-4">
                  <img src={product.courseImage} alt={`${product.courseName} Image`} onError={(e) => e.target.src = FallbackImage} className="w-48 h-38 object-cover mr-4" />
                  <div className="flex flex-col m-5">
                    <p className="text-lg font-semibold">{product.courseName}</p>
                    <p className="text-lg font-semibold">{product.courseDescription}</p>
                    <p className="text-lg font-semibold">{product.courseRating}</p>
                    <p className="text-gray-700 text-lg font-semibold">
                      ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.coursePrice)}
                    </p>
                  </div>
                  <button
                    onClick={() => reduceFromCart(product.courseID)}
                    className="bg-transparent text-black border p-2 h-10 w-32 ml-auto hover:bg-blue-500 hover:text-white font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className='border-b flex flex-col mt-20 h-[200px] shadow-md border rounded-md p-10'>
            <p className='mb-2'>Total:</p>
            <p className="text-4xl font-bold mb-4">
              ${cart.reduce((total, item) => total + item.coursePrice, 0)}
            </p>
            <button onClick={handleCheckout} className="bg-blue-500 text-white border p-2 h-[50px] w-72 ml-auto font-bold hover:bg-blue-600 rounded-md">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
