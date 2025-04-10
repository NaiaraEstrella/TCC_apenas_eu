// /backend/routes/turmaRoutes.js
const express = require('express');
const turmaController = require('../controllers/turmaController');
const router = express.Router();

// Rota para listar todas as turmas
router.get('/', turmaController.listarTurmas);

// Rota para adicionar uma nova turma
router.post('/adicionar', turmaController.adicionarTurma);

// Rota para atualizar uma turma existente
router.put('/atualizar/:id', turmaController.atualizarTurma);

// Rota para excluir uma turma
router.delete('/excluir/:id', turmaController.excluirTurma);

module.exports = router;
