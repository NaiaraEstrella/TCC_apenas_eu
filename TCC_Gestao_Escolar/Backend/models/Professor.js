// /backend/models/Professor.js
const db = require('../config/db');

class Professor {
    static listar(callback) {
        db.query('SELECT * FROM professores', callback);
    }
    
    static adicionar(nome, disciplina, callback) {
        db.query('INSERT INTO professores (nome, disciplina) VALUES (?, ?)', [nome, disciplina], callback);
    }
}

module.exports = Professor;