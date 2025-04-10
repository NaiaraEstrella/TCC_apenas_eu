// /backend/controllers/turmaController.js
const Turma = require('../models/Turma');

// Função para listar todas as turmas
exports.listarTurmas = (req, res) => {
    Turma.findAll((err, turmas) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar turmas', error: err });
        }
        res.json(turmas);
    });
};

// Função para adicionar uma nova turma
exports.adicionarTurma = (req, res) => {
    const { nome, serie } = req.body;

    // Validação dos campos
    if (!nome || !serie) {
        return res.status(400).json({ message: 'Nome e série são obrigatórios' });
    }

    Turma.adicionar(nome, serie, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao adicionar turma', error: err });
        }
        res.status(201).json({ message: 'Turma adicionada com sucesso', turmaId: result.insertId });
    });
};

// Função para atualizar uma turma
exports.atualizarTurma = (req, res) => {
    const { id } = req.params;
    const { nome, serie } = req.body;

    // Validação dos campos
    if (!nome || !serie) {
        return res.status(400).json({ message: 'Nome e série são obrigatórios' });
    }

    Turma.atualizar(id, nome, serie, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar turma', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.json({ message: 'Turma atualizada com sucesso' });
    });
};

// Função para excluir uma turma
exports.excluirTurma = (req, res) => {
    const { id } = req.params;

    Turma.excluir(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao excluir turma', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Turma não encontrada' });
        }
        res.json({ message: 'Turma excluída com sucesso' });
    });
};
