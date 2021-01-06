const { request } = require('express');
const multer = require('multer');
const path = require('path');

const Team = require('../models/Team')
const Subtheme = require('../models/Subtheme')

module.exports = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: async (request, file, cb) => {
      const { teamId } = request.params;
      const { subthemeId } = request.body;

      const team = await Team.findByPk(teamId);
      const subtheme = await Subtheme.findByPk(subthemeId);

      // o nome do arquivo da foto será < nome_do_grupo-nome_do_tema.<ext> >
      const fileName = `${team.name}-${subtheme.title}${path.extname(file.originalname)}`.replace(/ /g, "_");

      cb(null, fileName);
    },
  })
}