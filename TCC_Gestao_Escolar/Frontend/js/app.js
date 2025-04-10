// /frontend/js/app.js

// Função para fazer a requisição e atualizar a lista de alunos
function listarAlunos() {
    fetch('/api/alunos')
        .then(response => response.json())
        .then(data => {
            const listaAlunos = document.getElementById('listaAlunos');
            listaAlunos.innerHTML = ''; // Limpar a lista antes de adicionar novos itens
            data.forEach(aluno => {
                listaAlunos.innerHTML += `
                    <tr>
                        <td>${aluno.nome}</td>
                        <td>${aluno.email}</td>
                        <td>${aluno.turma}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarAluno(${aluno.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="excluirAluno(${aluno.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            Swal.fire('Erro', 'Não foi possível carregar os alunos', 'error');
        });
}

// Função para adicionar um novo aluno
document.getElementById('formAdicionarAluno').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeAluno').value;
    const email = document.getElementById('emailAluno').value;
    const turma = document.getElementById('turmaAluno').value;

    fetch('/api/alunos/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, turma }),
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire('Sucesso', 'Aluno adicionado com sucesso!', 'success');
        listarAlunos(); // Atualizar a lista de alunos após adicionar
    })
    .catch(error => {
        Swal.fire('Erro', 'Erro ao adicionar aluno', 'error');
    });
});

// Função para excluir um aluno
function excluirAluno(id) {
    fetch(`/api/alunos/excluir/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire('Sucesso', 'Aluno excluído com sucesso!', 'success');
        listarAlunos(); // Atualizar a lista após a exclusão
    })
    .catch(error => {
        Swal.fire('Erro', 'Erro ao excluir aluno', 'error');
    });
}

// Função para editar um aluno (exemplo de implementação)
function editarAluno(id) {
    // Aqui, você pode implementar um formulário pop-up ou redirecionar para uma página de edição
    Swal.fire('Funcionalidade em desenvolvimento');
}

// Função de inicialização da página, chama listarAlunos quando a página é carregada
window.onload = function() {
    listarAlunos(); // Exibe a lista de alunos ao carregar a página
};

// Função para editar evento
document.getElementById('formAdicionarEvento').addEventListener('submit', function(e) {
    e.preventDefault();
    const nomeEvento = document.getElementById('nomeEvento').value;
    const dataEvento = document.getElementById('dataEvento').value;
    const descricaoEvento = document.getElementById('descricaoEvento').value;

    fetch('/api/eventos/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nomeEvento, data: dataEvento, descricao: descricaoEvento }),
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire('Sucesso!', 'Evento adicionado com sucesso!', 'success');
        listarEventos(); // Atualiza a lista de eventos
    })
    .catch(error => {
        Swal.fire('Erro!', 'Erro ao adicionar evento', 'error');
    });
});

// Função para listar eventos
function listarEventos() {
    fetch('/api/eventos')
        .then(response => response.json())
        .then(data => {
            const listaEventos = document.getElementById('listaEventos');
            listaEventos.innerHTML = ''; // Limpar antes de adicionar os eventos
            data.forEach(evento => {
                listaEventos.innerHTML += `
                    <tr>
                        <td>${evento.nome}</td>
                        <td>${evento.data}</td>
                        <td>${evento.descricao}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarEvento(${evento.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="excluirEvento(${evento.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            Swal.fire('Erro', 'Não foi possível carregar os eventos', 'error');
        });
}

// Função para excluir evento
function excluirEvento(id) {
    fetch(`/api/eventos/excluir/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire('Sucesso', 'Evento excluído com sucesso!', 'success');
        listarEventos(); // Atualizar a lista após exclusão
    })
    .catch(error => {
        Swal.fire('Erro', 'Erro ao excluir evento', 'error');
    });
}
