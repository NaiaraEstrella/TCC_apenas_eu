// /backend/controllers/diretorController.js
const Diretor = require('../models/Diretor');

// Função para listar todos os diretores
exports.listarDiretores = (req, res) => {
    Diretor.findAll((err, diretores) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar diretores', error: err });
        }
        res.json(diretores);
    });
};

// Função para obter um diretor pelo ID
exports.obterDiretor = (req, res) => {
    const { id } = req.params;
    Diretor.findById(id, (err, diretor) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar diretor', error: err });
        }
        if (!diretor) {
            return res.status(404).json({ message: 'Diretor não encontrado' });
        }
        res.json(diretor);
    });
};

// Função para adicionar um novo diretor
exports.adicionarDiretor = (req, res) => {
    const { nome, email, telefone } = req.body;

    // Validação dos campos
    if (!nome || !email || !telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    Diretor.adicionar(nome, email, telefone, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao adicionar diretor', error: err });
        }
        res.status(201).json({ message: 'Diretor adicionado com sucesso', diretorId: result.insertId });
    });
};

// Função para atualizar os dados de um diretor
exports.atualizarDiretor = (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    // Validação dos campos
    if (!nome || !email || !telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    Diretor.atualizar(id, nome, email, telefone, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar diretor', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Diretor não encontrado' });
        }
        res.json({ message: 'Diretor atualizado com sucesso' });
    });
};

// Função para excluir um diretor
exports.excluirDiretor = (req, res) => {
    const { id } = req.params;

    Diretor.excluir(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao excluir diretor', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Diretor não encontrado' });
        }
        res.json({ message: 'Diretor excluído com sucesso' });
    });
};

