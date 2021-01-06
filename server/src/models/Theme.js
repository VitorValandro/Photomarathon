const { Model, DataTypes } = require('sequelize');

class Theme extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      year: DataTypes.INTEGER
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Subtheme, { foreignKey: 'themeId', as: 'subthemes' });
  }
}

module.exports = Theme;