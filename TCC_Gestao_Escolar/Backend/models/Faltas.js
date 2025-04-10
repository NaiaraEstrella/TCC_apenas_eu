// /backend/models/Faltas.js
const db = require('../config/db');

// Função para listar todas as faltas
exports.findAll = (callback) => {
    db.query('SELECT * FROM faltas', callback);
};

// Função para registrar uma nova falta
exports.registrar = (aluno_id, data, motivo, callback) => {
    db.query('INSERT INTO faltas (aluno_id, data, motivo) VALUES (?, ?, ?)', [aluno_id, data, motivo], callback);
};

// Função para excluir uma falta
exports.excluir = (id, callback) => {
    db.query('DELETE FROM faltas WHERE id = ?', [id], callback);
};
