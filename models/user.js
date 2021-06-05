const mongoose = require('mongoose')

// Database schema for the User model
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);