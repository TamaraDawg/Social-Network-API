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
  



  // THOUGHTS

  // Get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Get a thought by its id
  router.get('/thoughts/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const thought = await Thought.findById(id);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Create a new thought
  router.post('/thoughts', async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
      const newThought = new Thought({ thoughtText, username });
      await newThought.save();
      res.status(201).json(newThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Update a thought by its id
  router.put('/thoughts/:id', async (req, res) => {
    const { id } = req.params;
    const { thoughtText } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        id,
        { thoughtText },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Delete a thought by its id
  router.delete('/thoughts/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedThought = await Thought.findByIdAndDelete(id);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(deletedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  // FRIEND LISTS 

  // Get all friend lists
router.get('/friendlists', async (req, res) => {
    try {
      const friendLists = await FriendList.find();
      res.json(friendLists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Get a friend list by username
  router.get('/friendlists/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const friendList = await FriendList.findOne({ username }).populate('friends');
      if (!friendList) {
        return res.status(404).json({ error: 'Friend list not found' });
      }
      res.json(friendList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Update a friend list by username
  router.put('/friendlists/:username', async (req, res) => {
    const { username } = req.params;
    const { friendId } = req.body;
    try {
      const friendList = await FriendList.findOne({ username });
      if (!friendList) {
        return res.status(404).json({ error: 'Friend list not found' });
      }
      friendList.friends.push(friendId);
      await friendList.save();
      res.json(friendList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Delete a friend from a friend list
  router.delete('/friendlists/:username/:friendId', async (req, res) => {
    const { username, friendId } = req.params;
    try {
      const friendList = await FriendList.findOne({ username });
      if (!friendList) {
        return res.status(404).json({ error: 'Friend list not found' });
      }
      friendList.friends = friendList.friends.filter(
        (friend) => friend.toString() !== friendId
      );
      await friendList.save();
      res.json(friendList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  
  
  module.exports = router;
