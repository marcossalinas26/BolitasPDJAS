const { Score, User, GameMode } = require('../models');

exports.postScore = async (req, res, next) => {
    try {
        const { gameType, points, accuracy } = req.body;
        const userId = req.session.userId;


        const mode = await GameMode.findOne({ where: { name: gameType } });
        if (!mode) {
            return res.status(404).json({ status: 'error', message: 'Modo de juego no encontrado' });
        }

        const score = await Score.create({
            userId,
            gameModeId: mode.id,
            points,
            accuracy
        });

        res.status(201).json({ status: 'success', data: score });
    } catch (err) {
        next(err);
    }
};

exports.getRanking = async (req, res, next) => {
    try {
        const { gameType } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const mode = await GameMode.findOne({ where: { name: gameType } });
        if (!mode) {
            return res.status(404).json({ status: 'error', message: 'Modo de juego no encontrado' });
        }

        const { count, rows } = await Score.findAndCountAll({
            where: { gameModeId: mode.id },
            include: [{ model: User, attributes: ['username'] }],
            order: [['points', 'DESC']],
            limit,
            offset
        });


        const formattedData = rows.map(score => ({
            username: score.User.username,
            points: score.points,
            accuracy: score.accuracy,
            created_at: score.createdAt
        }));

        res.json({
            status: 'success',
            data: formattedData,
            pagination: {
                total: count,
                page,
                pages: Math.ceil(count / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};
exports.getGameModes = async (req, res, next) => {
    try {
        const modes = await GameMode.findAll();
        res.json({ status: 'success', data: modes });
    } catch (err) {
        next(err);
    }
};

exports.createGameMode = async (req, res, next) => {
    try {
        const { name, description, target_count, time_limit } = req.body;
        const mode = await GameMode.create({ name, description, target_count, time_limit });
        res.status(201).json({ status: 'success', data: mode });
    } catch (err) {
        next(err);
    }
};

exports.deleteScore = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Score.destroy({ where: { id } });

        if (deleted) {
            res.json({ status: 'success', message: 'Puntuación eliminada correctamente' });
        } else {
            res.status(404).json({ status: 'error', message: 'Puntuación no encontrada' });
        }
    } catch (err) {
        next(err);
    }
};

exports.deleteGameMode = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await GameMode.destroy({ where: { id } });

        if (deleted) {
            res.json({ status: 'success', message: 'Modo de juego eliminado correctamente' });
        } else {
            res.status(404).json({ status: 'error', message: 'Modo de juego no encontrado' });
        }
    } catch (err) {
        next(err);
    }
};