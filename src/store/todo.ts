import { makeAutoObservable } from "mobx";
import { Todos } from "../Types/types";

const item = localStorage.getItem("todos")!;
let localItem: any;
if (item !== undefined) {
    localItem = JSON.parse(item);
} else {
    localItem = JSON.parse("");
}

class Todo {
    todos: Todos[] = [{ id: 1, title: "Start the planing", completed: false }];

    constructor() {
        makeAutoObservable(this);
        if (localItem) {
            this.todos = localItem;
        }
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    addTodo(todo: { id: number; title: string; completed: boolean }) {
        this.filterAll();
        let arr = todo.title.trim();
        console.log(arr.length);

        if (arr.length > 0) {
            this.todos.push(todo);
        }
        localStorage.setItem("todos", JSON.stringify(this.todos));
        localItem = JSON.parse(localStorage.getItem("todos")!);
    }

    removeTodo(id: number) {
        this.filterAll();
        this.todos = this.todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(this.todos));
        localItem = JSON.parse(localStorage.getItem("todos")!);
    }

    completeTodo(id: number) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        localStorage.setItem("todos", JSON.stringify(this.todos));
        localItem = JSON.parse(localStorage.getItem("todos")!);
    }

    filterCompleted() {
        this.todos = localItem;
        this.todos = this.todos.filter((el) => el.completed === true);
        localItem = JSON.parse(localStorage.getItem("todos")!);
    }
    filterActive() {
        this.todos = localItem;
        this.todos = this.todos.filter((el) => el.completed === false);
        localItem = JSON.parse(localStorage.getItem("todos")!);
    }

    filterAll() {
        this.todos = localItem;
        localItem = JSON.parse(localStorage.getItem("todos")!);
    }
}

export default new Todo();
