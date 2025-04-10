// /backend/controllers/notasController.js
const Notas = require('../models/Notas');

// Função para listar todas as notas
exports.listarNotas = (req, res) => {
    Notas.findAll((err, notas) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar notas', error: err });
        }
        res.json(notas);
    });
};

// Função para adicionar uma nova nota
exports.adicionarNota = (req, res) => {
    const { aluno_id, disciplina, nota } = req.body;

    // Validação dos campos
    if (!aluno_id || !disciplina || !nota) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    Notas.adicionar(aluno_id, disciplina, nota, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao adicionar nota', error: err });
        }
        res.status(201).json({ message: 'Nota adicionada com sucesso', notaId: result.insertId });
    });
};

// Função para atualizar uma nota
exports.atualizarNota = (req, res) => {
    const { id } = req.params;
    const { aluno_id, disciplina, nota } = req.body;

    // Validação dos campos
    if (!aluno_id || !disciplina || !nota) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    Notas.atualizar(id, aluno_id, disciplina, nota, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar nota', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nota não encontrada' });
        }
        res.json({ message: 'Nota atualizada com sucesso' });
    });
};

// Função para excluir uma nota
exports.excluirNota = (req, res) => {
    const { id } = req.params;

    Notas.excluir(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao excluir nota', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nota não encontrada' });
        }
        res.json({ message: 'Nota excluída com sucesso' });
    });
};
