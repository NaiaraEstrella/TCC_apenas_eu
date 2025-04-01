// /backend/controllers/eventoController.js
const Evento = require('../models/Evento');

// Função para listar todos os eventos
exports.listarEventos = (req, res) => {
    Evento.findAll((err, eventos) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar eventos', error: err });
        }
        res.json(eventos);
    });
};

// Função para obter um evento pelo ID
exports.obterEvento = (req, res) => {
    const { id } = req.params;
    Evento.findById(id, (err, evento) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar evento', error: err });
        }
        if (!evento) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.json(evento);
    });
};

// Função para adicionar um novo evento
exports.adicionarEvento = (req, res) => {
    const { titulo, data, descricao } = req.body;

    // Validação dos campos
    if (!titulo || !data || !descricao) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    Evento.adicionar(titulo, data, descricao, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao adicionar evento', error: err });
        }
        res.status(201).json({ message: 'Evento adicionado com sucesso', eventoId: result.insertId });
    });
};

// Função para atualizar os dados de um evento
exports.atualizarEvento = (req, res) => {
    const { id } = req.params;
    const { titulo, data, descricao } = req.body;

    // Validação dos campos
    if (!titulo || !data || !descricao) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    Evento.atualizar(id, titulo, data, descricao, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar evento', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.json({ message: 'Evento atualizado com sucesso' });
    });
};

// Função para excluir um evento
exports.excluirEvento = (req, res) => {
    const { id } = req.params;

    Evento.excluir(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao excluir evento', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.json({ message: 'Evento excluído com sucesso' });
    });
};
