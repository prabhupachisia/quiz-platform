import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteQuiz, toggleActive } from "../../../Redux/Actions/Actions";
import "./MyQuiz.css";

const MyQuiz = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const handleDelete = (id) => {
    setDeleteID(id);
    setModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteQuiz(deleteID));
    setModal(false);
  };

  const toggleHandler = (id) => {
    dispatch(toggleActive(id));
  };

  const Quiz = useSelector((state) => state.reducer.quiz);

  return (
    <div className="quiz-container">
      <div className="header">
        <h2>MY QUIZ</h2><br />
        <Link to="/create-new" className="create-btn">
          Create New Quiz
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this quiz? This action is permanent.</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="yes-btn">Yes</button>
              <button onClick={() => setModal(false)} className="no-btn">No</button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz List */}
      <div className="quiz-table-container">
        {Quiz.length === 0 ? (
          <p className="no-quiz-msg">Currently, there are no quizzes available.</p>
        ) : (
          <table className="quiz-table">
            <thead>
              <tr>
                <th>Quiz No.</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Quiz.map((quiz, index) => (
                <tr key={quiz.id}>
                  <td>{index + 1}</td>
                  <td className="quiz-title">{quiz.title}</td>
                  <td>
                    <button
                      className={`status-btn ${quiz.isActive ? "active" : "inactive"}`}
                      onClick={() => toggleHandler(quiz.id)}
                    >
                      {quiz.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>{new Date(quiz.createdOn).toLocaleString()}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(quiz.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyQuiz;
