const { Sequelize } = require('sequelize'); 
const dbConfig = require('../config/dbConfig');

const Team = require('../models/Team');
const Member = require('../models/Member');

const database = new Sequelize(dbConfig);

Team.init(database);
Member.init(database);

Team.associate(database.models);
Member.associate(database.models);

module.exports = database;