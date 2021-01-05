const { Model, DataTypes } = require('sequelize');

class Photo extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      themeId: DataTypes.INTEGER,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Theme, { foreignKey: 'themeId', as: 'theme' });
    this.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
  }
}

module.exports = Photo;