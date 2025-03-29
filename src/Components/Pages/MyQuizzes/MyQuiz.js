import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteQuiz, toggleActive } from "../../../Redux/Actions/Actions";
import "./MyQuiz.css";

const MyQuiz = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

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

  const categories = ["All", ...new Set(Quiz.map((quiz) => quiz.category))];
  const difficulties = ["All", ...new Set(Quiz.map((quiz) => quiz.difficulty))];

  const filteredQuizzes = Quiz.filter(
    (quiz) =>
      (selectedCategory === "All" || quiz.category === selectedCategory) &&
      (selectedDifficulty === "All" || quiz.difficulty === selectedDifficulty) &&
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="quiz-container">
      <div className="header">
        <h2>MY QUIZ</h2>
        <Link to="/create-new" className="create-btn">
          Create New Quiz
        </Link>
      </div>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by quiz title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="difficulty-select"
        >
          {difficulties.map((difficulty, index) => (
            <option key={index} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
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
        {filteredQuizzes.length === 0 ? (
          <p className="no-quiz-msg">No quizzes found.</p>
        ) : (
          <table className="quiz-table">
            <thead>
              <tr>
                <th>Quiz No.</th>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuizzes.map((quiz, index) => (
                <tr key={quiz.id}>
                  <td>{index + 1}</td>
                  <td className="quiz-title">{quiz.title}</td>
                  <td>{quiz.category}</td>
                  <td>{quiz.difficulty}</td>
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
