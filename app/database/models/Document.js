const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Document = sequelize.define('document', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        underscored: true,
    });

    return Document;
};