import { observer } from "mobx-react-lite";
import { useState } from "react";
import todo from "../store/todo";
import "../style.scss";

const TodoList = observer(() => {
  const [value, setValue] = useState("");

  function click() {
    todo.addTodo({ id: Date.now(), title: value, completed: false, className: "todo" });
  }

  return (
    <div className="container">
      <h1>Task manager</h1>
      <form className="add-block">
        <input
          placeholder="enter your task"
          className="input"
          type="text"
          onChange={(event) => setValue(event.target.value)}
        />
        <button onClick={click!}>add</button>
      </form>
      {todo.todos.map((t) => (
        <div className={t.className} key={t.id}>
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => todo.completeTodo(t.id)}
          />
          {t.title}
          <button
            className="remove-button"
            onClick={() => todo.removeTodo(t.id)}
          >
            remove
          </button>
        </div>
      ))}
      <div className="buttons-area">
        <button
          onClick={() => todo.filterCompleted()}
          className="filter-button"
        >
          show done
        </button>
        <button onClick={() => todo.filterAll()} className="filter-button">
          show all
        </button>
        <button onClick={() => todo.filterActive()} className="filter-button">
          show active
        </button>
      </div>
    </div>
  );
});

export default TodoList;
