import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAnswer } from "../../../Redux/Actions/Actions";
import Result from "./Result";
import "./QuizCard.css";

function QuizCard() {
  const token = localStorage.getItem("accessToken");
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState({});
  const [disable, setDisable] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  // Redux state
  const quizData = useSelector((state) => state.reducer.playQuiz);
  const answers = useSelector((state) => state.reducer.answers);
  const name = useSelector((state) => state.reducer.name);

  // Extract quiz details
  const quiz = quizData?.questions || [];
  const title = quizData?.title || "Quiz";
  const quizId = quizData?._id || quizData?.quizId || null;

  // Dispatch for Redux actions
  const dispatch = useDispatch();

  // Timer setup
  useEffect(() => {
    setTimeLeft(quizData?.duration || 60); // Default duration is 60 seconds
  }, [quizData]);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleQuizEnd();
    }
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Handle end of quiz
  const handleQuizEnd = async () => {
    setShowModal(true);

    if (!quizId) {
      console.error("❌ Quiz ID is missing!");
      return;
    }

    try {
      console.log("📡 Sending final score to backend...");
      const correctAnswers = answers.filter((el) => el.isCorrect).length;

      await axios.post(
        `http://localhost:5000/v1/result/submit/${quizId}`,
        { score: correctAnswers },
        { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      console.log("✅ Score successfully sent!");
    } catch (error) {
      console.error("❌ Error sending score:", error.response?.data || error);
    }
  };

  // Handle next question logic
  const nextQuestionHandler = () => {
    dispatch(getAnswer(finalAnswer)); // Save answer in Redux
    setDisable(true);

    if (count >= quiz.length - 1) {
      handleQuizEnd();
    } else {
      setCount((prev) => prev + 1);
    }
  };

  // Handle option selection
  const onClickHandler = (optionNumber) => {
    getAnswerHandler(optionNumber, optionNumber === quiz[count]?.answer, count);
    setDisable(false);
  };

  // Store selected answer details
  const getAnswerHandler = (answer, isCorrect, id) => {
    setFinalAnswer({ answer, isCorrect, id });
  };

  return (
    <div className="outer">
      {showModal ? (
        <Result name={name} />
      ) : (
        <div id="container">
          <div className="title-container">
            <h2>{title}</h2>
          </div>
          <div className="timer-container">
            <h3>Time Left: {timeLeft}s</h3>
          </div>
          <h2>
            Q.{count + 1} {quiz[count]?.question || "Question not available"}
          </h2>
          <div className="options-container">
            {[1, 2, 3, 4].map((num) => (
              <div
                className={`quiz-option-container ${finalAnswer.answer === num ? "selected" : ""
                  }`}
                onClick={() => onClickHandler(num)}
                key={num}
              >
                <p>{quiz[count]?.[`option${num}`] || "Option not available"}</p>
              </div>
            ))}
          </div>
          <div className="quiz-footer">
            <h3>
              Question {count + 1}/{quiz.length}
            </h3>
            <button
              className="next-question-btn"
              onClick={nextQuestionHandler}
              disabled={disable}
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizCard;
