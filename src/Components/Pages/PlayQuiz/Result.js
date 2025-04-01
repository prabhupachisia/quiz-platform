import React from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = ({ name, score, resetQuiz }) => {
  const navigate = useNavigate();

  const handleDone = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="result-container">
      <div className="result-box">
        <h2>Hii {name} 👋</h2>
        <h1>Your Score is {score}</h1>
      </div>
      <button className="done-button" onClick={handleDone}>
        Done
      </button>
    </div>
  );
};

export default Result;
