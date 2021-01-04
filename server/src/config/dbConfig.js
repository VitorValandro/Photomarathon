/*
Arquivo de configuração do banco de dados
É escrito em CommonJS porque o sequelize por padrão não entende ES6

use o comando < npx sequelize db:create > no CLI para criar o banco de dados MySQL
use o comando < npx sequelize migration:create --name=<NOME> > para criar uma nova migration no banco
*/

module.exports = {
  database: 'maratona',
  username: 'root',
  password: 'valandro',
  dialect: 'mysql',
  host: 'localhost'
}