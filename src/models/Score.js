const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Score = sequelize.define('Score', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accuracy: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'scores',
    timestamps: true,
    updatedAt: false
});

module.exports = Score;
