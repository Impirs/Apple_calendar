import React, { useState } from "react";

function TaskForm({ addTask }) {
    const [task, setTask] = useState({ name: "", start: "", end: "", day: "Monday" });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.name && task.start && task.end) {
            addTask({ name: task.name, start: task.start, end: task.end }, task.day);
            setTask({ name: "", start: "", end: "", day: "Monday" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input type="text" name="name" value={task.name} onChange={handleChange} placeholder="Task Name" required />
            <input type="time" name="start" value={task.start} onChange={handleChange} required />
            <input type="time" name="end" value={task.end} onChange={handleChange} required />
            <select name="day" value={task.day} onChange={handleChange}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;