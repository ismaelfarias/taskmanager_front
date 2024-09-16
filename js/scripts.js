// Seleção de elementos

const newTaskForm = document.querySelector("#newTask-form");
const newTaskInput = document.querySelector("#newTask");
const newItems = document.querySelector("#new-items");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const doingTasks = document.querySelector("#doing-tasks");
const doneTasks = document.querySelector("#done-tasks");
const taskModal = document.querySelector("#task-modal");
const taskModalContent = document.querySelector("#modal-content-form");
const closeTaskModal = document.getElementsByClassName("close")[0];
const taskModalForm = document.getElementsByClassName("taskEditForm")

// Cunsulta tarefas existentes no banco de dados e apresenta no Board
const getList = async () => {
    let url = 'http://127.0.0.1:5000/tasks';
    fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            data.tasks.forEach(item => saveTask(item.titulo, item.id, item.status));

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


getList()


// Funções

const addTask = async (text) => {
    const formData = new FormData();
    formData.append("titulo", text);
    let url = 'http://127.0.0.1:5000/task';
    console.log(text)
    console.log(formData);
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then((response) => console.log(response))
        .catch((error) => {
            console.error('Error:', error);
        });
}

const updateTask = () => {
    let taskID = document.getElementsById("taskID").value;
    let taskTitulo = document.getElementById("task-titulo").value;
    let taskDescricao = document.getElementById("itemDesc").value;

    const formData = new FormData();
    formData.append("id", taskID);
    formData.append("titulo", taskTitulo);
    formData.append("descricao", taskDescricao)
    let url = 'http://127.0.0.1:5000/task';
    console.log(formData);
    fetch(url, {
        method: 'PATCH',
        body: formData
    })
        .then((response) => updateStats())
        .catch((error) => {
            console.error('Error:', error);
        });
}

function updateStats() {
    alert("Tarefa Atualizada")
    taskModal.style.display = "none";
    taskModalContent.replaceChildren();
}


const editTask = async (id, titulo) => {
    let url = 'http://127.0.0.1:5000/task';

    const taskEdit = document.createElement("form");
            taskEdit.setAttribute('class', "taskEditForm")
            taskEdit.setAttribute('id', "taskEditForm")
            const formItemID = document.createElement("input");
            formItemID.setAttribute('class', "taskID");
            formItemID.setAttribute('id', "taskID");
            formItemID.setAttribute('value', id)
            taskEdit.appendChild(formItemID);
            const formtItemTitulo = document.createElement("input");
            formtItemTitulo.setAttribute('value', titulo)
            formtItemTitulo.setAttribute('id', "task-titulo")
            taskEdit.appendChild(formtItemTitulo)
            taskModalContent.appendChild(taskEdit);

    fetch(url + "?id=" + id, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.tasks.forEach(item => (tid = item.id, titulo = item.titulo, descricao = item.descricao, taskstatus = item.status, dt_criacao = item.dt_criacao));
            // const taskEdit = document.createElement("div");
            // taskEdit.setAttribute('class', "taskEditForm")
            // taskEdit.setAttribute('id', "taskEditForm")
            // const formItemID = document.createElement("input");
            // formItemID.setAttribute('class', "taskID");
            // formItemID.setAttribute('id', "taskID");
            // formItemID.setAttribute('value', tid)
            // taskEdit.appendChild(formItemID);

            // const formtItemTitulo = document.createElement("input");
            // formtItemTitulo.setAttribute('value', titulo)
            // formtItemTitulo.setAttribute('id', "task-titulo")
            // taskEdit.appendChild(formtItemTitulo)

            const formtItemDesc = document.createElement("input");
            formtItemDesc.setAttribute('value', descricao)
            formtItemDesc.setAttribute('id', "itemDesc")
            taskEdit.appendChild(formtItemDesc)

            const formtItemStatus = document.createElement("input");
            formtItemStatus.setAttribute('value', taskstatus)
            formtItemStatus.setAttribute('id', "itemStatus")
            taskEdit.appendChild(formtItemStatus)

            const formtItemDtCriacao = document.createElement("input");
            formtItemDtCriacao.setAttribute('value', dt_criacao)
            formtItemDtCriacao.setAttribute('id', "data-criacao")
            taskEdit.appendChild(formtItemDtCriacao)

            const saveBtn = document.createElement("button");
            saveBtn.setAttribute('id', "save-btn")
            saveBtn.setAttribute('value', "salvar")
            saveBtn.classList.add("saveInput");
            saveBtn.setAttribute('onclick', "updateTask()")
            saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            taskEdit.appendChild(saveBtn);

            console.log(taskEdit)
            console.log(taskModalContent)
            taskModalContent.appendChild(taskEdit);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
//         .finally(() => {
//         alert("Servidor indisponivel")
//         updateStats()
//    });
}

const delTask = async (id) => {
    let url = 'http://127.0.0.1:5000/task';
    console.log(id);
    fetch(url + "?id=" + id, {
        method: 'DELETE',
    })
        .then((response) => console.log(response))
        .catch((error) => { console.error('Error:', error) });
}

const saveTask = (text, id = 1, status) => {

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const newItemID = document.createElement("span");
    newItemID.setAttribute('class', "taskID")
    newItemID.innerHTML = id;
    tasks.appendChild(newItemID);

    const newItemTitle = document.createElement("h4");
    newItemTitle.setAttribute('class', "taskTitulo")
    newItemTitle.innerText = text;
    tasks.appendChild(newItemTitle);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-task");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    tasks.appendChild(editBtn);

    const updateBtn = document.createElement("button");
    updateBtn.classList.add("init-task");
    updateBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    tasks.appendChild(updateBtn);

    const delBtn = document.createElement("button");
    delBtn.classList.add("delInput");
    delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    tasks.appendChild(delBtn);

    const taskStatus = document.createElement("span");
    taskStatus.classList.add("task-status");
    taskStatus.innerText = status;
    tasks.appendChild(taskStatus);

    if (status == 1) {
        newItems.appendChild(tasks);
    }
    else if (status == 2) {
        updateBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        doingTasks.appendChild(tasks);

    }
    else if (status == 3) {
        doneTasks.appendChild(tasks);

    }
    else {
        taskStatus.innerText = 1;
        tasks.appendChild(taskStatus);
        newItems.appendChild(tasks);
    }

    // Retorna o foco para o formulário
    newTaskInput.value = "";
    newTaskInput.focus();

}


// Eventos

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = newTaskInput.value;

    if (inputValue) {
        console.log(inputValue)
        saveTask(inputValue);
        addTask(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    const taskID = parentEl.querySelector(".taskID").innerText;

    if (targetEl.classList.contains("edit-task")) {

        const taskTitulo = parentEl.querySelector(".taskTitulo").innerHTML;
        const source = parentEl;
        taskModal.style.display = "block";
        editTask(taskID, taskTitulo);
    }
    else if (targetEl.classList.contains("init-task")) {
        const source = parentEl
        const taskStatus =  parentEl.querySelector(".task-status");
        if (taskStatus.innerText == 1) {
            taskStatus.innerText = 2;
            console.log(taskStatus)
            console.log(taskID);
            doingTasks.append(source);
        } else {
            taskStatus.innerText = 3;
            doneTasks.append(source);
        }
        
    }

    else if (targetEl.classList.contains("delInput")) {
        parentEl.remove();
        console.log(taskID);
        delTask(taskID);
    }

    else if (targetEl.classList.contains("close-task")) {
        parentEl.remove();
        console.log(taskID);
        delTask(taskID);
    }

    else if (targetEl.classList.contains("close")) {
        taskModal.style.display = "none";
        taskModalContent.replaceChildren();

    }
})