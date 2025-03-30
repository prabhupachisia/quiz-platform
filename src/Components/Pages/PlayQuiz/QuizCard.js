import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer } from "../../../Redux/Actions/Actions";
import Result from "./Result";
import "./QuizCard.css";

function QuizCard() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState({});
  const [disable, setDisable] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const quizData = useSelector((state) => state.reducer.playQuiz);
  const quiz = quizData.questions;
  const title = useSelector((state) => state.reducer.title);
  const name = useSelector((state) => state.reducer.name);
  const dispatch = useDispatch();

  useEffect(() => {
    if (quizData.timer) {
      setTimeLeft(quizData.timer);
    }
  }, [quizData]);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowModal(true);
    }
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const nextQuestionHandler = () => {
    dispatch(getAnswer(finalAnswer));
    setDisable(true);
    if (count >= quiz.length - 1) {
      setShowModal(true);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const onClickHandler = (el) => {
    getAnswerHandler(el.answer, el.correct, el.id);
    setDisable(false);
  };

  const getAnswerHandler = (answer, correct, id) => {
    setFinalAnswer({ answer, isCorrect: correct, id });
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
          <h2>Q.{count + 1} {quiz[count].question}</h2>
          <div className="options-container">
            {quiz[count].answers.map((el, i) => (
              <div
                className={`quiz-option-container ${finalAnswer.id === el.id ? "selected" : ""}`}
                onClick={() => onClickHandler(el)}
                key={i}
              >
                <p>{el.answer}</p>
              </div>
            ))}
          </div>
          <div className="quiz-footer">
            <h3>Question {count + 1}/{quiz.length}</h3>
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
