import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {checkAuth} from './FunctionReused/checkAuth.js'
import { useNavigate ,useParams } from 'react-router-dom';

function Quiz() {
  const [questions, setQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(3600); // Total time for the quiz
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true); 
  const nav = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    async function verifySession() {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
            nav('/login');
        }
    }
    verifySession();
}, []);


const fetchQuestion = async () => {
  try {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3001',
      withCredentials: true
    });

    const response = await axiosInstance.post("/getTest", { courseId: courseId });
    if (response.status === 200) {
      setQuestion(response.data.data[0].questions);
    } else {
      console.log('No questions found for this course.');
    }
  } catch (error) {
    console.error('Error fetching data:', error.response || error);
  }
};

useEffect(() => {
  
  fetchQuestion();
}, [courseId]);

  useEffect(() => {
    if (!showScore && timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setShowScore(true);
    }
  }, [timer, showScore]);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (userAnswer.toLowerCase().trim() === questions[currentQuestion].answer.toLowerCase().trim()) {
      setScore(score + 1);
    }
    setUserAnswer('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      console.log("trigger"+ currentQuestion)
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:3001',
          withCredentials: true 
      });
        const response = await axiosInstance.post('/CheckEnrollment', { courseID: courseId});
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


  return (
    <div className="flex flex-col m-5">
      <div className="border flex flex-col justify-center items-center w-full p-10">
      <h1 className='text-4xl'>Quiz Time</h1>
        {questions.length > 0 ? (
          showScore ? (
            <div className="score-section">
              <h2 className="text-2xl font-bold text-center mt-10 mb-4">Your Score: {score} out of {questions.length}</h2>
              <button
                className="ml-10 bg-red-500 text-white rounded-full px-6 py-3 hover:bg-red-700"
                onClick={()=>nav(`/ModuleShow/${courseId}`)}
              >Take Me back
              </button>
            </div>
          ) : (
            <div className="question-section w-full">
              <div className="timer text-center mb-4">
                Time Left: {Math.floor(timer / 60)} minutes {timer % 60}s
              </div>

              <div className="question-count mb-4">
                <span className="font-bold">Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text text-xl mb-6">{questions[currentQuestion].question}</div>
              <div className="option-container">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={handleAnswerChange}
                  className="text-input bg-white border border-gray-300 text-black rounded px-4 py-2 w-1/4"
                  placeholder="Type your answer here"
                />
              </div>
              <button
                className="next-button bg-green-500 text-white rounded-full px-6 py-3 mt-6 hover:bg-green-700 mr-2"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>

              <button
                className="next-button bg-red-500 text-white rounded-full px-6 py-3 mt-6 hover:bg-red-700"
                onClick={()=>nav(`/ModuleShow/${courseId}`)}
              >Cancel Quiz
              </button>
            </div>
            
          )
        ) : (
          <div>
            <h1>
            No Questions to View 
            </h1>
          <button
                className="next-button bg-red-500 text-white rounded-full px-6 py-3 mt-6 hover:bg-red-700"
                onClick={()=>nav(`/ModuleShow/${courseId}`)}
              >Take Me back
              </button>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default Quiz;
