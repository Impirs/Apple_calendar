import React, { useState } from "react";
import Timetable from "./js/Timetable";
import TaskForm from "./js/TaskForm";
import "./styles.css";

function App() {
    const [tasks, setTasks] = useState({
        Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
    });

    const addTask = (task, day) => {
        setTasks({ ...tasks, [day]: [...tasks[day], task] });
    };

    return (
        <div className="app">
            <header className="header">
                <h1>Weekly Timetable</h1>
            </header>
            <div className="container">
                <Timetable tasks={tasks} />
                <TaskForm addTask={addTask} />
            </div>
        </div>
    );
}

export default App;