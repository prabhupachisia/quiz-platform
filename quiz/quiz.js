
let currentQuestionIndex = 0;
let score = 0;  // Track the score
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');

// Instead of fetching, we define the quiz data directly:
const quizData = [
  {
    question: "What color is the sky on a clear day?",
    options: ["Red", "Blue", "Green", "Yellow"],
    answer: "Blue"
  },
  {
    question: "How many legs does a cat have?",
    options: ["2", "4", "6", "8"],
    answer: "4"
  },
  {
    question: "Which animal says 'meow'?",
    options: ["Dog", "Cat", "Cow", "Sheep"],
    answer: "Cat"
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Oxygen", "Water", "Hydrogen", "Salt"],
    answer: "Water"
  },
  {
    question: "What do you use to write on a blackboard?",
    options: ["Pen", "Pencil", "Chalk", "Marker"],
    answer: "Chalk"
  },
  {
    question: "Which fruit is known as the 'King of Fruits'?",
    options: ["Apple", "Mango", "Banana", "Grapes"],
    answer: "Mango"
  }
];

// Since we no longer need to fetch, we can immediately load the first question.
loadQuestion();

function loadQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    // End the quiz when all questions are answered
    localStorage.setItem('finalScore', score); // Save score
    window.location.href = 'quiz-ended.html'; // Redirect to quiz-ended page
    return;
  }

  const questionData = quizData[currentQuestionIndex];
  questionElement.textContent = questionData.question;
  optionsElement.innerHTML = '';

  // Loop through options and create buttons
  questionData.options.forEach(option => {
    const button = document.createElement('button');
    button.classList.add('option');
    button.textContent = option;
    button.onclick = () => handleAnswer(option, questionData.answer);
    optionsElement.appendChild(button);
  });

  nextButton.style.display = 'none';  // Hide next button until an answer is selected
}

function handleAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    score++;  // Score up if you're right
  }

  nextButton.style.display = 'block';  // Show next button after answering
  nextButton.onclick = () => {
    currentQuestionIndex++;
    loadQuestion();
  };
}
