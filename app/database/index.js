const User = require('./models/user');

const { Sequelize } = require('sequelize');
const config = require('../config');

const db = {};

const sequelize = new Sequelize({
    ...config.database,
});

const User = User(sequelize);

db.sequelize = sequelize;
db.User = User;

module.exports = db;