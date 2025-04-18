import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteQuiz } from "../../../Redux/Actions/Actions";
import "./MyQuiz.css";

const MyQuiz = () => {
  const token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [userRole, setUserRole] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  const allQuizzes = useSelector((state) => state.reducer.quiz);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.role || null);

    const fetchQuizzes = async () => {
      try {
        let response;
        if (user?.role === "student") {
          response = await axios.get("http://localhost:5000/v1/result/my-scores", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setQuizzes(response.data); // Student quizzes from my-scores
        } else if (user?.role === "teacher") {
          response = await axios.get("http://localhost:5000/v1/quiz/getQuiz");
          setQuizzes(response.data); // Teacher quizzes from getQuiz
        } else {
          setQuizzes(allQuizzes);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [allQuizzes, token]);

  const handleDelete = (id) => {
    setDeleteID(id);
    setModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/v1/quiz/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(deleteQuiz(id)); // Remove from Redux state
      setModal(false);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const fetchLeaderboard = async (quizId) => {
    try {
      const response = await axios.get(`http://localhost:5000/v1/result/leaderboard/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/leaderboard`, { state: { leaderboardData: response.data } });
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  // Unique categories & difficulties for filtering
  const categories = ["All", ...new Set(quizzes.map((quiz) => (quiz.quizId ? quiz.quizId.category : quiz.category)).filter(Boolean))];
  const difficulties = ["All", ...new Set(quizzes.map((quiz) => (quiz.quizId ? quiz.quizId.difficulty : quiz.difficulty)).filter(Boolean))];

  // Filtered quizzes based on role
  const filteredQuizzes = quizzes.filter((quiz) =>
    (selectedCategory === "All" || (quiz.quizId ? quiz.quizId.category === selectedCategory : quiz.category === selectedCategory)) &&
    (selectedDifficulty === "All" || (quiz.quizId ? quiz.quizId.difficulty === selectedDifficulty : quiz.difficulty === selectedDifficulty)) &&
    (quiz.quizId ? quiz.quizId.title.toLowerCase() : quiz.title.toLowerCase()).includes(searchTerm.toLowerCase())
  );

  return (
    <div className="quiz-container">
      <div className="header">
        <h2>MY QUIZ</h2>
        {userRole === "teacher" && (
          <Link to="/create-new" className="create-btn">
            Create New Quiz
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by quiz title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <label htmlFor="category-select">Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <label htmlFor="difficulty-select">Difficulty:</label>
        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
          {difficulties.map((difficulty, index) => (
            <option key={index} value={difficulty}>{difficulty}</option>
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
              <button onClick={() => confirmDelete(deleteID)} className="yes-btn">Yes</button>
              <button onClick={() => setModal(false)} className="no-btn">No</button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Table */}
      <div className="quiz-table-container">
        {filteredQuizzes.length === 0 ? (
          <p className="no-quiz-msg">No quizzes found.</p>
        ) : (
          <table className="quiz-table">
            <thead>
              <tr>
                <th>Quiz No.</th>
                <th>Title</th>
                <th>Description</th>
                {userRole === "student" && <th>Score</th>}
                <th>Leaderboard</th>
                {userRole === "teacher" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredQuizzes.map((quiz, index) => (
                <tr key={quiz.id || quiz.quizId?.id || index}>
                  <td>{index + 1}</td>
                  <td>{quiz.quizId?.title || quiz.title}</td>
                  <td>{quiz.quizId?.description || quiz.description}</td>
                  {userRole === "student" && <td>{quiz.score !== undefined ? quiz.score : "Not Attempted"}</td>}
                  <td>
                    <button className="leaderboard-btn" onClick={() => fetchLeaderboard(quiz.quizId?.id || quiz._id)}>
                      View Leaderboard
                    </button>
                  </td>
                  {userRole === "teacher" && (
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(quiz.quizId?.id || quiz._id)}>🗑️</button>
                    </td>
                  )}
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
