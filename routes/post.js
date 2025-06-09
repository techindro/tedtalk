const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('./user').auth;

// Create post
router.post('/', auth, async (req, res) => {
  const post = new Post({ ...req.body, user: req.user.id });
  await post.save();
  res.json(post);
});

// Get feed
router.get('/', auth, async (req, res) => {
  const feed = await Post.find().populate('user', 'name profilePic').sort('-date').limit(50);
  res.json(feed);
});

// Like/unlike
router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const idx = post.likes.indexOf(req.user.id);
  if (idx === -1) post.likes.push(req.user.id);
  else post.likes.splice(idx, 1);
  await post.save();
  res.json(post.likes.length);
});

// Comment
router.post('/:id/comment', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.user.id, text: req.body.text });
  await post.save();
  res.json(post.comments);
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  await Post.deleteOne({ _id: req.params.id, user: req.user.id });
  res.json({ msg: 'Deleted' });
});

module.exports = router;
