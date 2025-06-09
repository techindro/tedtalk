const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number,
  attempts: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    correct: Boolean,
    date: { type: Date, default: Date.now }
  }]
});
module.exports = mongoose.model('Quiz', QuizSchema);
