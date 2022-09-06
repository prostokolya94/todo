import { makeAutoObservable } from "mobx";

const item = localStorage.getItem("todos")!;
let localItem: any;
if (item !== undefined) {
  localItem = JSON.parse(item);
} else {
  localItem = JSON.parse("");
}


class Todo {
  todos = [
    { id: 1, title: "buy milk", completed: false, className: "todo" },
    { id: 2, title: "meeting with Alex", completed: false, className: "todo" },
    { id: 3, title: "dog walking", completed: false, className: "todo" },
  ];


  constructor() {
    makeAutoObservable(this);
    if (localItem) {
      this.todos = localItem;
    }
  }

  addTodo(todo: { id: number; title: string; completed: boolean; className: string }) {
    let arr = todo.title.trim();
    console.log(arr.length);

    if (arr.length > 0) {
      this.todos.push(todo);
    }
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  completeTodo(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  filterCompleted() {
    this.todos = this.todos.map((el) => el.completed === true ? {...el, className: "hidden"}: el );
    this.todos = this.todos.map((el) => el.completed === false ? {...el, className: "todo"}: el );  
  }
  filterActive() {
    this.todos = this.todos.map((el) => el.completed === false ? {...el, className: "hidden"}: el );
    this.todos = this.todos.map((el) => el.completed === true ? {...el, className: "todo"}: el );
    //this.todos = this.todos.filter((el) => el.completed === false);
  }

  filterAll() {
    this.todos = this.todos.map((el) => el.completed === false ? {...el, className: "todo"}: el );
    this.todos = this.todos.map((el) => el.completed === true ? {...el, className: "todo"}: el );
  }
}

export default new Todo();
