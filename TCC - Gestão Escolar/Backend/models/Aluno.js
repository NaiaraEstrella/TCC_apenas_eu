const db = require('../config/db');

// Função para listar todos os alunos
exports.listar = (callback) => {
    db.query('SELECT * FROM alunos', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Função para listar um aluno por ID
exports.listarPorId = (id, callback) => {
    db.query('SELECT * FROM alunos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Função para adicionar um novo aluno
exports.adicionar = (nome, idade, turma_id, callback) => {
    db.query('INSERT INTO alunos (nome, idade, turma_id) VALUES (?, ?, ?)', [nome, idade, turma_id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: results.insertId, nome, idade, turma_id });
    });
};

// Função para atualizar um aluno
exports.atualizar = (id, nome, idade, turma_id, callback) => {
    db.query('UPDATE alunos SET nome = ?, idade = ?, turma_id = ? WHERE id = ?', [nome, idade, turma_id, id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id, nome, idade, turma_id });
    });
};

// Função para excluir um aluno
exports.excluir = (id, callback) => {
    db.query('DELETE FROM alunos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { message: 'Aluno excluído com sucesso' });
    });
};
