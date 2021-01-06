const { Model, DataTypes } = require('sequelize');

class Subtheme extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      number: DataTypes.INTEGER,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'subthemeId', as: 'photos' });
    this.belongsTo(models.Theme, { foreignKey: 'themeId', as: 'theme' });
  }
}

module.exports = Subtheme;