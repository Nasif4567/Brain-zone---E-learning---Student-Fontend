import React, { useEffect,useState } from 'react';
import progimage from "./Image/progimage.jpg";
import { BsPlay } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function VideoProgressionView({ data }) {
  const [progress, setProgress] = useState(0); // State to hold the progress
  const [progressbar, setProgressbar] = useState(0);
  const [courseID, setCourseID] = useState("");
  const [contentID, setContentID] = useState("");
  const [courseName, setCourseName] = useState(""); // State to hold the course name
  const nav = useNavigate();

  useEffect(() => {
    if (data) {
      setProgress(data.Progress * 100); // Assuming progress is a decimal (e.g., 0.606757)
      setProgressbar(Math.round(data.Progress * 100)); // Percentage for display
      setCourseID(data.courseID);
      setContentID(data.contentID);
      setCourseName(data.CourseName);
    }
  }, [data]);

  return (
    <div className='flex mt-5 border mr-5'>
      <div className="relative cursor-pointer">
        <div className="absolute">
          <BsPlay size={50} />
        </div>
        <img className='w-56' src={progimage} alt={'Image'} />
      </div>

      <div className="flex flex-col justify-between"> {/* Content container */}
        <div onClick={() => nav(`/LearningMaterials/${courseID}/${contentID}/${progress / 100}`)} className='mt-4 ml-3 mr-10 cursor-pointer'>
          <h3 className='mt-2 font-bold text-lg'>Topic-{courseName}</h3>
          {progressbar > 0 ? (
            <h2 className='font-bold text-sm text-gray-500'>{progressbar}% complete</h2>
          ) : (
            <p className='font-bold text-sm text-gray-500'>Go to the course</p>
          )}
        </div>

        {progressbar > 0 && (
          <div className="mt-0">
            <div className="w-auto bg-blue-500 h-2" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
