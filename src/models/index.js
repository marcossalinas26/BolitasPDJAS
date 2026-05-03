const User = require('./User');
const GameMode = require('./GameMode');
const Score = require('./Score');


User.hasMany(Score, { foreignKey: 'userId', onDelete: 'CASCADE' });
Score.belongsTo(User, { foreignKey: 'userId' });

GameMode.hasMany(Score, { foreignKey: 'gameModeId', onDelete: 'CASCADE' });
Score.belongsTo(GameMode, { foreignKey: 'gameModeId' });

module.exports = {
    User,
    GameMode,
    Score
};
