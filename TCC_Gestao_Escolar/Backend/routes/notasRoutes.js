// /backend/routes/notasRoutes.js
const express = require('express');
const notasController = require('../controllers/notasController');
const router = express.Router();

// Rota para listar todas as notas
router.get('/', notasController.listarNotas);

// Rota para adicionar uma nova nota
router.post('/adicionar', notasController.adicionarNota);

// Rota para atualizar uma nota existente
router.put('/atualizar/:id', notasController.atualizarNota);

// Rota para excluir uma nota
router.delete('/excluir/:id', notasController.excluirNota);

module.exports = router;
