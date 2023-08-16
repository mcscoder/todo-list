import classNames from "classnames/bind";
import style from "./Home.module.scss";
import Task from "./components/Task/Task";
import { useEffect, useMemo, useState } from "react";
import localStorageKey from "config/localStorageKey";

const cx = classNames.bind(style);

function Home() {
  const profile = useMemo(() => {
    return JSON.parse(localStorage.getItem(localStorageKey.profile));
  }, []);

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageKey.tasks));
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey.tasks, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddNewTask = (e) => {
    e.preventDefault();

    if (newTask === "") return;

    const task = {
      title: newTask,
      isCompleted: false,
    };

    let curTasks = [...tasks[profile], task];
    let globalTasks = [...tasks];
    globalTasks[profile] = curTasks;
    setTasks(globalTasks);
    setNewTask("");
  };

  const handleDeleteTask = (index) => {
    let curTasks = [...tasks[profile]];
    let globalTasks = [...tasks];
    curTasks.splice(index, 1);
    globalTasks[profile] = curTasks;
    setTasks(globalTasks);

    console.log(globalTasks);
  };

  const handleLogout = () => {
    localStorage.removeItem(localStorageKey.profile);
    window.location.reload();
  };

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("logout-section")}>
          <button className={cx("logout-btn")} onClick={handleLogout}>
            <i className="fa-solid fa-left-long"></i>
          </button>
        </div>
        <div className={cx("title")}>
          <h1>TODO LIST</h1>
        </div>
        <div className={cx("todo-section")}>
          <div className={cx("form-container")}>
            <form action="" onSubmit={(e) => handleAddNewTask(e)}>
              <input
                type="text"
                onChange={(e) => setNewTask(e.target.value)}
                value={newTask}
              />
              <button type="submit">Add</button>
            </form>
          </div>
          <div className={cx("task-list")}>
            {tasks[profile].map((task, index) => {
              return (
                <Task
                  key={task.title}
                  task={task}
                  index={index}
                  handleDeleteTask={handleDeleteTask}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
