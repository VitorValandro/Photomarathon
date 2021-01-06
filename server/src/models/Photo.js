const { Model, DataTypes } = require('sequelize');

class Photo extends Model {
  static init(sequelize) {
    super.init({
      subthemeId: DataTypes.INTEGER,
      filename: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Subtheme, { foreignKey: 'subthemeId', as: 'subtheme' });
    this.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
  }
}

module.exports = Photo;