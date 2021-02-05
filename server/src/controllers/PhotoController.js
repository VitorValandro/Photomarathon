const path = require('path');

const uploadPhotoMiddleware = require('../config/uploadConfig');
const putWatermarkToPhoto = require('../middlewares/watermark');

const Photo = require('../models/Photo');
const Team = require('../models/Team');
const Subtheme = require('../models/Subtheme');

module.exports = {
  async indexAll(req, res) {
    const photos = await Photo.findAll({
      order: [['createdAt', 'DESC']]
    });

    return res.json(photos);
  },

  async indexByTeam(req, res) {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId, {
      include: { association: 'photos' },
      order: [['photos', 'createdAt', 'DESC']]
    });

    if (!team) {
      return res.status(400).json({ error: `O time de id ${teamId} não foi encontrado` })
    }

    return res.json(team.photos);
  },

  async indexBySubtheme(req, res) {
    const { subthemeId } = req.params;

    const subtheme = await Subtheme.findByPk(subthemeId, {
      include: { association: 'photos' },
    });

    if (!subtheme) {
      return res.status(400).json({ error: `O subtema de id ${subthemeId} não foi encontrado` })
    }

    return res.json(subtheme.photos);
  },

  async store(req, res) {
    const { teamId } = req.params;
    const { subthemeId } = req.body;
    const { filename } = req.file;

    /* 
    Aqui é feita a edição da foto pra colocar a marca d'água.
    Como o arquivo não pode ser editado sem estar armazenado em algum lugar,
    primeiro ele é salvo da forma original. Depois, a função putWatermarkToPhoto
    edita a imagem pra colocar a watermark e sobreescreve o registro da foto original.
    Nenhuma mudança é feita na DB, só na pasta uploads. O nome do arquivo jamais deve mudar entre
    original e editado, senão ele não irá sobreescrever corretamente.
    */

    const subtheme = await Subtheme.findByPk(subthemeId);

    const pathOfOriginalFile = path.join(__dirname, '..', '..', 'uploads', filename);
    const watermark = path.join(__dirname, '..', 'watermarks', `subtheme-${subtheme.number}.png`);
    putWatermarkToPhoto(pathOfOriginalFile, watermark, filename);

    const photo = await Photo.create({ // Armazena no banco de dados
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