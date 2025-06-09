const router = require('express').Router();
const Job = require('../models/Job');
const auth = require('./user').auth;

// Post job
router.post('/', auth, async (req, res) => {
  const job = new Job({ ...req.body, postedBy: req.user.id });
  await job.save();
  res.json(job);
});

// List jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find().populate('postedBy', 'name');
  res.json(jobs);
});

// Apply for job
router.post('/:id/apply', auth, async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job.applicants.includes(req.user.id)) job.applicants.push(req.user.id);
  await job.save();
  res.json({ applied: true });
});

module.exports = router;
