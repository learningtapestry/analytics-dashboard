const express = require('express');
const path = require('path');
const app = express();

app.get('/lti_launch', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/static/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', req.originalUrl));
});

app.get('/', function (req, res) {
  res.send('Root path');
});

app.listen(process.env.PORT || 8080);
