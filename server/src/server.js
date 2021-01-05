const app = require('./app');

const database = require('./database/db');

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})