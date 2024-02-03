const mongoose = require('mongoose');
const dbUrl=process.env.MONGODB_URL;
mongoose.connect(dbUrl).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

module.exports = mongoose;

