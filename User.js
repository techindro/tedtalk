const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  bio: String,
  skills: [String],
  age: Number,
  profilePic: String,
  achievements: [String],
  certificates: [String],
  earnings: { type: Number, default: 0 },
  language: { type: String, default: 'en' }
});
module.exports = mongoose.model('User', UserSchema);
