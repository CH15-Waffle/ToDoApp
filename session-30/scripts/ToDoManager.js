import { nanoid } from "https://cdn.skypack.dev/nanoid@4.0.0";



// Type
export class Todo {
  constructor(title, duration, done = false) {
    // if(typeof title !== 'string') throw new Error(`title must be a string`)
    this._id = nanoid();
    this.title = title;
    this.duration = duration;
    this.done = done;
  }
  markDone(){
    this.done = true;
  }
  markNotDone(){
    this.done = false;
  }
}



/* TodosApp
{
  todos: [],
  log: {},
  owner: person
}
*/

export class TodoApp {
  todos = [];
  // log = {}
  constructor({person = null, todos = []} = {}) {
    this.todos = todos;
  }
  // Create
  createTodo({title, duration, done = false}) {
    const newTodo = new Todo(title, duration, done); // {}
    console.log(newTodo);
    this.todos.push(newTodo);
    return newTodo;
  }

  // * Read (findById, findByTitle)
  findTodoById(id) {
    return this.todos.find(function (todo) {
      return id === todo._id;
    });
  }

  findTodoByTitle(title) {
    return this.todos.find(function (todo) {
      return title === todo.title;
    });
  }

  find(field, value) {
    return this.todos.find(function (todo) {
      return value === todo[field];
    });
  }

  // Update
  update(id, updates) {
    // find where it is
    const idx = this.todos.findIndex(function (todo) {
      return todo._id === id;
    });

    console.log("idx", idx);
    // check that it exists
    if (idx === -1) {
      throw new Error(`Todo with id ${todo._id} not found`);
    }

    const todo = this.todos[idx]; // actual todo
    Object.assign(todo, updates);
    return todo;
  }

  markDone(todo) {
    // this.log[new Date()] = `${todo._id} modified`
    todo.done = true;
  }
  // Delete
  removeTodo(todo) {
    // find where it is
    const idx = this.todos.findIndex(function (t) {
      return t === todo;
    });

    console.log("idx", idx);
    // check that it exists
    if (idx === -1) {
      throw new Error(`Todo with id ${todo._id} not found`);
    }

    // remove it splice // startIndex, deleteCount, then we return it
    return this.todos.splice(idx, 1)[0];
  }
}
