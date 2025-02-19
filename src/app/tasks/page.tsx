// src/app/pages/about.tsx
"use client";
import { useState } from "react";

type Task = {
    id: number;
    title: string;
    description: string;
    priority: number;
}

const Tasks = ( ) => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<Task>({ id: Date.now(), title: "", description: "", priority: 0 });

    const addTask = () => {
        const taskCopy:Task =  { ...task, id: Date.now() };
        setAllTasks( [...allTasks, taskCopy] );
    };

    return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Task List</h1>
            <ul>
                {allTasks.map((task:Task) => (
                    <li key={task.id}>{task.title} | {task.description} | {task.priority}</li>
                ))}
            </ul>

            <h2>Add a Task</h2>

                <input
                    name="title"
                    type="text"
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    placeholder="Enter task title"
                    required
                    style={{ marginRight: "0.5rem" }}
                />

                <input
                    name="description"
                    type="text"
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    placeholder="Enter task description"
                    required
                    style={{ marginRight: "0.5rem" }}
                />

                <select onChange={(e) => setTask({ ...task, priority: parseInt(e.target.value) })}>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                </select>

                <button onClick={addTask}>Add Task</button>
           
        </main>
    );
}

export default Tasks;