const express = require('express');
const { quizController } = require('../../controllers');

const router = express.Router();

router.post('/createQuiz', quizController.createQuiz);
router.post('/getQuiz', quizController.getQuiz);
router.get('/getQuiz/:quizId', quizController.getQuestion);

module.exports = router;