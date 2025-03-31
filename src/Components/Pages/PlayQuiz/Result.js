import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../../../Redux/Actions/Actions";
import "./Result.css";

const Result = ({ name }) => {
  const results = useSelector((state) => state.reducer.answers);
  const correctAnswers = results.filter((el) => el.isCorrect).length; // Ensure quizId exists
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetQuizHandler = () => {
    dispatch(resetQuiz());
    navigate("/leaderboard");
  };

  return (
    <div className="result-container">
      <div className="result-box">
        <h2>Hii {name} 👋</h2>
        <h1>Your Score is {correctAnswers}</h1>
      </div>
      <button className="done-button" onClick={resetQuizHandler}>
        Done
      </button>
    </div>
  );
};

export default Result;
