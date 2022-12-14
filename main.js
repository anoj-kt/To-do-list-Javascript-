//VARIABLES
const newTaskInput = document.querySelector('#new-task-input'); //selects input field to add tasks
const newTaskSubmit = document.querySelector('#new-task-submit'); //selects the add task button 
const tasks = document.querySelector('#tasks');//selects the div where all the tasks will be displayed in

//EVENTLISTENERS
window.addEventListener('load', getTask);//gets the tasks from local storage after refreshing
newTaskSubmit.addEventListener('click', addTodo); //adds task to the task list (also includes the function to edit tasks)
tasks.addEventListener('click', deleteCheck) //deletes tasks or marks task as completed

//FUNCTIONS
function addTodo(event) {
    event.preventDefault(); //prevents website from refreshing
    
    const taskDiv = document.createElement('div'); //creates a div for the whole task and will include the following divs
    taskDiv.classList.add('task');

    const completedTask = document.createElement('button'); //creates the check button button
    completedTask.innerHTML = '<i class="fa-solid fa-check"></i>'; 
    completedTask.classList.add('completed-button');
    taskDiv.appendChild(completedTask);
 
    const newTask = document.createElement('input'); //creates the content div
    newTask.value = newTaskInput.value;
    newTask.type = 'text';
    newTask.setAttribute('readonly', true);
    newTask.classList.add('content');
    taskDiv.appendChild(newTask);

    saveTask(newTaskInput.value); //saves task to local storage

    const editTask = document.createElement('button'); //creates the edit button
    editTask.innerHTML = '<i class="fas fa-pencil-alt"></i>'; 
    editTask.classList.add('edit-button');
    taskDiv.appendChild(editTask);

    const deleteTask = document.createElement('button'); //creates the delete button
    deleteTask.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteTask.classList.add('delete-button');
    taskDiv.appendChild(deleteTask);

    tasks.appendChild(taskDiv); //this puts this newly created task div into the main task list

    newTaskInput.value=''; //clears the content typed in the add task area
    
    editTask.addEventListener('click', editTodo)  //edits and saves task content
    
    function editTodo(event) {
        if (editTask.innerHTML == '<i class="fas fa-pencil-alt"></i>'){
            editTask.innerHTML = 'Save';
            newTask.removeAttribute('readonly');
            newTask.focus();
        } else {
            editTask.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            newTask.setAttribute('readonly', true);
        }
        
    }
}    

function deleteCheck(event) {  //deletes tasks or marks tasks as completed

    const itemSelected = event.target;

    if (itemSelected.classList[0] === 'delete-button') {
        deleteLocal (itemSelected);
        itemSelected.parentElement.remove();
    }
    if (itemSelected.classList[0] === 'completed-button') {
        itemSelected.parentElement.classList.toggle('completed');
    }   
}  

//LOCAL STORAGE FUNCTIONS
function checkForLocal () { //checks local storage for existing array
    let localTask;

    if (localStorage.getItem('tasks') == null) {
        localTask = [];
    } else {
        localTask = JSON.parse(localStorage.getItem('tasks'));
    }
    return localTask;
}

function saveTask (task) { //saves tasks to local storage
    let localTask = checkForLocal ();
    
    localTask.push(task);

    localStorage.setItem('tasks', JSON.stringify(localTask));   
}

function getTask () { //gets the tasks from local storage after refreshing
    let localTask = checkForLocal ();

    localTask.forEach(function(task) {
    const taskDiv = document.createElement('div'); //creates a div for the whole task and will include the following divs
    taskDiv.classList.add('task');

    const completedTask = document.createElement('button'); //creates the check button button
    completedTask.innerHTML = '<i class="fa-solid fa-check"></i>'; 
    completedTask.classList.add('completed-button');
    taskDiv.appendChild(completedTask);
 
    const newTask = document.createElement('input'); //creates the content div
    newTask.value = task;
    newTask.type = 'text';
    newTask.setAttribute('readonly', true);
    newTask.classList.add('content');
    taskDiv.appendChild(newTask);

    const editTask = document.createElement('button'); //creates the edit button
    editTask.innerHTML = '<i class="fas fa-pencil-alt"></i>'; 
    editTask.classList.add('edit-button');
    taskDiv.appendChild(editTask);

    const deleteTask = document.createElement('button'); //creates the delete button
    deleteTask.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteTask.classList.add('delete-button');
    taskDiv.appendChild(deleteTask);

    tasks.appendChild(taskDiv); //this puts this newly created task div into the main task list
    
    editTask.addEventListener('click', editTodo)  //edits and saves task content
    
    function editTodo(event) {
        if (editTask.innerHTML == '<i class="fas fa-pencil-alt"></i>'){
            editTask.innerHTML = 'Save';
            newTask.removeAttribute('readonly');
            newTask.focus();
        } else {
            editTask.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            newTask.setAttribute('readonly', true);
            // updateLocal(newTask.value);
        } 
    }    
    })
}

function deleteLocal(task) { //deletes task inside local storage
    let localTask = checkForLocal ();

    const taskIndex = localTask.indexOf(task.parentElement.children[1].value);
    localTask.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(localTask))
}