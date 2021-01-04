const Team = require('../models/Team')

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
  }
}