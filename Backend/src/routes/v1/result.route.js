const express = require('express');
const { resultController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.get('/leaderboard/:quizId', resultController.showLeaderboard);
router.get('/score/:quizId', resultController.showUserScore);
router.get('/my-scores', auth(), resultController.showMyScores);
router.get('/all-scores', resultController.showAllScores);
router.post('/submit/:quizId', auth(), resultController.submitScore);

module.exports = router;
