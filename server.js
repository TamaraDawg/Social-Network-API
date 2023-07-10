const express = require('express');
const app = express();
const PORT = 3001; 
const routes = require('./routes/routes');


const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/social_network_db';

// a test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server


// Use routes
app.use('/api', routes);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
