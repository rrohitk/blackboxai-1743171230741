const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String
  },
  duration: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  coverImage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  plays: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Song', songSchema);