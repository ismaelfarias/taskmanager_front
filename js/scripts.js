// Seleção de elementos

const newTaskForm = document.querySelector("#newTask-form");
const newTaskInput = document.querySelector("#newTask");
const newItems = document.querySelector("#new-items");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const doingTasks = document.querySelector("#doing-tasks");
const doneTasks = document.querySelector("#done-tasks");


const getList = async () => {
    let url = 'http://127.0.0.1:5000/tasks';
    fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
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

const delTask = async (id) => {
    let url = 'http://127.0.0.1:5000/task/';
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
    newItemTitle.innerText = text;
    tasks.appendChild(newItemTitle);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-task");
    editBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    tasks.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.classList.add("delInput");
    delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    tasks.appendChild(delBtn);

    if (status == 1) {
        newItems.appendChild(tasks);
    }
    else if (status == 2) {
        editBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
        doingTasks.appendChild(tasks);

    }
    else if (status == 3) {
        doneTasks.appendChild(tasks);

    }
    else {
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
        saveTask(inputValue);
        addTask(inputValue);
    }
});


document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    const taskID = parentEl.querySelector(".taskID").innerText;

    if (targetEl.classList.contains("edit-task")) {
        const source = parentEl;
        doingTasks.append(source);
    }

    if (targetEl.classList.contains("delInput")) {
        parentEl.remove();
        console.log(taskID);
        delTask(taskID);
    }
})