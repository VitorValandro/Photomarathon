const { request } = require('express');
const multer = require('multer');
const path = require('path');

const Team = require('../models/Team')
const Theme = require('../models/Theme')

module.exports = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: async (request, file, cb) => {
      const { teamId } = request.params;
      const { themeId } = request.body;

      const team = await Team.findByPk(teamId);
      const subtheme = await Theme.findByPk(themeId);

      //const fileName = `${Date.now()}-${file.originalname}`;
      const fileName = `${team.name}-${subtheme.title}${path.extname(file.originalname)}`

      cb(null, fileName);
    },
  })
}