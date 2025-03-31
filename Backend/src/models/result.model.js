const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const resultSchema = mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

resultSchema.plugin(toJSON);
resultSchema.plugin(paginate);

module.exports = mongoose.model('Result', resultSchema);