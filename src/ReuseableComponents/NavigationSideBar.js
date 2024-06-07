import React, { useState, useEffect } from "react";
import SearchResultBox from "../SearchResult.";
import { BsBag } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import UserProfile from "../UserProfile";
import { FaSearch } from "react-icons/fa";
import Logo from "../Logo/BrainZonee.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

function NavigationSideBar() {
  const [Keyword, setSearchKeyword] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [notiCount, setNotiCount] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    // Retrieve cart data from localStorage and get the number of items
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(storedCart.length);

    // Fetch all notifications and count unread ones
    fetchNotifications();
  }, []);

  // Function to fetch all notifications and count unread ones
  const fetchNotifications = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true 
    });
      const response = await axiosInstance.post("/notifications");
      const notifications = response.data.data;
      const unreadNotifications = notifications.filter((noti) => !noti.read);
      setNotiCount(unreadNotifications.length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Function to handle search submission
  const handleSearchSubmit = () => {
    if (Keyword.trim() !== "") {
      localStorage.setItem("searchKeyword", Keyword.trim());
      nav("/SearchView");
      window.location.reload();
    }
  };

  // Event listener for Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full border-b p-3">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/BrowseCourses">BrainZone</Link>
        </h1>
        <span className="ml-2 mr-10">
          <img src={Logo} alt="Logo" className="h-10 w-10" />
        </span>
        <p className="mr-48">
          <Link to="/EnrolledCourses">My Courses</Link>
        </p>

        <div className="relative">
          <input
            className="pl-10 pr-5 h-10 w-[500px] rounded-2xl border"
            placeholder="Search names, categories.."
            type="search"
            value={Keyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown} // Event listener for Enter key
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />

          {Keyword.length > 0 && (
            <div className="absolute top-full left-0 w-48 z-50">
              <SearchResultBox
                keyword={Keyword}
                className="bg-white border border-gray-300 shadow-md "
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <BsBag
          onClick={() => nav("/ShoppingCart")}
          className="w-[50px] h-[20px] cursor-pointer"
        />

        {notiCount > 0 && (
          <div className="absolute top-10 right-[95px] bg-blue-700 text-white rounded-full h-5 w-5 flex items-center justify-center">
            {notiCount}
          </div>
        )}

        {cartItemCount > 0 && (
          <div className="absolute top-10 right-[155px] bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount}
          </div>
        )}
        <BsBell
          onClick={() => nav("/Notification")}
          className="w-[50px] h-[25px] cursor-pointer"
        />
        <UserProfile />
      </div>
    </div>
  );
}

export default NavigationSideBar;
