import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getName, playQuiz } from '../../../Redux/Actions/Actions';
import { useNavigate } from 'react-router-dom';
import "./PlayQuiz.css";
import img2 from "../../Images/card.png";

const PlayQuiz = () => {
  const quiz = useSelector((state) => state.reducer.quiz);
  const name = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const play = (id) => {
    if (name.current.value === "") {
      alert("Please enter a name!");
      return;
    }
    if (name.current.value.length < 5 || name.current.value.length > 50) {
      alert("Enter a valid name between 5 and 50 characters!");
      return;
    }
    dispatch(getName(name.current.value));
    dispatch(playQuiz(id));
    navigate("/quiz");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="mainContainer">
        <div className="heading">
          <h1>PLAY QUIZ</h1>
        </div>
        <div className="quiz-description" style={{ textAlign: "center" }}>
          <h4>Enter your name and select the quiz you want to play.</h4>
          <div className="input-name">
            <div className="quiz-name">

            </div>
          </div>
          <div className="created-quiz">
            {quiz.length === 0 ? (
              <p style={{ color: "black", fontStyle: "italic" }}>There are Currently No Quiz!</p>
            ) : (
              <div className="quiz-list">
                {quiz.filter((el) => el.isActive).map((el) => (
                  <div key={el.id} className="quiz-card" onClick={() => play(el.id)}>
                    <h4>{el.title}</h4>
                    <p>{el.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayQuiz;