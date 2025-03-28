import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addQuiz } from "../../../Redux/Actions/Actions";
import "./NewQuizForm.css";

const NewQuizForm = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const difficultyRef = useRef();
  const timerRef = useRef();
  const questionRef = useRef();
  const answerRef = useRef();
  const CorrectAnswerRef = useRef();

  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  const [answerDone, setAnswerDone] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const addedTimeout = setTimeout(() => {
      if (added) {
        setAdded(false);
      }
    }, 2000);

    const answerDoneTimeout = setTimeout(() => {
      if (answerDone) {
        setAnswerDone(false);
      }
    }, 2000);

    return () => {
      clearTimeout(addedTimeout);
      clearTimeout(answerDoneTimeout);
    };
  }, [added, answerDone]);

  const addOptionHandler = (event) => {
    event.preventDefault();
    if (answerRef.current.value === "") return;
    if (answers.length >= 4) return;

    const Answers = {
      answer: answerRef.current.value,
      correct: CorrectAnswerRef.current.checked,
      id: Math.random(),
    };

    setAnswers((prev) => [...prev, Answers]);
    answerRef.current.value = "";
    CorrectAnswerRef.current.checked = false;
  };

  const addQuestionHandler = (e) => {
    e.preventDefault();
    if (questionRef.current.value === "") return alert("Enter question!");
    if (questionRef.current.value.length < 10)
      return alert("Enter at least 10 characters in the Question!");
    if (answers.length < 2) return alert("Enter at least 2 options!");

    const Question = {
      question: questionRef.current.value,
      answers: answers,
      id: count,
    };

    setCount(count + 1);
    setAdded(true);
    setQuestion((prev) => [...prev, Question]);
    setAnswers([]);
    questionRef.current.value = "";
  };

  const onSaveHandler = (event) => {
    event.preventDefault();
    if (
      titleRef.current.value === "" ||
      descriptionRef.current.value === "" ||
      categoryRef.current.value === "" ||
      difficultyRef.current.value === "" ||
      timerRef.current.value === ""
    )
      return alert("Enter all fields (Title, Description, Category, Difficulty, Timer)");
    if (question.length === 0) return alert("Add questions!");

    const Quiz = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      difficulty: difficultyRef.current.value,
      timer: parseInt(timerRef.current.value, 10),
      questions: question,
      id: Math.random(),
      createdOn: new Date(),
      isActive: true,
    };

    dispatch(addQuiz(Quiz));
    setCount(1);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
    difficultyRef.current.value = "";
    timerRef.current.value = "";
    navigate("/play-quiz");
  };

  const deleteHandler = (id) => {
    const newAnswers = answers.filter((el) => el.id !== id);
    setAnswers(newAnswers);
  };

  return (
    <>
      <div className="heading">
        <h1>CREATE NEW QUIZ</h1>
      </div>
      <div className="outline">
        <div className="quizForm">
          <form onSubmit={onSaveHandler}>
            <div className="upper">
              <input type="text" placeholder="Title" className="title" ref={titleRef} required />
              <input type="text" className="description" placeholder="Add Description" ref={descriptionRef} required />
              <input type="text" className="category" placeholder="Category" ref={categoryRef} required />
              <select className="difficulty title" ref={difficultyRef} required>
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <input type="number" className="timer title" placeholder="Timer (seconds)" ref={timerRef} required />
            </div>

            <div className="QA">
              <label>Question {count}</label>
              <input type="text" className="question" placeholder="Enter your question" ref={questionRef} />
              {added && <p>Your question is added!</p>}
              {answerDone && <p>Add at least 2 answers!</p>}
            </div>

            <div className="answerSection">
              <input type="text" className="answer" placeholder="Enter options" ref={answerRef} />
              <div className="checkBox">
                <input type="checkbox" ref={CorrectAnswerRef} />
                <label>Correct</label>
                <button onClick={addOptionHandler}>Add Option</button>
              </div>
            </div>

            <div className="viewAnswer">
              {answers.map((el, i) => (
                <div className="option" key={i} style={el.correct ? { background: "#32a84e" } : { background: "#D1D1D1" }}>
                  <p>{el.answer}</p>
                  <button onClick={() => deleteHandler(el.id)}>❌</button>
                </div>
              ))}
            </div>

            <div className="questionBtn">
              <button onClick={addQuestionHandler}>Add Question</button>
            </div>
            <hr />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewQuizForm;
