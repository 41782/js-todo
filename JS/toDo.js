const tdInput = document.querySelector('.todo-input');
const tdBtn = document.querySelector('.todo-btn');
const tdList = document.querySelector('.todo-list');
const darkTheme = document.querySelector('.dark-theme');
const lightTheme = document.querySelector('.light-theme');


tdBtn.addEventListener('click', addToDo);
tdList.addEventListener('click', deletecheck);
darkTheme.addEventListener('click', () => changeTheme('dark'));
lightTheme.addEventListener('click', () => changeTheme('light'));
document.addEventListener("DOMContentLoaded", getTodos);


let localTheme = localStorage.getItem('localTheme');
localTheme === null ?
    changeTheme('dark')
    : changeTheme(localStorage.getItem('localTheme'));


function addToDo(event) {

    event.preventDefault();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${localTheme}-todo`);


    const newToDo = document.createElement('li');
    if (tdInput.value === '') {
            alert("Sinun tulee kirjoittaa jotain!");
        } 

    else {

        newToDo.innerText = tdInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        savelocal(tdInput.value);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${localTheme}-button`);
        toDoDiv.appendChild(checked);
   
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${localTheme}-button`);
        toDoDiv.appendChild(deleted);

        tdList.appendChild(toDoDiv);

        tdInput.value = '';
    }

}   


function deletecheck(event){

    const item = event.target;

    if(item.classList[0] === 'delete-btn')
    {
        item.parentElement.classList.add("fall");

        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }

    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }


}

function savelocal(todo){

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos() {

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {

        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${localTheme}-todo`);

        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${localTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${localTheme}-button`);
        toDoDiv.appendChild(deleted);

        tdList.appendChild(toDoDiv);
    });
}


function removeLocalTodos(todo){

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }

    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

function changeTheme(color) {
    localStorage.setItem('localTheme', color);
    localTheme = localStorage.getItem('localTheme');

    document.body.className = color;

    color === 'darker' ? 
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${color}-input`;

    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ? 
            todo.className = `todo ${color}-todo completed`
            : todo.className = `todo ${color}-todo`;
    });

    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
              button.className = `check-btn ${color}-button`;  
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`; 
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
}