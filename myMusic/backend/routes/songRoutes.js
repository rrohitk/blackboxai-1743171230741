const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific song
router.get('/:id', getSong, (req, res) => {
  res.json(res.song);
});

// Add a new song
router.post('/', async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    duration: req.body.duration,
    url: req.body.url,
    coverImage: req.body.coverImage
  });

  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to get song by ID
async function getSong(req, res, next) {
  let song;
  try {
    song = await Song.findById(req.params.id);
    if (song == null) {
      return res.status(404).json({ message: 'Cannot find song' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.song = song;
  next();
}

module.exports = router;