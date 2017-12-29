const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('dist')));

app.get('/', (req, res) => {
  console.log('Serving request at index');
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Listening at port:', PORT);
});