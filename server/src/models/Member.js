const { Model, DataTypes } = require('sequelize');

class Member extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      registration: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models){
    this.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
  }
}

module.exports = Member;