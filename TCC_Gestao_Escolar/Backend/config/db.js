// /backend/config/db.js
const mysql = require('mysql');

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cimatec',
    database: 'gestao_escolar'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = db;
/*<?php 
// Criando a conexão
$pdo = new PDO("mysql:dbname=provaDS;host=localhost:3306","root","cimatec");
/*if ($pdo){
    echo "Banco conectado";
}*/

