const jwt = require('jsonwebtoken');

const Team = require('../models/Team');
const authConfig = require('../config/authConfig.json');

module.exports = {
  async index(req, res){
    const teams = await Team.findAll({
      attributes: { exclude: ['password'] }
    });

    return res.json(teams);
  },

  async indexById(req, res){
    const { teamId } = req.params;
    const team = await Team.findByPk(teamId, {
      attributes: { exclude: ['password'] }
    });

    if (!team) {
      return res.status(400).json({ error: `O time ${teamId} não existe` })
    }

    return res.json(team);
  },

  async indexInfo(req, res){
    let data = [];
    const rawData = await Team.findAll({
      attributes: { exclude: ['password'] },
      include: [{ association: 'photos' }, { association: 'members'} ]
    });

    if(!rawData){
      return res.status(400).json({ error: 'Não foi possível executar a requisição'})
    }

    for(let i=0; i < rawData.length; i++){
      data.push({
        "id": rawData[i]["id"],
        "name": rawData[i]["name"],
        "photos": rawData[i]["photos"].length,
        "members": rawData[i]["members"].length
      })
    }

    return res.json(data);
  },

  async store(req, res){
    const { name, email, password } = req.body;

    const team = await Team.create({
      name,
      email,
      password
    });

    team.password = undefined; // não retorna a senha ao cliente

    const token = jwt.sign({id: team.id}, authConfig.secret, {
        expiresIn: 86400 // define o tempo para o token expirar de 1 dia
      });

    return res.send({ team, token: token });
  },

  async remove(req, res){
    const { teamId } = req.params;
    
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(400).json({ error: `O time ${teamId} não existe` })
    }

    await Team.destroy({
      where: {
        id: teamId
      }
    }).then(function (rowDeleted) { 
      if (rowDeleted === 1) {
        return res.json({ message: `O Time ${teamId} foi deletado com sucesso` })
      }
    }, function (err) {
        return res.status(400).json({ error: err })
    });
  }
}