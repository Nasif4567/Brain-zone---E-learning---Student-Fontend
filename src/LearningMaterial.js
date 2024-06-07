import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {checkAuth} from './FunctionReused/checkAuth.js'

function LearningMaterial() {
  const [played, setPlayed] = useState(0.0);
  const [selectedContentID, setSelectedContentID] = useState(null);
  const playerRef = useRef(null);
  const [isVideoView, setVideoView] = useState(false);
  const [isSlideOpen, setSlideOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [coltri, setcoltri] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [learningMaterials, setLearningMaterials] = useState([]);
  const nav = useNavigate();
  const { courseId, contentID, prog } = useParams();

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
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:3001',
          withCredentials: true 
      });
      const response = await axiosInstance.post('/CheckEnrollment', { courseID: courseId });
      console.log("Enrollment Check Response:", response.data); // Log the response data
      if (response.data.success && response.data.enrolled) {
        console.log("User is enrolled"); // Log if user is enrolled
        setPurchased(true);
      } else {
        console.log("User is not enrolled"); // Log if user is not enrolled
      }
    } catch (error) {
      console.error("Error checking enrollment:", error);
    } finally {
      setLoading(false); // Set loading to false after enrollment check completes
    }
  };

  checkEnrollment();
}, [courseId]);

useEffect(() => {
  if (!loading && !purchased) { // Navigate only after loading is complete and purchased is true
    nav("/BrowseCourses");
  }
}, [loading, purchased, nav]);


  useEffect(() => {
    fetchLearningMaterials();
    if (!coltri){
    if (contentID) {
      const selectedMaterial = learningMaterials.find(material => material.contentID === contentID);
      if (selectedMaterial) {
        handleVideoClick("kotlin",contentID)
        setcoltri(true);
      }
    }
  }
  }, [contentID]);

  const fetchLearningMaterials = async () => {
    try {
      const response = await axios.post('http://localhost:3001/LearningMaterials', {
        courseID: courseId
      });
      const materials = response.data.data;
      setLearningMaterials(materials);
      console.log(materials)
      
    } catch (error) {
      console.error('Error fetching learning materials:', error);
    }
  };

  const handleVideoClick = (title, contentID) => {
    setVideoView(true);
    setSlideOpen(false);
    setSelectedContentID(contentID);
  };

  const handleSlidesClick = (slidesURL) => {
    setVideoView(false); // Ensure that video view is set to false when slides are clicked
    const link = document.createElement('a');
    link.href = slidesURL;
    link.download = 'slides.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleSeek = (progress) => {
    setPlayed(progress.played);
  };

  const handleReady = (contentID) => {
    return () => {
      const material = learningMaterials.find((material) => material.contentID === contentID);
      const player = playerRef.current;
      if (material && player && !player.getCurrentTime()) {
        const seekTime = parseFloat(prog); // Convert prog to a float
        if (!isNaN(seekTime) && isFinite(seekTime)) {
          if (material.contentID === selectedContentID) { // Check if this is the selected content
            player.seekTo(seekTime); // Set the seek time for the selected content
            setPlayed(seekTime); // Set the initial progress
          }
        } else {
          console.error('Invalid seek time:', prog);
        }
      }
    };
  };

  const insertProgression = async (progress) => {
    try {
      const material = learningMaterials.find(material => material.contentID === selectedContentID);
      if (!material) {
        console.error('Selected material not found.');
        return;
      }
      
      const contentID = material.contentID;

      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true 
    });
  
      await axiosInstance.post('/InsertProgress', {
        CourseName: material.contentTitle,
        contentID: contentID,
        Progress: progress,
        courseID : courseId
      });

    } catch (error) {
      console.error('Error inserting progression data:', error);
    }
  };

  return (
    <div className="flex items-start justify-start">
      <div className="w-[400px] h-screen border border-gray">
        <div className="flex p-5 flex-col bg-black text-white">
          <p>Topics</p>
          <h1 className="text-2xl">Learning Material</h1>
        </div>

        {learningMaterials.map((materials, index) => (
  <Collapsible
    key={index}
    className="border"
    trigger={
      <div
        className={`flex items-center p-7 ${materials.contentID === selectedContentID ? 'bg-gray' : 'bg-white'}`}
        onClick={() => {handleVideoClick(materials.contentTitle, materials.contentID); setcoltri(true)}}
      >
        <span className="font-bold text-lg">{materials.contentTitle}</span>
        <FontAwesomeIcon icon={faAngleDown} className="ml-6" />
      </div>
    }
    triggerWhenOpen={
      <div className="flex items-center p-7">
        <span className="font-bold text-lg">{materials.contentTitle}</span>
        <FontAwesomeIcon icon={faAngleDown} className="ml-6 transform rotate-180" />
      </div>
    }
    open={materials.contentID === selectedContentID} 
  >
    <div
      onClick={() => handleVideoClick(materials.contentTitle, materials.contentID)}
      className={`p-7 border cursor-pointer ${isVideoView ? 'bg-gray' : 'bg-white'}`}
    >
      Videos
    </div>
    <div
      onClick={() => handleSlidesClick(`http://localhost:3001/${materials.contentURL}`)}
      className={`p-7 border cursor-pointer ${isSlideOpen ? 'bg-gray' : 'bg-white'}`}
    >
      Download Slides
    </div>
  </Collapsible>
))}

      </div>

      <div className="flex flex-col w-full bg-gblue h-screen">
        <div className="flex p-5 flex-col bg-white shadow-lg">
          <p className="cursor-pointer" onClick={() => {nav(`/ModuleShow/${courseId}`) ; insertProgression(played)} }>
            Save Progression and Back
          </p>
        </div>

        {isVideoView && (
          <div className="flex flex-col item-center justify-center mt-24 ml-32">
            {learningMaterials.map((materials, index) => (
              <div key={index} style={{ display: materials.contentID === selectedContentID ? 'block' : 'none' }}>
                <ReactPlayer
                  ref={playerRef}
                  url={`http://localhost:3001/${materials.videoURL}`}
                  width="90%"
                  height="500px"
                  controls={true}
                  onProgress={handleProgress}
                  onReady={handleReady(materials.contentID)}
                  onSeek={handleSeek}
                />
              </div>
            ))}
          </div>
        )} 
      </div>
    </div>
  );
}

export default LearningMaterial;
