import React, { useState } from "react";
import "./CreateQuiz.css"; // Import custom styles for the modal
import NewQuizForm from "./NewQuizForm";

const CreateQuiz = () => {
  const [popup, setPopup] = useState(false); // Initially set to false

  return (
    <div style={{ marginTop: "100px" }}>
      <NewQuizForm />
    </div>
  );
};
export default CreateQuiz;