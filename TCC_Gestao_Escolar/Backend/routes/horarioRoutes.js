const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

router.post('/gerar-horario', horarioController.gerarHorario);

module.exports = router;
