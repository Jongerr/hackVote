const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const db = require('./db/votesDB');

const testData = require('./helpers/testData.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('dist')));

app.get('/', (req, res) => {
  console.log('Serving request at index');
  res.sendStatus(200);
});

app.post('/topic', (req, res) => {
  const topicHash = crypto.createHash('md5').update(req.body.topic).digest("hex").slice(0, 6);
  req.body.hash = topicHash;
  db.saveTopic(req.body, () => {
    res.json({topicHash});
  });
});

app.post('/vote', (req, res) => {
  const topicHash = req.body.topicHash;
  db.findTopic(topicHash, (topicObj) => {
    // console.log('Received topic obj:', topicObj);
    res.json(topicObj);
  });
});

app.put('/vote', (req, res) => {
  const {topicHash, scores} = req.body;
  console.log('Saving scores:', scores, 'and topicHash:', topicHash);
  db.modifyTopicVotes(topicHash, scores, () => {
    console.log('Scores successfully saved');
    res.sendStatus(200);
  })
});

app.get('/*', (req, res) => {
  console.log('Accepting random request');
  res.sendFile(path.join(__dirname, '../client/topic.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Listening at port:', PORT);
});