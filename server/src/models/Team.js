const { Model, DataTypes } = require('sequelize');

class Team extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },{
      sequelize
    })
  }

  static associate(models){
    this.hasMany(models.Member, { foreignKey:'teamId', as: 'members' });
  }
}

module.exports = Team;