//Clear localstorage
//localStorage.clear();

//Selectors
const input = document.querySelector(".input");
const addBtn = document.querySelector(".addBtn");
const list = document.querySelector(".list");

//Arrow Functions (not hoisted, order matters)
const addFocus = () => {
    input.focus();
}

const getTodos = () => {

    let todos;
    //Check to see if array exist
    if(localStorage.getItem("todos") === null) {
    //If not, create a new array    
        todos = [];
    } else {
    //Else, retrieve the existing array    
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //Display the todos
    todos.forEach((todo) => {
        //Add todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoDiv");
        //Create li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todoText");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        //Create completed button
        const completedButton = document.createElement('button');
        completedButton.classList.add("completeBtn");
        completedButton.innerText = "✓";
        todoDiv.appendChild(completedButton);
        //Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add("deleteBtn");
        deleteButton.innerText = "-";
        todoDiv.appendChild(deleteButton);
        //Append to todoDO
        list.appendChild(todoDiv);
        });
}

const saveLocalTodos = (todoText) => {
    let todos;
    //Check to see if array exist
    if(localStorage.getItem("todos") === null) {
    //If not, create a new array    
        todos = [];
    } else {
    //Else, retrieve the todos array    
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //Add new todo into the array
    todos.push(todoText);
    //Save updated array into localstorae
    localStorage.setItem("todos", JSON.stringify(todos));
}

const addTodo = (event) => {

    //Prevent form from default submitting
    event.preventDefault();
    //Add todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");
    //Create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todoText");
    newTodo.innerText = input.value;
    todoDiv.appendChild(newTodo);
    //Add todo to localstorage
    saveLocalTodos(input.value);
    //Create completed button
    const completedButton = document.createElement('button');
    completedButton.classList.add("completeBtn");
    completedButton.innerText = "✓";
    todoDiv.appendChild(completedButton);
    //Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("deleteBtn");
    deleteButton.innerText = "-";
    todoDiv.appendChild(deleteButton);
    //Append to list
    list.appendChild(todoDiv);
    //Clear input value
    input.value = "";
}

const saveAndDeleteCompletedLocalTodo = (todoDiv) => {

    let completedTodos;
    //Check to see if array exist
    if(localStorage.getItem("completedTodos") === null) {
    //If not, create a new array    
        completedTodos = [];
    } else {
    //Else, retrieve the existing array    
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }

    //Retrieve the todoDiv text value  
    const todoText = todoDiv.children[0].innerText;
    //Add completed todo into completedTodos array
    completedTodos.push(todoText);
    //Save updated completedTodos array into localstorage
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    

    //Retrieve the todos array
    let todos = JSON.parse(localStorage.getItem('todos'));
    //Retrieve the index of the array item
    const Index = todos.indexOf(todoText);
    //Remove the item in todos array
    todos.splice(Index, 1);
    //Save updated todos array into localstorage
    localStorage.setItem("todos", JSON.stringify(todos)); 
}

const deleteLocalTodo = (todoDiv) => {

    let todos;
    //Check to see if array exist
    if(localStorage.getItem("todos") === null) {
    //If not, create a new array    
        todos = [];
    } else {
    //Else, retrieve the existing array    
        todos = JSON.parse(localStorage.getItem('todos'));
    }

   //Retrieve the todoDiv text value  
   const todoText = todoDiv.children[0].innerText;
   //Retrieve the index of the array item
   const Index = todos.indexOf(todoText);
   //Remove the item in todos array
   todos.splice(Index, 1);
   //Save updated todos array into localstorage
   localStorage.setItem("todos", JSON.stringify(todos)); 
}

const deleteCheck = (event) => {

    //Identify which element is being clicked
    const item = event.target;
    console.log(item);

    //Delete todoDiv
    if (item.classList[0] === "deleteBtn") {
        const todoDiv = item.parentElement;
        //Animation
        todoDiv.classList.add("animationFall");
        deleteLocalTodo(todoDiv);
        todoDiv.addEventListener("transitionend", () => {
            todoDiv.remove();
        })
    }
    //Check todoDiv
    if (item.classList[0] === "completeBtn") {
        const todoDiv = item.parentElement;
        //Animation
        todoDiv.classList.add("animationRaise");
        saveAndDeleteCompletedLocalTodo(todoDiv);
        todoDiv.addEventListener("transitionend", () => {
            todoDiv.remove();
        })
    }
}

//Event Listeners
window.addEventListener('load', addFocus);
window.addEventListener('load', getTodos);
addBtn.addEventListener('click', addTodo);
list.addEventListener('click', deleteCheck);

