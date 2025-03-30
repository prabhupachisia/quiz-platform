const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionSchema = mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    question: {
        type: String,
        required: true,
        trim: true,
    },
    option1: {
        type: String,
        required: true,
        trim: true,
    },
    option2: {
        type: String,
        required: true,
        trim: true,
    },
    option3: {
        type: String,
        required: true,
        trim: true,
    },
    option4: {
        type: String,
        required: true,
        trim: true,
    },
    answer: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

module.exports = mongoose.model('Question', questionSchema);