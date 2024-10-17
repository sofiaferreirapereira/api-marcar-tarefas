const jsonfile = require("jsonfile");

/* Caminho para chegar no arquivo com as tarefas */
db_path = "Backend//database//tasks.json"

/* Função para ler arquivos JSON */
function readList(db_path) {
    const tasks = jsonfile.readFileSync(db_path);
    return tasks;
}

/* Testar a função de ler arquivos */
//console.log(readList(db_path));

/* Função para escrever a lista de tarefas json */
function appendList(db_path, new_task) {
    const actual_tasks = readList(db_path); /* pega as atividades salvas */

    /* Validação da entrada do usuário */
    if(!("nome" in new_task && "status" in new_task)) {
        console.log("!!! JSON com chaves(keys) erradas, use nome e status da tarefa.");
        return false;
    };
    if(Object.keys(new_task).length != 2) {
        console.log("!!! JSON com propriedades a mais.");
        return false;
    };

    /* Organizar os IDs */
    let task_id = 0;
    actual_tasks.forEach(element => {
        element.id = task_id;
        task_id += 1;
    });

    /* Adicionar o ID da nova tarefa */
    new_task.id = actual_tasks.length;

    actual_tasks.push(new_task);
    jsonfile.writeFileSync(db_path, actual_tasks, {spaces: 2}); /* recebe 3 parâmetros: o caminho, as
    atividades atuais e um estilo de formatação(identação) */
    return true;
}

/* Testar função de escrever um arquivo json */
//appendList(db_path, {"nome": "Ler", "status": true});
//console.log(readList(db_path));

/* Função para editar um item da lista de tarefas JSON */
function editList(db_path, id_task, new_task) {
    id_task = Number(id_task);
    const actual_tasks = readList(db_path);

    /* Verificar se o id exise para fazer a busca */
    if(id_task <= actual_tasks.length - 1) {
        actual_tasks[id_task].nome = new_task.nome;
        actual_tasks[id_task].status = new_task.status;
        jsonfile.writeFileSync(db_path, actual_tasks, {spaces:2});
        return true;
    }
    else {
        console.log(`Não encontrada a tarefa número: ${id_task}`);
    }
};

/* Função para deletar um item da lista */
function deleteItemList(db_path, id_task) {
    id_task = Number(id_task);
    let actual_tasks = readList(db_path);
    /* Verificar se o ID existe para fazer a busca */
    if(id_task <= actual_tasks.length - 1){
        actual_tasks.splice(id_task, 1);
        /* Organizar as IDs */
        let task_id = 0;
        actual_tasks.forEach(element => {
            element.id = task_id;
            task_id += 1;
        });
        jsonfile.writeFileSync(db_path, actual_tasks, {spaces:2});
        return true;
    }
    else {
        console.log(`Não encontrada a tarefa número: ${id_task}`);
        return false;
    }
}

/* Função para deletar todos os itens da lista */
function clearList(db_path) {
    jsonfile.writeFileSync(db_path, [], {spaces: 2});
}

/* Testar funções de criar nova tarefa, ler arquivo de tarefas, editar tarefa, deletar tarefa e limpar o campo */
/*new_task = {"nome":"Ler um capítulo do livro", "status":"Concluido"}
appendList(db_path, new_task)
console.log(readList(db_path));*/
/*new_task = {"nome":"Ler um capítulo do livro", "status":"Agurdando"}
editList(db_path, 0, new_task)
console.log(readList(db_path));*/
/*deleteItemList(db_path, 0);
console.log(readList(db_path));*/
/*clearList()
console.log(readList(db_path));*/

module.exports = { readList, appendList, editList, deleteItemList, clearList }