// /backend/models/Notas.js
const db = require('../config/db');

// Função para listar todas as notas
exports.findAll = (callback) => {
    db.query('SELECT * FROM notas', callback);
};

// Função para adicionar uma nova nota
exports.adicionar = (aluno_id, disciplina, nota, callback) => {
    db.query('INSERT INTO notas (aluno_id, disciplina, nota) VALUES (?, ?, ?)', [aluno_id, disciplina, nota], callback);
};

// Função para atualizar uma nota
exports.atualizar = (id, aluno_id, disciplina, nota, callback) => {
    db.query('UPDATE notas SET aluno_id = ?, disciplina = ?, nota = ? WHERE id = ?', [aluno_id, disciplina, nota, id], callback);
};

// Função para excluir uma nota
exports.excluir = (id, callback) => {
    db.query('DELETE FROM notas WHERE id = ?', [id], callback);
};
