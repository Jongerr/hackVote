const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/topicdb');
const db = mongoose.connection;

db.on('error', (err) => {
  console.log('ERROR:', err);
});

const topicSchema = mongoose.Schema({
  hash: {type: String, unique: true},
  title: String,
  description: String,
  choices: [String],
  votes: [Number]
});

const Topic = mongoose.model('topic', topicSchema);

const saveTopic = (topicObj, callback) => {
  let topic = new Topic({
    hash: topicObj.hash,
    title: topicObj.topic,
    description: 'TODO: DB Description',
    choices: topicObj.choices,
    votes: new Array(topicObj.choices.length).fill(0)
  });
  topic.save((err) => {
    if(err) console.log(err);
    else { callback(); }
  })
};

const findTopic = (topicHash, callback) => {
  Topic.findOne({'hash': topicHash}, (err, topic) => {
    if(err) console.log(err);
    else {
      console.log('Topic from db:', topic);
      callback(topic.toObject());
    }
  });
};

const modifyTopicVotes = (topicHash, newScores, callback) => {
  Topic.findOne({ 'hash': topicHash }, (err, topic) => {
    if (err) console.log(err);
    else {
      topic.votes = newScores;
      topic.save()
        .then((doc) => callback())
        .catch((err) => console.log(err));
    }
  });
}

module.exports.saveTopic = saveTopic;
module.exports.findTopic = findTopic;
module.exports.modifyTopicVotes = modifyTopicVotes;