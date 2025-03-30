const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Math', 'Science', 'History', 'Geography', 'Literature', 'Art', 'Technology'],
    },
    difficulty: {
        type: String,
        required: true,
        trim: true,
        enum: ['Easy', 'Medium', 'Hard'],
    },
    duration: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Duration must be a positive number');
            }
        },
    },
}, {
    timestamps: true,
}
);

quizSchema.plugin(toJSON);
quizSchema.plugin(paginate);

module.exports = mongoose.model('Quiz', quizSchema);