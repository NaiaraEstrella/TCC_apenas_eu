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
const horarioRoutes = require('./routes/horarioRoutes'); // <-- nova rota

// Configuração do body-parser para receber dados em JSON
app.use(bodyParser.json());

// Usando as rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/diretores', diretorRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/faltas', faltasRoutes);
app.use('/api/notas', notasRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/horarios', horarioRoutes); // <-- nova rota ativa

// Inicializando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

