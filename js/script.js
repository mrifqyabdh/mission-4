const form = document.querySelector('#form');
const input = document.querySelector('#input');
const priority = document.querySelector('#priority');
const date = document.querySelector('#date');
const btnDelete = document.querySelector('#delete');
const dateToday = document.querySelector('#date-today');


let today = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const Today = today.toLocaleDateString('en-US', options);

dateToday.textContent = Today;
let DataTodo = [];

// === PROFILE HANDLING (event delegation) ===
document.body.addEventListener('click', function(event) {
    if (event.target.id === 'btnSubmitProfile') {
        const username = document.querySelector('#username').value;
        const position = document.querySelector('#position').value;
        
        const div = document.createElement('div');
        div.innerHTML = `
            <button class="btn-profile" id="edit">EDIT</button>
        `;
        const container = document.querySelector('#profile');
        const container1 = document.querySelector('#profile-h1');
        container1.textContent = `${username} - ${position}`;
        container.innerHTML = '';
        container.appendChild(div);
        container.parentElement.classList.replace('profile-card', 'profile-card-done');


    } else if (event.target.id === 'edit') {
        const container = document.querySelector('#profile');
        container.innerHTML = `
            <p>Nama :</p>
            <input type="text" id="username" placeholder="Masukkan Nama" required>
            <p>Jabatan :</p>
            <input type="text" id="position" placeholder="Masukkan Jabatan" required> 
            <button class="btn-profile" id="btnSubmitProfile">SUBMIT</button>
        `;
        container.parentElement.classList.replace('profile-card-done', 'profile-card');
        const container1 = document.querySelector('#profile-h1');
        container1.textContent = `Profile`;
    }
})
const RenderData = () => {
    const container = document.querySelector('#container');
    const containerDone = document.querySelector('#container-done');
    container.innerHTML = '';
    containerDone.innerHTML = '';
    DataTodo.forEach((todo) => {
        let date = new Date(todo.Date);
        let formatted = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',   // 👉 full month name
            year: 'numeric'
        });
        const div = document.createElement('div');
        div.className = 'todo-item';
        div.innerHTML = `
            <input type="checkbox" class="todo-check" data-id="${todo.id}" ${todo.done ? "checked" : ""}>
            
            <p class="${todo.done ? 'done' : ''}">${todo.ToDo} - ${todo.Priority} Priority - ${formatted}</p>
            
            <button class="deleteItem" data-id="${todo.id}">Delete</button>
        `;
        container.appendChild(div);
        if (div.firstElementChild.nextElementSibling.classList.contains('done')) {
            const divDone = document.createElement('div');
            divDone.className = 'todo-item';
            divDone.innerHTML = `
            <input type="checkbox" class="todo-check" data-id="${todo.id}" ${todo.done ? "checked" : ""}>
                <p class="${todo.done ? 'done' : ''}">${todo.ToDo} - ${todo.Priority} Priority - ${formatted}</p>
                <button class="deleteItem" data-id="${todo.id}">Delete</button>
            `;
            containerDone.appendChild(divDone);
        }
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
        const p = event.target.nextElementSibling;
        p.classList.toggle("done", event.target.checked); 
        RenderData();
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