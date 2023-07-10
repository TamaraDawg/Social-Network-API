const express = require('express');
const router = express.Router();
const { User, Thought, Reaction, FriendList } = require('../models/models');

// USER SECTION 
// Get all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Get user by username
  router.get('/users/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Create new user
  router.post('/users', async (req, res) => {
    const { username, email } = req.body;
    try {
      const newUser = new User({ username, email });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Update user by username
  router.put('/users/:username', async (req, res) => {
    const { username } = req.params;
    const { email } = req.body;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Deleteuser by username
  router.delete('/users/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const deletedUser = await User.findOneAndDelete({ username });
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;
