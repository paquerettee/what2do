
// import React from "react";
import axios from "axios";

// FIXME!!!
const API_URL = "http://localhost:5000/api/tasks";

interface TaskProps {
  taskId: number;
  taskName: string;
  taskDone: boolean;
}

const Task = ({ taskId, taskName, taskDone, fetchTasks }: TaskProps & { fetchTasks: () => void }) => {

    // toggle task's isDone status
    const toggleTask = async (id: number) => {
        console.log("toggle task: ", id)
        try {
            const response = await axios.put(`${API_URL}/${id}`);
            console.log("fetch proper task here!", response.data)
            fetchTasks?.();  //  Optional Chaining (?.()) -> Calls fetchTasks only if it's defined
            const taskElement = document.querySelector(`.task-item[task-id="${id}.task-name"]`);
            if (taskElement) {
                taskElement.classList.toggle('task-done');
            }
        } catch (error) {
            console.error("Failed to toggle task", error);
        }
    };

    // delete the task
    const deleteTask = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTasks?.();
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    return(
        <li className="task-item" task-id={taskId} key={taskId} onClick={() => toggleTask(taskId)}>
        <span className={`task-name ${taskDone ? 'task-done': ''}`}>{taskName}</span>
        <button onClick={() => deleteTask(taskId)}>Delete</button> 
        </li>)
}

export default Task;