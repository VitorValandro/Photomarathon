const Team = require('../models/Team');

module.exports = {
  async index(req, res){
    const teams = await Team.findAll();

    return res.json(teams);
  },

  async store(req, res){
    const { name, email, password } = req.body;

    const team = await Team.create({
      name,
      email,
      password
    });

    return res.json(team);
  },

  async remove(req, res){
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(400).json({ error: `O Tema ${teamId} não existe` })
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