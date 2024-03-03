import React, { useState, useEffect,useRef } from 'react';
import ReactPlayer from 'react-player';
import { pdfjs } from 'react-pdf';
import PdfViewer from './ReuseableComponents/PdfViewer';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const ToggleContainer = () => {
  const [isContainerVisible, setContainerVisibility] = useState(false);

  //------------------------------------------------------------
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const storedPlayed = localStorage.getItem('videoPlayed');
    if (storedPlayed) {
      setPlayed(parseFloat(storedPlayed));
    }
  }, []);

  const handleProgress = (progress) => {
    // Update the played state and localStorage
    setPlayed(progress.played);
    localStorage.setItem('videoPlayed', progress.played.toString());
  };

  const handleReady = () => {
    // Get the reference to the ReactPlayer component
    const player = playerRef.current;

    // Set the playback position using the stored played value
    if (player) {
      player.seekTo(played);
    }
  };

  const handleDuration = (duration) => {
    setTotalDuration(duration);
  };


  /*const convertToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }; 
  console.log("Total Progression is " + convertToMinutes(played) + " out of " + convertToMinutes(totalDuration));*/

//-------------------------------------------------------------------------------

  const[isVideoView , setVideoView] = useState(false)
  const[isSlideOpen , setSetSlide] = useState(false)

  const OpenPlayer = ()=>{
    setVideoView(!isVideoView)
    setSetSlide(false)
  }

  const OpenSlide = ()=>{
    setSetSlide(!isSlideOpen)
    setVideoView(false)
  }

  const toggleContainer = () => {
    setContainerVisibility(!isContainerVisible);
  };

  return (
    <div className="flex items-start justify-start">
    <div className='w-[400px] h-screen border border-gray'>
        <div className='flex p-5 flex-col bg-black text-white'>
            <p>Mobile Application</p>
            <h1 className='text-2xl'>Learning Material</h1>
        </div>
      <div className="flex flex-col bg-white p-2 border cursor-pointer">
      <div className="flex bg-white p-2 rounded-md border">
        <h1 className="text-lg mr-8 font-bold mb-4">Kotlin Programming</h1>
        <span onClick={toggleContainer} className="mr-2">&#9662;</span>
       </div>

        {isContainerVisible && (
          <div className="mt-4">
            <div onClick={OpenPlayer} className="bg-gray-300 p-4 mb-2 rounded-md">Videos</div>
            <div onClick={OpenSlide} className="bg-gray-300 p-4 mb-2 rounded-md">Slides</div>
          </div>
        )}
      </div>
    </div>

   <div className='flex flex-col w-full bg-gblue h-screen'>
   
    <div className='flex p-5 flex-col bg-white shadow-lg border'>
            <p>Back</p>    
    </div>
    

    { isVideoView && (
    <div className='flex flex-col item-center justify-center mt-24 ml-32'>
       
      <ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=xT8oP0wy-A0"
        width="90%"
        height="500px"
        controls={true}
        onProgress={handleProgress}
        onReady={handleReady}
        onDuration={handleDuration}
      />

    </div> 
)}  

{ isSlideOpen &&
    <div>
    <PdfViewer/>
    </div> 
}
</div>


    </div>
  );
};

export default ToggleContainer;
