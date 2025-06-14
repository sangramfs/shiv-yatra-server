const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['general', 'personalized'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'responded'],
    default: 'unread'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);