import {TodoApp} from "./ToDoManager.js"
// import {createTodoHTML, renderList} from "./DOM-methods"
import { CreateTodoHTML, RenderList } from "./test.js" 
import { serialize, populate} from "./form-methods.js"
// variables and functions
const lsKey = 'todos'
function saveTodos (todos = [], key = lsKey) {
    localStorage.setItem(key, todos)
}

function loadTodos(key = lsKey) {
    return localStorage.getItem(key)
}

// state

const memoryApp = new TodoApp({
    todos: loadTodos() || []
})
console.log("[index.js:9]: memoryApp: ", memoryApp)




// selectors
const todosList = document.getElementById('todos-list')
const todosForm = document.forms["todos-form"]
console.log("[index.js:19]: todosList: ", todosList)
console.log("[index.js:20]: todosForm: ", todosForm)

// actions
RenderList(todosList, memoryApp.todos)

// bindings
todosForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event)
    const data = serialize(todosForm)

    if(data._id) {
        //update
        memoryApp.update(data._id, data)
    } else {
        console.log("[index.js:39]: data: ", data)
    memoryApp.createTodo(data);
    }
   

    todosForm.reset()
    saveTodos(memoryApp.todos)
    RenderList(todosList, memoryApp.todos)
})

todosList.addEventListener('click', (event) => {
    console.log(event)
    const {target} = event;
    const {id} = event.target.dataset

    if(!id) return;

    const todo = memoryApp.findTodoById(id)

    if(target.matches('.done-btn')) {
        // mark as done
        console.log('done')
        if(todo.done) {
            todo.markNotDone()
        } else {
            todo.markDone()
        }
    } else if(target.matches('.update-btn')) {
        // update
        console.log('update')
        populate(todosForm, todo)

    } else if(target.matches('.delete-btn')) {
        // delete
        console.log('delete')
        memoryApp.removeTodo(todo)

    }
    saveTodos(memoryApp.todos)

    RenderList(todosList, memoryApp.todos)
})