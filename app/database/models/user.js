const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(320),
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
        },
        privateKey: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        // metamask address
        publicKey: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
    });

    return User;
};