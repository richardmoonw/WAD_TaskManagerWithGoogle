const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const projectSchema =  new mongoose.Schema({
  id: {
    type: Number,
    index: true
  },
  name: {
    type: String,
  },
  description: {
    type: String
  },
  start_at: {
    type: Date
  },
  userId: {
    type: ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model('Project', projectSchema);