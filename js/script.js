const form = document.querySelector('#form');
const input = document.querySelector('#input');
const priority = document.querySelector('#priority');
const date = document.querySelector('#date');
const btnDelete = document.querySelector('#delete');

let DataTodo = [];

// === PROFILE HANDLING (event delegation) ===
document.body.addEventListener('click', function(event) {
    if (event.target.id === 'btnSubmitProfile') {
        const username = document.querySelector('#username').value;
        const position = document.querySelector('#position').value;
        const div = document.createElement('div');
        div.innerHTML = `
            <p><b>${username}</b></p>
            <p>${position}</p>
            <button id="edit">Edit</button>
        `;
        const container = document.querySelector('#profile');
        container.innerHTML = '';
        container.appendChild(div);

    } else if (event.target.id === 'edit') {
        const container = document.querySelector('#profile');
        container.innerHTML = `
            <input type="text" id="username" placeholder="Masukkan Nama" required>
            <input type="text" id="position" placeholder="Masukkan Jabatan" required> 
            <button id="btnSubmitProfile">submit</button>
        `;
    }
})
const RenderData = () => {
    const container = document.querySelector('#container');
    container.innerHTML = '';
    DataTodo.forEach((todo) => {
        const div = document.createElement('div');
        div.className = 'todo-item';
        div.innerHTML = `
            <p class="${todo.done ? 'done' : ''}">${todo.ToDo} - ${todo.Priority} - ${todo.Date}</p>
            <input type="checkbox" class="todo-check" data-id="${todo.id}" ${todo.done ? "checked" : ""}>
            <button class="deleteItem" data-id="${todo.id}">Delete</button>
        `;
        container.appendChild(div);
    });
};

// === TODO FORM SUBMIT ===
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = {
        id : DataTodo.length + 1,
        ToDo: input.value,
        Priority: priority.value,
        Date: date.value,
        done: false
    };
    DataTodo.push(todo);
    RenderData();
    form.reset();
    console.log(DataTodo);
});

// === DELETE ALL ===
btnDelete.addEventListener('click', () => {
    DataTodo = [];
    RenderData();
});

// === EVENT DELEGATION FOR CHECKBOX
document.body.addEventListener('change', (event) => {
    if (event.target.classList.contains('todo-check')) {
        const id = parseInt(event.target.dataset.id);
        const checked = event.target.checked;
        DataTodo = DataTodo.map(todo =>
            todo.id === id ? { ...todo, done: checked } : todo
        );
        const p = event.target.previousElementSibling;
        p.classList.toggle("done", event.target.checked); 
        console.log(DataTodo);
    }
});


// removing an item
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteItem')) {
        const id = parseInt(event.target.dataset.id);
        DataTodo = DataTodo.filter(todo => todo.id !== id);
        RenderData();
    }
});