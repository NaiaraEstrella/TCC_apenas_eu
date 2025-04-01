// /frontend/js/api.js

// Função para listar todos os alunos
export function listarAlunos() {
    return fetch('/api/alunos')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao listar alunos:', error);
            throw error;
        });
}

// Função para adicionar um novo aluno
export function adicionarAluno(aluno) {
    return fetch('/api/alunos/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aluno),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao adicionar aluno:', error);
        throw error;
    });
}

// Função para excluir um aluno
export function excluirAluno(id) {
    return fetch(`/api/alunos/excluir/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao excluir aluno:', error);
        throw error;
    });
}

// Função para listar todos os eventos
export function listarEventos() {
    return fetch('/api/eventos')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao listar eventos:', error);
            throw error;
        });
}

// Função para adicionar um novo evento
export function adicionarEvento(evento) {
    return fetch('/api/eventos/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao adicionar evento:', error);
        throw error;
    });
}

// Função para excluir um evento
export function excluirEvento(id) {
    return fetch(`/api/eventos/excluir/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao excluir evento:', error);
        throw error;
    });
}

// Função para listar todas as faltas
export function listarFaltas() {
    return fetch('/api/faltas')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao listar faltas:', error);
            throw error;
        });
}

// Função para adicionar uma falta
export function adicionarFalta(falta) {
    return fetch('/api/faltas/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(falta),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao adicionar falta:', error);
        throw error;
    });
}

// Função para excluir uma falta
export function excluirFalta(id) {
    return fetch(`/api/faltas/excluir/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao excluir falta:', error);
        throw error;
    });
}

// Função para listar todas as notas
export function listarNotas() {
    return fetch('/api/notas')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao listar notas:', error);
            throw error;
        });
}

// Função para adicionar uma nota
export function adicionarNota(nota) {
    return fetch('/api/notas/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nota),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao adicionar nota:', error);
        throw error;
    });
}

// Função para excluir uma nota
export function excluirNota(id) {
    return fetch(`/api/notas/excluir/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao excluir nota:', error);
        throw error;
    });
}

// Função para listar todas as turmas
export function listarTurmas() {
    return fetch('/api/turmas')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao listar turmas:', error);
            throw error;
        });
}

// Função para adicionar uma turma
export function adicionarTurma(turma) {
    return fetch('/api/turmas/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turma),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao adicionar turma:', error);
        throw error;
    });
}

// Função para excluir uma turma
export function excluirTurma(id) {
    return fetch(`/api/turmas/excluir/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro ao excluir turma:', error);
        throw error;
    });
}
