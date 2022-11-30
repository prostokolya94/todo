import { Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import todo from "../store/todo";
import "../style.scss";
import FilterBlock from "./FilterBlock";

const TodoList = observer(() => {
    const [value, setValue] = useState("");

    function click() {
        todo.addTodo({ id: Date.now(), title: value, completed: false });
        setValue("");
    }

    return (
        <div className="container">
            <h1>Task manager</h1>
            <div className="form">
                {" "}
                <TextField value={value} onChange={(event) => setValue(event.target.value)} size={"small"} />
                <Button onClick={click!} size={"small"}>
                    add
                </Button>
            </div>

            {todo.todos.map((t) => (
                <div className={"todo"} key={t.id}>
                    <input type="checkbox" checked={t.completed} onChange={() => todo.completeTodo(t.id)} />
                    {t.title}
                    <Button onClick={() => todo.removeTodo(t.id)} size={"small"}>
                        remove
                    </Button>
                </div>
            ))}
            <FilterBlock />
        </div>
    );
});

export default TodoList;
