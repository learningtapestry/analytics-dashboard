const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));

app.listen(process.env.PORT || 8080);
