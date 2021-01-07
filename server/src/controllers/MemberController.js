const Member = require('../models/Member');
const Team = require('../models/Team');

module.exports = {
  async index(req, res) {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId, {
      include: { association: 'members' }
    });

    if (!team) {
      return res.status(400).json({ error: 'Esse time não foi encontrado' })
    }

    return res.json(team.members);
  },

  async store(req, res) {
    const { teamId } = req.params;
    const { name, registration } = req.body;

    const team = await Team.findByPk(teamId);

    if(!team){
      return res.status(400).json({ error: 'Esse time não foi encontrado' })
    }

    const member = await Member.create({
      name,
      registration,
      teamId
    });

    return res.json(member);
  },

  async remove(req, res) {
    const { teamId, memberId } = req.params;

    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(400).json({ error: `O membro ${memberId} não existe` })
    }

    await Member.destroy({
      where: {
        id: memberId
      }
    }).then(function (rowDeleted) {
      if (rowDeleted === 1) {
        return res.json({ message: `O membro ${memberId} foi deletado com sucesso` })
      }
    }, function (err) {
      return res.status(400).json({ error: err })
    });
  }
}