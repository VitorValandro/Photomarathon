const Photo = require('../models/Photo');
const Team = require('../models/Team');
const Theme = require('../models/Theme');

module.exports = {
  async indexAll(req, res) {
    const photos = await Photo.findAll();

    return res.json(photos);
  },

  async indexByTeam(req, res) {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId, {
      include: { association: 'photos' }
    });

    if (!team) {
      return res.status(400).json({ error: `O time de id ${teamId} não foi encontrado` })
    }

    return res.json(team.photos);
  },

  async indexByTheme(req, res) {
    const { themeId } = req.params;

    const theme = await Theme.findByPk(themeId, {
      include: { association: 'photos' }
    });

    if (!theme) {
      return res.status(400).json({ error: `O tema de id ${themeId} não foi encontrado` })
    }

    return res.json(theme.photos);
  },

  async store(req, res) {
    const { teamId } = req.params;
    const { name, themeId } = req.body;

    const theme = await Theme.findByPk(themeId);
    const team = await Team.findByPk(teamId);

    if (!theme) {
      return res.status(400).json({ error: `O tema de id ${themeId} não foi encontrado` })
    }

    if (!team) {
      return res.status(400).json({ error: `O time de id ${teamId} não foi encontrado` })
    }

    const photo = await Photo.create({
      name,
      teamId,
      themeId
    });

    return res.json(photo);
  },

  async remove(req, res) {
    const { photoId } = req.params;

    const photo = await Photo.findByPk(photoId);
    if (!photo) {
      return res.status(400).json({ error: `A foto ${photoId} não existe` })
    }

    await Photo.destroy({
      where: {
        id: photoId
      }
    }).then(function (rowDeleted) {
      if (rowDeleted === 1) {
        return res.json({ message: `A foto ${photoId} foi deletada com sucesso` })
      }
    }, function (err) {
      return res.status(400).json({ error: err })
    });
  }
}