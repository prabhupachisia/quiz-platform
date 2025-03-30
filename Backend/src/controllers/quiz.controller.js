const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { Quiz, Question } = require('../models');

const createQuiz = catchAsync(async (req, res) => {
    // Extract quiz data
    const quizBody = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        difficulty: req.body.difficulty,
        duration: req.body.duration,
    };

    // Create Quiz
    const quiz = await Quiz.create(quizBody);

    // Check if there are questions in the request body
    if (req.body.questions && req.body.questions.length > 0) {
        const questions = req.body.questions.map(q => ({
            quizId: quiz._id, // Link question to the created quiz
            question: q.question,
            option1: q.option1,
            option2: q.option2,
            option3: q.option3,
            option4: q.option4,
            answer: q.answer,
        }));

        // Insert questions into the database
        await Question.insertMany(questions);
    }

    res.status(httpStatus.CREATED).send({ quiz });
});

module.exports = {
    createQuiz,
};
