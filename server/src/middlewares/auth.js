/*
Midllewares são responsáveis por intermediar entre uma requisição e sua resposta.
Esse middleware tem a função de verificar se o usuário tem o token válido necessário 
para determinadas requisições
*/

const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).send({ error: `Nenhum token foi fornecido` });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token mal formatado' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });

    req.teamId = decoded.id; // acrescenta à requisição o ID do time que está logado
    return next(); // permite que a requisição avance
  });
}