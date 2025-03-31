const express = require('express');
const { resultController } = require('../../controllers');

const router = express.Router();

router.get('/leaderboard/:quizId', resultController.showLeaderboard);
router.get('/score/:quizId', resultController.showUserScore);
router.get('/my-scores', resultController.showMyScores);
router.get('/all-scores', resultController.showAllScores);
router.post('/submit/:quizId', resultController.submitScore);

module.exports = router;
