import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addQuiz } from "../../../Redux/Actions/Actions";
import "./NewQuizForm.css";
import axios from "axios"; // Import Axios

const NewQuizForm = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const difficultyRef = useRef();
  const timerRef = useRef();
  const questionRef = useRef();
  const optionRefs = [useRef(), useRef(), useRef(), useRef()];
  const correctOptionRef = useRef();

  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const addedTimeout = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(addedTimeout);
  }, [added]);

  const addQuestionHandler = (e) => {
    e.preventDefault();

    const options = optionRefs.map((ref) => ref.current.value.trim());
    if (options.some((opt) => opt === "")) return;

    const correctIndex = parseInt(correctOptionRef.current.value, 10);
    if (isNaN(correctIndex)) return;

    const newQuestion = {
      question: questionRef.current.value,
      answers: options.map((answer, index) => ({
        answer,
        correct: index + 1 === correctIndex,
      })),
      id: count,
    };

    if (editingIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditingIndex(null);
    } else {
      setCount(count + 1);
      setQuestions((prev) => [...prev, newQuestion]);
    }

    setAdded(true);
    questionRef.current.value = "";
    optionRefs.forEach((ref) => (ref.current.value = ""));
    correctOptionRef.current.value = "";
  };

  const deleteQuestionHandler = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const editQuestionHandler = (index) => {
    const questionToEdit = questions[index];
    questionRef.current.value = questionToEdit.question;
    questionToEdit.answers.forEach((answer, i) => {
      optionRefs[i].current.value = answer.answer;
    });
    correctOptionRef.current.value = questionToEdit.answers.findIndex((ans) => ans.correct) + 1;
    setEditingIndex(index);
  };

  const onSaveHandler = async (event) => {
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
      duration: parseInt(timerRef.current.value, 10),
      questions: questions.map((q) => ({
        question: q.question,
        option1: q.answers[0].answer,
        option2: q.answers[1].answer,
        option3: q.answers[2].answer,
        option4: q.answers[3].answer,
        answer: q.answers.findIndex((ans) => ans.correct) + 1,
      })),
    };

    try {
      await axios.post("http://localhost:5000/v1/quiz/createQuiz", newQuiz);
      alert("Quiz created successfully!");
      navigate("/play-quiz");
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz. Please try again.");
    }
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
              <select ref={categoryRef} required>
                <option value="">Select Category</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Literature">Literature</option>
                <option value="Art">Art</option>
                <option value="Technology">Technology</option>
              </select>
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
              {optionRefs.map((ref, index) => (
                <input key={index} type="text" placeholder={`Option ${index + 1}`} ref={ref} />
              ))}
              <select ref={correctOptionRef}>
                <option value="">Select Correct Option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
            </div>

            <button onClick={addQuestionHandler} className="addques">{editingIndex !== null ? "Update Question" : "Add Question"}</button>
            <hr />
            <button type="submit">Submit</button>
          </form>

          <div className="questionList">
            <h3>Added Questions:</h3>
            <ul>
              {questions.map((q, index) => (
                <li key={q.id} className="questionItem">
                  <span>{q.question}</span>
                  <div className="btn-container">
                    <button className="btn edit" onClick={() => editQuestionHandler(index)}>Edit</button>
                    <button className="btn delete" onClick={() => deleteQuestionHandler(index)}>Delete</button>
                  </div>
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