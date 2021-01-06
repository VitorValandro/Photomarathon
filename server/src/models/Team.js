const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class Team extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },{
      sequelize,
      hooks:{
        beforeCreate: (async (team, options) => {
          const hash = await bcrypt.hash(team.password, 10);
          team.password = hash;
        })
      }
    })
  }

  static associate(models){
    this.hasMany(models.Member, { foreignKey:'teamId', as: 'members' });
    this.hasMany(models.Photo, { foreignKey: 'teamId', as: 'photos' });
  }
}

module.exports = Team;