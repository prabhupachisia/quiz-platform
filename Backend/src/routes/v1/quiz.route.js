const express = require('express');
const { quizController } = require('../../controllers');

const router = express.Router();

router.post('/createQuiz', quizController.createQuiz);
router.get('/getQuiz', quizController.getQuiz);
router.get('/getQuiz/:quizId', quizController.getQuestion);
router.delete('/delete/:quizId', quizController.deleteQuiz);
module.exports = router;