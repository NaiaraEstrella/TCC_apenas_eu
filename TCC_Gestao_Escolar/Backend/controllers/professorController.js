// /backend/controllers/professorController.js
const mysql = require('mysql');

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestao_escolar'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados');
});

// Função para listar professores
exports.listarProfessores = (req, res) => {
    const query = 'SELECT * FROM professores';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar professores', error: err });
        res.json(results);
    });
};

// Função para adicionar um professor
exports.adicionarProfessor = (req, res) => {
    const { nome, email, disciplina } = req.body;
    const query = 'INSERT INTO professores (nome, email, disciplina) VALUES (?, ?, ?)';
    db.query(query, [nome, email, disciplina], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao adicionar professor', error: err });
        res.json({ mensagem: 'Professor adicionado com sucesso', professorId: results.insertId });
    });
};

// Função para editar um professor
exports.editarProfessor = (req, res) => {
    const { id } = req.params;
    const { nome, email, disciplina } = req.body;
    const query = 'UPDATE professores SET nome = ?, email = ?, disciplina = ? WHERE id = ?';
    db.query(query, [nome, email, disciplina, id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao editar professor', error: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json({ mensagem: 'Professor atualizado com sucesso' });
    });
};

// Função para excluir um professor
exports.excluirProfessor = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM professores WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao excluir professor', error: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        res.json({ mensagem: 'Professor excluído com sucesso' });
    });
};
