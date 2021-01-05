const Subtheme = require('../models/Subtheme');
const Theme = require('../models/Theme');

module.exports = {
  async index(req, res) {
    const themes = await Theme.findAll({
      include: { association: 'subthemes' }
    });

    return res.json(themes);
  },

  async store(req, res) {
    const { title, year } = req.body;

    const theme = await Theme.create({
      title,
      year
    })

    return res.json(theme);
  },

  async remove(req, res) {
    const { themeId } = req.params;

    const theme = await Theme.findByPk(themeId);
    if(!theme){
      return res.status(400).json({ error: `O Tema ${themeId} não existe`})
    }

    await Theme.destroy({
      where: {
        id: themeId
      }
    }).then((rowDeleted) => {
      if (rowDeleted === 1) {
        return res.json({ message: `O Tema ${themeId} foi deletado com sucesso` })
      }
    }, function (err) {
      return res.status(400).json({ error: err })
    });
  }
}