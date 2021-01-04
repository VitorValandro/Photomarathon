const express = require('express');

const routes = require('./routes');
const database = require('./database/db');

const port = 3000;
const app = express();

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})