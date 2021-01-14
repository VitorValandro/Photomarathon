const Subtheme = require('../models/Subtheme');
const Theme = require('../models/Theme');

module.exports = {
  async indexAll(req, res) {
    const subthemes = await Subtheme.findAll();

    return res.json(subthemes);
  },

  async indexByTheme(req, res){
    const { themeId } = req.params;

    const theme = await Theme.findByPk(themeId, {
      include: { association: 'subthemes' }
    });

    if (!theme) {
      return res.status(400).json({ error: `O tema de id ${themeId} não foi encontrado` })
    }

    return res.json(theme.subthemes);
  },

  async store(req, res) {
    const { themeId } = req.params;
    const { title, number } = req.body;

    const theme = await Theme.findByPk(themeId);

    if (!theme) {
      return res.status(400).json({ error: `O tema de id ${themeId} não foi encontrado` })
    }

    const subtheme = await Subtheme.create({
      title,
      number,
      themeId
    });

    return res.json(subtheme);
  },

  async remove(req, res) {
    const { subthemeId } = req.params;

    const subtheme = await Subtheme.findByPk(subthemeId);
    if (!subtheme) {
      return res.status(400).json({ error: `O subtema ${subthemeId} não existe` })
    }

    await Subtheme.destroy({
      where: {
        id: subthemeId
      }
    }).then(function (rowDeleted) {
      if (rowDeleted === 1) {
        return res.json({ message: `O subtema ${subthemeId} foi deletado com sucesso` })
      }
    }, function (err) {
      return res.status(400).json({ error: err })
    });
  }
}