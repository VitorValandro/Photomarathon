const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Team = require('../models/Team');

const authConfig = require('../config/authConfig.json');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const team = await Team.findOne({
      where: {
        email: email
      }
    });

    if (!team) {
      return res.status(400).json({ error: `Esse e-mail ainda não foi cadastrado.` });
    }

    if (!await bcrypt.compare(password, team.password)){
      return res.status(400).json({ error: `Senha incorreta.` });
    }

    team.password = undefined; // não retorna a senha ao cliente

    const token = jwt.sign({id: team.id}, authConfig.secret, {
      expiresIn: 86400 // define o tempo para o token expirar de 1 dia
    });

    return res.send({team, token});
  },

}