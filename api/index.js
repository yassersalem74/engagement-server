const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a new user
router.post('/users', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    message: req.body.message,
  });
  await newUser.save();
  res.status(201).json(newUser);
});

module.exports = router;