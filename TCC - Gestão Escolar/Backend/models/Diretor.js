// /backend/models/Diretor.js
const db = require('../config/db');

// Função para listar todos os diretores
exports.findAll = (callback) => {
    db.query('SELECT * FROM diretores', callback);
};

// Função para buscar um diretor por ID
exports.findById = (id, callback) => {
    db.query('SELECT * FROM diretores WHERE id = ?', [id], callback);
};

// Função para adicionar um novo diretor
exports.adicionar = (nome, email, telefone, callback) => {
    db.query('INSERT INTO diretores (nome, email, telefone) VALUES (?, ?, ?)', [nome, email, telefone], callback);
};

// Função para atualizar um diretor
exports.atualizar = (id, nome, email, telefone, callback) => {
    db.query('UPDATE diretores SET nome = ?, email = ?, telefone = ? WHERE id = ?', [nome, email, telefone, id], callback);
};

// Função para excluir um diretor
exports.excluir = (id, callback) => {
    db.query('DELETE FROM diretores WHERE id = ?', [id], callback);
};
