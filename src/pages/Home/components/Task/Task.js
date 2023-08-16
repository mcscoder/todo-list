import classNames from "classnames/bind";
import style from "./Task.module.scss";
import { useState } from "react";
import localStorageKey from "config/localStorageKey";

const cx = classNames.bind(style);

function Task({ task = {}, index, handleDeleteTask = () => {} }) {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [isEditing, setEditing] = useState(false);
  const [isCompleted, setCompleted] = useState(task.isCompleted);

  const handleApplyData = () => {
    const profile = JSON.parse(localStorage.getItem(localStorageKey.profile));
    const globalTasks = JSON.parse(localStorage.getItem(localStorageKey.tasks));
    const curTasks = globalTasks[profile];
    curTasks[index] = task;
    globalTasks[profile] = curTasks;
    localStorage.setItem(localStorageKey.tasks, JSON.stringify(globalTasks));
  };

  const handleCompleteTask = () => {
    setCompleted(!isCompleted);
    task.isCompleted = !isCompleted;
    handleApplyData();
  };

  const handleEditingTask = () => {
    setEditing(!isEditing);

    if (isEditing) {
      task.title = taskTitle;
      handleApplyData();
    }
  };

  return (
    <form className={cx("task")} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className={cx(
          "task-title",
          isEditing ? "isEditing-true" : "isEditing-false",
          isCompleted ? "isCompleted-true" : ""
        )}
        onChange={(e) => setTaskTitle(e.target.value)}
        value={taskTitle}
      />
      <button onClick={handleCompleteTask} className={cx("done-btn")}>
        <i className="fa-regular fa-circle-check"></i>
      </button>
      <button onClick={handleEditingTask} className={cx("edit-btn")}>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      <button onClick={() => handleDeleteTask(index)} className={cx("delete-btn")}>
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </form>
  );
}

export default Task;
