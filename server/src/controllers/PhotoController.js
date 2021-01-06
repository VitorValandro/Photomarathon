const uploadPhotoMiddleware = require('../config/uploadConfig');

const Photo = require('../models/Photo');
const Team = require('../models/Team');
const Subtheme = require('../models/Subtheme');

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

  async indexBySubtheme(req, res) {
    const { subthemeId } = req.params;

    const subtheme = await Subtheme.findByPk(subthemeId, {
      include: { association: 'photos' }
    });

    if (!subtheme) {
      return res.status(400).json({ error: `O tema de id ${subthemeId} não foi encontrado` })
    }

    return res.json(subtheme.photos);
  },

  async store(req, res) {
    const { teamId } = req.params;
    const { subthemeId } = req.body;
    const { filename } = req.file;

    const photo = await Photo.create({
      teamId,
      subthemeId,
      filename,
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