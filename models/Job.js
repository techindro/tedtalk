const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  company: String,
  title: String,
  description: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Job', JobSchema);
