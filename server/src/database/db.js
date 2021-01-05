const { Sequelize } = require('sequelize'); 
const dbConfig = require('../config/dbConfig');

const Team = require('../models/Team');
const Member = require('../models/Member');
const Theme = require('../models/Theme');
const Subtheme = require('../models/Subtheme');

const database = new Sequelize(dbConfig);

Team.init(database);
Member.init(database);
Theme.init(database);
Subtheme.init(database);

Team.associate(database.models);
Member.associate(database.models);

Theme.associate(database.models);
Subtheme.associate(database.models);

module.exports = database;