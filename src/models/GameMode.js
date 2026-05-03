const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const GameMode = sequelize.define('GameMode', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    target_count: {
        type: DataTypes.INTEGER,
        defaultValue: 3
    },
    time_limit: {
        type: DataTypes.INTEGER,
        defaultValue: 30 // seconds
    }
}, {
    tableName: 'game_modes',
    timestamps: true
});

module.exports = GameMode;
