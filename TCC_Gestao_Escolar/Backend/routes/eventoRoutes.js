// /backend/routes/eventoRoutes.js
const express = require('express');
const eventoController = require('../controllers/eventoController');
const router = express.Router();

// Rota para listar todos os eventos
router.get('/', eventoController.listarEventos);

// Rota para adicionar um novo evento
router.post('/adicionar', eventoController.adicionarEvento);

// Rota para atualizar um evento existente
router.put('/atualizar/:id', eventoController.atualizarEvento);

// Rota para excluir um evento
router.delete('/excluir/:id', eventoController.excluirEvento);

module.exports = router;
