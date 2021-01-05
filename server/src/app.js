const express = require('express');
const bodyParser = require('body-parser');

const database = require('./database/db');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(routes);

module.exports = app;