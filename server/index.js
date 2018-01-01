const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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
  //TODO: Hash topic
  const topic = req.body.topic;
  console.log('Request Body:', req.body);
  res.json({topic});
});

app.get('/*', (req, res) => {
  console.log('Accepting random request');
  res.sendFile(path.join(__dirname, '../client/topic.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Listening at port:', PORT);
});