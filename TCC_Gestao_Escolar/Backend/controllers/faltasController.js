// /backend/controllers/faltasController.js
const Faltas = require('../models/Faltas');

// Função para listar todas as faltas
exports.listarFaltas = (req, res) => {
    Faltas.findAll((err, faltas) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar faltas', error: err });
        }
        res.json(faltas);
    });
};

// Função para registrar uma nova falta
exports.registrarFalta = (req, res) => {
    const { aluno_id, data, motivo } = req.body;

    // Validação dos campos
    if (!aluno_id || !data || !motivo) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    Faltas.registrar(aluno_id, data, motivo, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao registrar falta', error: err });
        }
        res.status(201).json({ message: 'Falta registrada com sucesso', faltaId: result.insertId });
    });
};

// Função para excluir uma falta
exports.excluirFalta = (req, res) => {
    const { id } = req.params;

    Faltas.excluir(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao excluir falta', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Falta não encontrada' });
        }
        res.json({ message: 'Falta excluída com sucesso' });
    });
};
