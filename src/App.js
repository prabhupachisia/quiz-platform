import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/Pages/HomePage';
import Footer from './Components/Footer/Footer';
import { Routes, Route, Navigate } from "react-router-dom";
import CreateQuiz from './Components/Pages/CreateNewQuiz/CreateQuiz';
import MyQuiz from './Components/Pages/MyQuizzes/MyQuiz';
import PlayQuiz from './Components/Pages/PlayQuiz/PlayQuiz';
import NotFound from './Components/NotFound';
import QuizCard from './Components/Pages/PlayQuiz/QuizCard';
import Login from './Components/Login';
import Leaderboard from './Components/Pages/PlayQuiz/Leaderboard';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user info

  return user ? children : <Navigate to="/login" replace />;
};


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-new"
          element={
            <PrivateRoute>
              <CreateQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-quiz"
          element={
            <PrivateRoute>
              <MyQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/play-quiz"
          element={
            <PrivateRoute>
              <PlayQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
