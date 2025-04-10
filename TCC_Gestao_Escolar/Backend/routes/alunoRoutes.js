const express = require('express');
const Aluno = require('../models/Aluno');
const router = express.Router();

// Rota para listar todos os alunos
router.get('/', (req, res) => {
    Aluno.listar((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Rota para listar um aluno pelo ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Aluno.listarPorId(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) {
            return res.status(404).json({ mensagem: 'Aluno não encontrado' });
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo aluno
router.post('/adicionar', (req, res) => {
    const { nome, idade, turma_id } = req.body;
    Aluno.adicionar(nome, idade, turma_id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensagem: 'Aluno adicionado com sucesso', aluno: result });
    });
});

// Rota para atualizar um aluno
router.put('/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade, turma_id } = req.body;
    Aluno.atualizar(id, nome, idade, turma_id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (!result) {
            return res.status(404).json({ mensagem: 'Aluno não encontrado' });
        }
        res.json({ mensagem: 'Aluno atualizado com sucesso', aluno: result });
    });
});

// Rota para excluir um aluno
router.delete('/excluir/:id', (req, res) => {
    const { id } = req.params;
    Aluno.excluir(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

module.exports = router;

