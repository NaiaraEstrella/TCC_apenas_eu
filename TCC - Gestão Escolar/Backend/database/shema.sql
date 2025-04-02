CREATE DATABASE gestao_escolar;
USE gestao_escolar;

-- Tabela de Usuários
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('diretor', 'professor', 'aluno') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Diretores
CREATE TABLE Diretores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Professores
CREATE TABLE Professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Turmas
CREATE TABLE Turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    semestre INT NOT NULL,
    diretor_id INT,
    FOREIGN KEY (diretor_id) REFERENCES Diretores(id) ON DELETE SET NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Alunos
CREATE TABLE Alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    turma_id INT,
    FOREIGN KEY (turma_id) REFERENCES Turmas(id) ON DELETE SET NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Materias
CREATE TABLE Materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela intermediária Professores_Materias (N:N)
CREATE TABLE Professores_Materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    professor_id INT NOT NULL,
    materia_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (professor_id) REFERENCES Professores(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES Materias(id) ON DELETE CASCADE
);

-- Tabela intermediária Professores_Turmas (N:N)
CREATE TABLE Professores_Turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    professor_id INT NOT NULL,
    turma_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (professor_id) REFERENCES Professores(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES Turmas(id) ON DELETE CASCADE
);

-- Tabela de Notas
CREATE TABLE Notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    materia_id INT NOT NULL,
    nota DECIMAL(5,2) NOT NULL,
    tipo_atividade VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES Alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES Materias(id) ON DELETE CASCADE
);

-- Tabela de Faltas
CREATE TABLE Faltas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    turma_id INT NOT NULL,
    data DATE NOT NULL,
    justificativa TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES Alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES Turmas(id) ON DELETE CASCADE
);

-- Tabela de Calendário Escolar
CREATE TABLE Calendario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    tipo_evento ENUM('prova', 'feriado', 'reunião', 'outro') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Eventos Escolares
CREATE TABLE Eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_evento DATE NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
