import classNames from "classnames/bind";
import style from "./Task.module.scss";
import { useState } from "react";

const cx = classNames.bind(style);

function Task({ task = {} }) {
  console.log(task.title);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [isEditing, setEditing] = useState(false);
  const [isCompleted, setCompleted] = useState(task.isCompleted);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setEditing(!isEditing);
  };

  return (
    <form className={cx("task")} onSubmit={(e) => handleFormSubmit(e)}>
      {/* <input className={cx("task-title")}>Workout</input> */}
      <input
        type="text"
        className={cx("task-title")}
        onChange={(e) => setTaskTitle(e.target.value)}
        value={taskTitle}
        style={
          isEditing
            ? { outline: "2px solid rgba(0, 0, 0, 0.5)" }
            : { pointerEvents: "none" }
        }
      />
      <button>
        <i className="fa-regular fa-circle-check"></i>
      </button>
      <button type="submit">
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      <button>
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </form>
  );
}

export default Task;
