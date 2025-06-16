const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  profile: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' },
  address: { type: String },
  dob: { type: String },
  phone: { type: String },
  roles: { type: String, default: 'user', enum: ['admin', 'user'] },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);