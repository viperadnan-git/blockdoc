const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
            set (value) {
                this.setDataValue('username', value.trim().toLowerCase());
            },
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(320),
            allowNull: false,
            unique: true,
            set (value) {
                this.setDataValue('email', value.trim().toLowerCase());
            },
        },
        name: {
            type: DataTypes.VIRTUAL,
            set (value) {
                this.setDataValue('name', value.trim());
            },
        },
        private_key: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        // metamask address
        public_key: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
    });

    return User;
};