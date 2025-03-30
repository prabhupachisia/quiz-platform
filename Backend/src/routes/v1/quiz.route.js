const express = require('express');
const { quizController } = require('../../controllers');

const router = express.Router();

router.post('/createQuiz', quizController.createQuiz);
router.get('/getQuiz/:quizId', quizController.getQuiz);

module.exports = router;