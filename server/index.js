const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

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
  console.log('Topic Hash:', topicHash);
  console.log('Request Body:', req.body);
  res.json({topicHash});
});

app.post('/vote', (req, res) => {
  const topicHash = req.body.topicHash;
  if(testData[topicHash]) {
    res.json(testData[topicHash]);
  } else {
    res.sendStatus(404);
  }
});

app.get('/*', (req, res) => {
  console.log('Accepting random request');
  res.sendFile(path.join(__dirname, '../client/topic.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Listening at port:', PORT);
});