import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pic1 from "../Images/cretenew.png";
import pic2 from "../Images/myquiz.png";
import pic3 from "../Images/play.png";
import './HomePage.css'; // Importing the CSS file

const HomePage = () => {
  const [headLine, setHeadLine] = useState("WELCOME TO OUR WEBSITE");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user role from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.role || null);

    // Toggle the headline text
    const interval = setInterval(() => {
      setHeadLine((prev) =>
        prev === "WELCOME TO OUR WEBSITE" ? "CREATE YOUR QUIZ AND PLAY" : "WELCOME TO OUR WEBSITE"
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-container">
      <h2 className="headline">{headLine}</h2>
      <div className="card-container">
        {/* Hide "Create Quiz" if the user is a student */}
        {userRole !== "student" && (
          <Link to="/create-new" className="card">
            <img src={pic1} alt="Create quiz" />
            <div className="card-content">
              <h3>Create your quiz by clicking here!</h3>
            </div>
          </Link>
        )}

        <Link to="/my-quiz" className="card">
          <img src={pic2} alt="My quiz" />
          <div className="card-content">
            <h3>Click here to see your quizzes!</h3>
          </div>
        </Link>


        {/* Always show "Play Quiz" for everyone */}
        <Link to="/play-quiz" className="card">
          <img src={pic3} alt="Play quiz" />
          <div className="card-content">
            <h3>Start playing quiz by clicking here!</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
