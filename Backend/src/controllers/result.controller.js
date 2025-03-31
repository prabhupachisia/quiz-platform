const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { Quiz, Result, User } = require('../models');

const showLeaderboard = catchAsync(async (req, res) => {
    const { quizId } = req.params;

    // Ensure the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
    }

    // Fetch top 10 scores
    const results = await Result.find({ quizId }) // Updated from `quiz`
        .populate('userId', 'name email') // Ensures user details are included
        .sort({ score: -1 })
        .limit(10);

    res.status(httpStatus.OK).send(results);
});

const showUserScore = catchAsync(async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user._id;

    // Ensure the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
    }

    // Fetch the user's score
    const result = await Result.findOne({ quizId, userId }) // Updated from `quiz` and `user`
        .populate('userId', 'name email');

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Result not found for this quiz and user');
    }

    res.status(httpStatus.OK).send(result);
});

const showMyScores = catchAsync(async (req, res) => {
    const userId = req.user._id;

    const results = await Result.find({ userId })
        .populate('quizId', 'title description')
        .sort({ createdAt: -1 });

    res.status(httpStatus.OK).send(results);
});

const showAllScores = catchAsync(async (req, res) => {
    const filter = {}; // Adjust this if you want to filter by quiz or user later

    // Set default values for pagination options
    const options = {
        sortBy: req.query.sortBy || '-createdAt', // Default sorting: latest first
        limit: parseInt(req.query.limit, 10) || 10, // Default limit: 10
        page: parseInt(req.query.page, 10) || 1, // Default page: 1
        populate: 'userId quizId' // Ensure related fields are included
    };

    const results = await Result.paginate(filter, options);

    res.status(httpStatus.OK).send(results);
});


module.exports = {
    showLeaderboard,
    showUserScore,
    showMyScores,
    showAllScores,
};
