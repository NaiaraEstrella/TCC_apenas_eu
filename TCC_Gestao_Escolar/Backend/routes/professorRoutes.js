// /backend/routes/professorRoutes.js
const express = require('express');
const professorController = require('../controllers/professorController');
const router = express.Router();

// Rota para listar todos os professores
router.get('/', professorController.listarProfessores);

// Rota para adicionar um novo professor
router.post('/adicionar', professorController.adicionarProfessor);

// Rota para atualizar um professor existente
router.put('/atualizar/:id', professorController.atualizarProfessor);

// Rota para excluir um professor
router.delete('/excluir/:id', professorController.excluirProfessor);

module.exports = router;
