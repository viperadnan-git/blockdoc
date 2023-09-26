const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Document = sequelize.define('document', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        contentHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        underscored: true,
    });

    return Document;
};