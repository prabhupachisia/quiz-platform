import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../../../Redux/Actions/Actions";
import "./Result.css";
import img from "../../Images/bg.png";

const Result = ({ name }) => {
  const results = useSelector(state => state.reducer.answers);
  const correctAnswers = results.filter(el => el.isCorrect).length;
  const totalQuestions = results.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetQuizHandler = () => {
    dispatch(resetQuiz());
    navigate("/");
  };

  return (
    <div className="result-container" style={{ backgroundImage: `url(${img})` }}>
      <div className="result-box">
        <h2>Hii {name} 👋</h2>
        <h1>Your Score is {correctAnswers} out of {totalQuestions}</h1>
      </div>
      <button className="done-button" onClick={resetQuizHandler}>Done</button>
    </div>
  );
};
export default Result;