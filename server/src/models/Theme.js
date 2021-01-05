const { Model, DataTypes } = require('sequelize');

class Theme extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      number: DataTypes.INTEGER,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Member, { foreignKey: 'themeId', as: 'photos' });
  }
}

module.exports = Theme;