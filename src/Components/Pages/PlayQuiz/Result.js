import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../../../Redux/Actions/Actions";
import "./Result.css";

const Result = ({ name }) => {
  const results = useSelector((state) => state.reducer.answers);
  const correctAnswers = results.filter((el) => el.isCorrect).length;
  const quizId = useSelector((state) => state.reducer.playQuiz._id); // Ensure quizId exists
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const sendScoreToBackend = async () => {
  //   if (!quizId) {
  //     console.error("❌ Quiz ID is missing!");
  //     return;
  //   }

  //   try {
  //     console.log("📡 Sending score to backend...");
  //     const response = await axios.post(
  //       `http://localhost:5000/v1/result/submit/${quizId}`,
  //       { score: correctAnswers },
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     console.log("✅ Score successfully sent:", response.data);
  //   } catch (error) {
  //     console.error("❌ Error sending score:", error.response?.data || error);
  //   }
  // };

  // useEffect(() => {
  //   sendScoreToBackend();
  // }, []);

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
