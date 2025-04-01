// /backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Importando as rotas
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const diretorRoutes = require('./routes/diretorRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const faltasRoutes = require('./routes/faltasRoutes');
const notasRoutes = require('./routes/notasRoutes');
const eventoRoutes = require('./routes/eventoRoutes');

// Configuração do body-parser para receber dados em JSON
app.use(bodyParser.json());

// Usando as rotas
app.use('/api/alunos', alunoRoutes); // Rota para alunos
app.use('/api/professores', professorRoutes); // Rota para professores
app.use('/api/diretores', diretorRoutes); // Rota para diretores
app.use('/api/turmas', turmaRoutes); // Rota para turmas
app.use('/api/faltas', faltasRoutes); // Rota para faltas
app.use('/api/notas', notasRoutes); // Rota para notas
app.use('/api/eventos', eventoRoutes); // Rota para eventos

// Inicializando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

