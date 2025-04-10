const express = require('express');
const Diretor = require('../models/Diretor');
const router = express.Router();

// Rota para listar todos os diretores
router.get('/', (req, res) => {
    Diretor.listar((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Rota para listar um diretor pelo ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Diretor.listarPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) {
            return res.status(404).json({ mensagem: 'Diretor não encontrado' });
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo diretor
router.post('/adicionar', (req, res) => {
    const { nome, escola_id } = req.body;
    Diretor.adicionar(nome, escola_id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensagem: 'Diretor adicionado com sucesso', diretor: result });
    });
});

// Rota para atualizar um diretor
router.put('/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nome, escola_id } = req.body;
    Diretor.atualizar(id, nome, escola_id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (!result) {
            return res.status(404).json({ mensagem: 'Diretor não encontrado' });
        }
        res.json({ mensagem: 'Diretor atualizado com sucesso', diretor: result });
    });
});

// Rota para excluir um diretor
router.delete('/excluir/:id', (req, res) => {
    const { id } = req.params;
    Diretor.excluir(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

module.exports = router;

