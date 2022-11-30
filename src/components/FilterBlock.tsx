import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import todo from "../store/todo";
import "../style.scss";

const FilterBlock = observer(() => {
    return (
        <div className="buttons-area">
            <Button onClick={() => todo.filterCompleted()}>show done</Button>
            <Button onClick={() => todo.filterAll()}>show all</Button>
            <Button onClick={() => todo.filterActive()}>show active</Button>
        </div>
    );
});

export default FilterBlock;
