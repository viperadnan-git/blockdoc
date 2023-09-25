const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize({
    ...config.database,
});

const User = require('./models/User')(sequelize);
const Document = require('./models/Document')(sequelize);

User.hasMany(Document, {
    foreignKey: 'user',
    as: 'documents',
});

const db = {
    User,
    Document,
    sequelize,
    Sequelize,
};

module.exports = db;