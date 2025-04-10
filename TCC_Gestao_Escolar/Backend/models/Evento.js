// /backend/models/Evento.js
const db = require('../config/db');

// Função para listar todos os eventos
exports.findAll = (callback) => {
    db.query('SELECT * FROM eventos', callback);
};

// Função para buscar um evento por ID
exports.findById = (id, callback) => {
    db.query('SELECT * FROM eventos WHERE id = ?', [id], callback);
};

// Função para adicionar um novo evento
exports.adicionar = (titulo, data, descricao, callback) => {
    db.query('INSERT INTO eventos (titulo, data, descricao) VALUES (?, ?, ?)', [titulo, data, descricao], callback);
};

// Função para atualizar um evento
exports.atualizar = (id, titulo, data, descricao, callback) => {
    db.query('UPDATE eventos SET titulo = ?, data = ?, descricao = ? WHERE id = ?', [titulo, data, descricao, id], callback);
};

// Função para excluir um evento
exports.excluir = (id, callback) => {
    db.query('DELETE FROM eventos WHERE id = ?', [id], callback);
};
