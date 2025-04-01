// /backend/controllers/alunoController.js
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

// Função para listar alunos
exports.listarAlunos = (req, res) => {
    const query = 'SELECT * FROM alunos';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar alunos', error: err });
        res.json(results);
    });
};

// Função para adicionar um aluno
exports.adicionarAluno = (req, res) => {
    const { nome, email, turma } = req.body;
    const query = 'INSERT INTO alunos (nome, email, turma) VALUES (?, ?, ?)';
    db.query(query, [nome, email, turma], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao adicionar aluno', error: err });
        res.json({ mensagem: 'Aluno adicionado com sucesso', alunoId: results.insertId });
    });
};

// Função para editar um aluno
exports.editarAluno = (req, res) => {
    const { id } = req.params;
    const { nome, email, turma } = req.body;
    const query = 'UPDATE alunos SET nome = ?, email = ?, turma = ? WHERE id = ?';
    db.query(query, [nome, email, turma, id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao editar aluno', error: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json({ mensagem: 'Aluno atualizado com sucesso' });
    });
};

// Função para excluir um aluno
exports.excluirAluno = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM alunos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao excluir aluno', error: err });
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.json({ mensagem: 'Aluno excluído com sucesso' });
    });
};
