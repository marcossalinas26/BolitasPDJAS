const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'El nombre de usuario ya está en uso'
        },
        validate: {
            len: [3, 20]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;