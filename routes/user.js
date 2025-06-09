const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, age } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hash, age });
  await user.save();
  res.json({ msg: 'Registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ msg: 'Invalid' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Profile (get/update)
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});
router.put('/me', auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, req.body);
  res.json({ msg: 'Updated' });
});

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ msg: 'Invalid token' }); }
}

module.exports = router;
