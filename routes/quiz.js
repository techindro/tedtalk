const router = require('express').Router();
const Quiz = require('../models/Quiz');
const auth = require('./user').auth;

// Create quiz
router.post('/', auth, async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.json(quiz);
});

// Attempt quiz
router.post('/:id/attempt', auth, async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  const correct = req.body.answer === quiz.answer;
  quiz.attempts.push({ user: req.user.id, correct });
  await quiz.save();
  res.json({ correct });
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
  const quizzes = await Quiz.find();
  // Aggregate user scores
  let scores = {};
  quizzes.forEach(q => q.attempts.forEach(a => {
    if (a.correct) scores[a.user] = (scores[a.user] || 0) + 1;
  }));
  res.json(scores);
});

module.exports = router;
