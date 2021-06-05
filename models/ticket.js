const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

// Database schema for the Ticket model
const ticketSchema =  new mongoose.Schema({
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
  status: {
    type: String
  },
  priority: {
    type: String,
  },
  end_at: {
    type: Date
  },
  projectId: {
    type: ObjectId,
    ref: "Project"
  }
})

module.exports = mongoose.model('Ticket', ticketSchema);