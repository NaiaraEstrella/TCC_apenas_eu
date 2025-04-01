// /backend/models/Turma.js
const db = require('../config/db');

// Função para listar todas as turmas
exports.findAll = (callback) => {
    db.query('SELECT * FROM turmas', callback);
};

// Função para adicionar uma nova turma
exports.adicionar = (nome, serie, callback) => {
    db.query('INSERT INTO turmas (nome, serie) VALUES (?, ?)', [nome, serie], callback);
};

// Função para atualizar uma turma
exports.atualizar = (id, nome, serie, callback) => {
    db.query('UPDATE turmas SET nome = ?, serie = ? WHERE id = ?', [nome, serie, id], callback);
};

// Função para excluir uma turma
exports.excluir = (id, callback) => {
    db.query('DELETE FROM turmas WHERE id = ?', [id], callback);
};
