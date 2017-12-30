const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/votedb');
const db = mongoose.connection;

db.on('error', (err) => {
  console.log('ERROR:', err);
});

const voteSchema = mongoose.Schema({
  title: String,
  description: String,
  votes: Number
});

const Vote = mongoose.model('votes', voteSchema);

module.exports.Vote = Vote;