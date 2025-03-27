import React, { useState } from "react";
import { Link } from "react-router-dom";
import click from "../Images/click.mp3"; // Adjust the path based on your project
import "./DrawerComp.css"; // Import the new CSS file

const DrawerComp = () => {
  const [draw, setDraw] = useState(false);

  return (
    <div>
      {/* Sidebar Menu */}
      <div className={`sidebar ${draw ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setDraw(false)}>
          &times;
        </button>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={() => { new Audio(click).play(); setDraw(false); }}>Home</Link>
            </li>
            <li>
              <Link to="/my-quiz" onClick={() => { new Audio(click).play(); setDraw(false); }}>My Quiz</Link>
            </li>
            <li>
              <Link to="/play-quiz" onClick={() => { new Audio(click).play(); setDraw(false); }}>Play Quiz</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menu Button */}
      <button className="menu-btn" onClick={() => setDraw(!draw)}>
        ☰ {/* Hamburger Icon */}
      </button>
    </div>
  );
};

export default DrawerComp;
