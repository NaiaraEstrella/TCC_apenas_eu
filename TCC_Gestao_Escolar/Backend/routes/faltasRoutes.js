// /backend/routes/faltasRoutes.js
const express = require('express');
const faltasController = require('../controllers/faltasController');
const router = express.Router();

// Rota para listar todas as faltas
router.get('/', faltasController.listarFaltas);

// Rota para registrar uma nova falta
router.post('/registrar', faltasController.registrarFalta);

// Rota para atualizar uma falta
router.put('/atualizar/:id', faltasController.atualizarFalta);

// Rota para excluir uma falta
router.delete('/excluir/:id', faltasController.excluirFalta);

module.exports = router;
