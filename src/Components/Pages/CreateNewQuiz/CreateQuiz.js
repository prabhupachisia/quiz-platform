import React, { useState } from "react";
import "./CreateQuiz.css"; // Import custom styles for the modal
import NewQuizForm from "./NewQuizForm";

const CreateQuiz = () => {
  const [popup, setPopup] = useState(false); // Initially set to false

  return (
    <div style={{ marginTop: "100px" }}>
      {popup ? (
        <NewQuizForm />
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select Question Type</h2>
            <button className="modal-btn" onClick={() => setPopup(true)}>
              MCQ (Single Correct)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
