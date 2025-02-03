import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import Task from "./Task"

const API_URL = "http://localhost:5000/api/tasks";

interface Task {
  id: number;
  taskName: string;
  isDone: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName) return;

    try {
      await axios.post(API_URL, { taskName });
      setTaskName("");
      fetchTasks(); 
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

    // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
        setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };


  return (
    <div className="app-container"> 
    <div className="container">
      <h1>Task Manager</h1>

      {/* Task Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <Task 
            key={task.id}
            taskId={task.id}
            taskName={task.taskName}
            taskDone={task.isDone}
            fetchTasks={fetchTasks}
          />
        ))}
      </ul>
    </div>
    </div>
  );
};

export default App;


