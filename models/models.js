const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Other user fields as needed
});

// Define the Thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  // Other thought fields as needed
});

// Define the Reaction schema
const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  // Other reaction fields as needed
});

// Define the FriendList schema
const friendListSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Create the models based on the defined schemas
const User = mongoose.model('User', userSchema);
const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);
const FriendList = mongoose.model('FriendList', friendListSchema);

// Export the models
module.exports = { User, Thought, Reaction, FriendList };
