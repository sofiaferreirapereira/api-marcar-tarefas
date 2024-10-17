const API_URL = "http://localhost:3000/tarefas";

/* Função GET para pedir as tarefas */
async function getTarefas() {
    try{
        const resposta = await fetch(API_URL);
        const lista_tarefas = await resposta.json();
        return lista_tarefas
        console.log(lista_tarefas); 
    } 
    catch(erro)
    {
        const message_error = `Erro ao exibir as tarefas: ${erro}`;
        console.log(message_error);
    }
}

async function postTarefas(novaTarefa){
    try
    {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            /* Formato {"nome":"nomeTarefa", "status":"statusTarefa"} */
            body:JSON.stringify(novaTarefa)
        });
    }
    catch(erro)
    {
        console.log(`Erro ao adicionar nova tarefa: ${erro}`);
    }
};

/* Deletar uma tarefa */
async function deleteTarefas(id){
    try
    {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
    }
    catch(erro)
    {
        console.log(`Erro ao deleter uma tarefa: ${erro}`);
    }
};

/* Deletar todas as tarefas */
async function limparTarefas(){
    try 
    {
        const resposta = await fetch(API_URL, {
            method: "DELETE"
        });
    }
    catch(erro)
    {
        console.log(`Erro ao deleter todas as tarefas: ${erro}`);
    }
} 

/* Editar uma tarefa com base no seu id*/
async function putTarefas(id, tarefaAtualizada) {
    try
    {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(tarefaAtualizada),
        });
    }
    catch(erro)
    {
        console.log(`Erro ao editar a tarefa pelo id: ${erro}`);
    }
}

/* Função chamada quando o botão de editar tarefa é acionado */
function editarTarefa(tarefa){
    const novoStatus = tarefa.status === "Concluida" ? "Pendente" : "Concluida";
    const tarefaAtualizada = {nome: tarefa.nome, status: novoStatus};
    putTarefas(tarefa.id, tarefaAtualizada);
};

/* Carrega a lista de tarefas */
async function carregarListaTarefas(){
    const listaTarefas = document.getElementById('listaTarefas');
    const tarefas = await getTarefas() || [];
    /* Limpar a lista no início */
    listaTarefas.innerHTML = "";
    /* Adicionar cada tarefa  do array vinda do fetch para a ul(listaTarefas) */
    tarefas.forEach((tarefa) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${tarefa.nome} - ${tarefa.status}</span>
                        <button onclick="deleteTarefas(${tarefa.id})">Excluir</button>
                        `;
        
        //outro modo para criar o editar tarefa:
        const editButton = document.createElement("button");
        editButton.textContent = "Mudar status";
        editButton.addEventListener('click', () => {editarTarefa(tarefa)});
        li.appendChild(editButton);

        listaTarefas.appendChild(li);
    });
};

/* Função chamada pelo onsubmit */
function adicionarTarefa(event){
    event.preventDefault();
    const nomeTarefa = document.getElementById('nomeTarefa').value;
    const statusTarefa = document.getElementById('statusTarefa').value;
    postTarefas({nome: nomeTarefa, status: statusTarefa});
    // carregarListaTarefas()
};

/* Função chamada pelo botão de limpar todas as tarefas */
document.getElementById('limparTarefas').addEventListener('click', () => {
    if(confirm("Tem certeza de que deseja limpar todas as tarefas?")){
        limparTarefas();
    };
});

/* Carregar as tarefas ao inicializar a página */
document.addEventListener('DOMContentLoaded', carregarListaTarefas());

/* // Para testar as funções:
document.getElementById('buttonGet').onclick=async()=>{
    await getTarefas();
};
document.getElementById('buttonPost').onclick=async()=>{
    //const nova_tarefa = {"nome": "nomeTarefa", "status": "statusTarefa"};
    const nova_tarefa = {"nome": "Ler o livro 'Mulherzinhas'", "status": "Não concluido"};
    await postTarefas(nova_tarefa);
};
document.getElementById('buttonPut').onclick=async()=>{
    const id = 0;
    const tarefaAtualizada = {"nome": "Ler o livro 'Mulherzinhas'", "status": "Concluido"};
    await putTarefas(id, tarefaAtualizada);
};
document.getElementById('buttonDelete').onclick=async()=>{
    const id = 0;
    await deleteTarefas(id);
};
document.getElementById('buttonDeleteAll').onclick=async()=>{
    await limparTarefas();
};
*/