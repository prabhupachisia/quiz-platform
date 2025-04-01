import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { playQuiz } from '../../../Redux/Actions/Actions';
import { useNavigate } from 'react-router-dom';
import "./PlayQuiz.css";

const PlayQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.name : "Guest";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/v1/quiz/getQuiz');
        setQuizzes(response.data);
      } catch (err) {
        setError("Failed to load quizzes. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Updated play function in PlayQuiz.js
  const play = async (id) => {
    if (!username || username.length < 1 || username.length > 50) {
      alert("Enter a valid name between 1 and 50 characters!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/v1/quiz/getQuiz/${id}`);
      const quizData = response.data;

      // Update both Redux and localStorage
      dispatch(playQuiz(quizData));
      localStorage.setItem("quizData", JSON.stringify(quizData));
      localStorage.setItem("quizId", id);

      navigate(`/quiz/${id}`);
    } catch (error) {
      console.error("Error starting quiz", error);
      alert("Failed to start the quiz. Please try again.");
    }
  };


  return (
    <div style={{ marginTop: "100px" }}>
      <div className="mainContainer">
        <div className="heading">
          <h1>PLAY QUIZ</h1>
        </div>
        <div className="quiz-description" style={{ textAlign: "center" }}>
          <h4>Select the quiz you want to play.</h4>
          <p><strong>Username:</strong> {username}</p>
          {loading ? (
            <p>Loading quizzes...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : quizzes.length === 0 ? (
            <p style={{ color: "black", fontStyle: "italic" }}>There are Currently No Quizzes!</p>
          ) : (
            <div className="quiz-list">
              {quizzes.map((quiz) => (
                <div key={quiz._id} className="quiz-card" onClick={() => play(quiz._id)}>
                  <h4>{quiz.title}</h4>
                  <p>{quiz.description}</p>
                  <p><strong>Category:</strong> {quiz.category}</p>
                  <p><strong>Difficulty:</strong> {quiz.difficulty}</p>
                  <p><strong>Duration:</strong> {quiz.duration} secs</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayQuiz;
