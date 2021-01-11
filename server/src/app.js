const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./database/db');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploadedPhotos', express.static('uploads'))
app.use(routes);

module.exports = app;