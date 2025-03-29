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
  const [questions, setQuestions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const addedTimeout = setTimeout(() => setAdded(false), 2000);
    const answerDoneTimeout = setTimeout(() => setAnswerDone(false), 2000);
    return () => {
      clearTimeout(addedTimeout);
      clearTimeout(answerDoneTimeout);
    };
  }, [added, answerDone]);

  const addOptionHandler = (event) => {
    event.preventDefault();
    if (answerRef.current.value === "" || answers.length >= 4) return;

    const newAnswer = {
      answer: answerRef.current.value,
      correct: CorrectAnswerRef.current.checked,
      id: Math.random(),
    };

    setAnswers((prev) => [...prev, newAnswer]);
    answerRef.current.value = "";
    CorrectAnswerRef.current.checked = false;
  };

  const addQuestionHandler = (e) => {
    e.preventDefault();
    if (questionRef.current.value.length < 10 || answers.length < 2) return;

    const newQuestion = {
      question: questionRef.current.value,
      answers: answers,
      id: count,
    };

    setCount(count + 1);
    setAdded(true);
    setQuestions((prev) => [...prev, newQuestion]);
    setAnswers([]);
    questionRef.current.value = "";
  };

  const onSaveHandler = (event) => {
    event.preventDefault();
    if (
      !titleRef.current.value ||
      !descriptionRef.current.value ||
      !categoryRef.current.value ||
      !difficultyRef.current.value ||
      !timerRef.current.value ||
      questions.length === 0
    ) {
      return alert("Enter all fields and add questions!");
    }

    const newQuiz = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      difficulty: difficultyRef.current.value,
      timer: parseInt(timerRef.current.value, 10),
      questions: questions,
      id: Math.random(),
      createdOn: new Date(),
      isActive: true,
    };

    dispatch(addQuiz(newQuiz));
    setCount(1);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
    difficultyRef.current.value = "";
    timerRef.current.value = "";
    navigate("/play-quiz");
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
              <input type="text" placeholder="Title" ref={titleRef} required />
              <input type="text" placeholder="Description" ref={descriptionRef} required />
              <input type="text" placeholder="Category" ref={categoryRef} required />
              <select ref={difficultyRef} required>
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <input type="number" placeholder="Timer (seconds)" ref={timerRef} required />
            </div>

            <div className="QA">
              <label>Question {count}</label>
              <input type="text" placeholder="Enter your question" ref={questionRef} />
              {added && <p>Your question is added!</p>}
            </div>

            <div className="answerSection">
              <input type="text" placeholder="Enter options" ref={answerRef} className="answer" />
              <div className="checkBox">
                <input type="checkbox" ref={CorrectAnswerRef} />
                <label>Correct</label>
                <button onClick={addOptionHandler}>Add Option</button>
              </div>
            </div>

            <div className="viewAnswer">
              {answers.map((el, i) => (
                <div className={`option ${el.correct ? "correct" : "wrong"}`} key={el.id}>
                  <p>{el.answer}</p>
                  <button onClick={() => setAnswers(answers.filter(a => a.id !== el.id))}>❌</button>
                </div>
              ))}
            </div>

            <button onClick={addQuestionHandler} className="addques">Add Question</button>
            <hr />
            <button type="submit">Submit</button>
          </form>

          <div className="questionList">
            <h3>Added Questions:</h3>
            <ul>
              {questions.map((q) => (
                <li key={q.id} className="questionItem">
                  {q.question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewQuizForm;
