import { Request, Response } from "express";
import pool from "./db";

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
     // snake_case to camelCase
     const formattedTasks = result.rows.map((task) => ({
      id: task.id,
      taskName: task.task_name,  
      isDone: task.is_done,      
    }));
    res.json(formattedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { taskName } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (task_name) VALUES ($1) RETURNING *",
      [taskName]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  console.log("updateTask")
  try {
    const { id } = req.params;
    const result = await pool.query("UPDATE tasks SET is_done = NOT is_done WHERE id = $1 RETURNING *", [id]) 
    if ( result.rowsCount === 0 ){
      return res.status(404).json({message: "Task not found!"});
    }
    const formattedTask = {
      id: result.rows[0].id,
      taskName: result.rows[0].task_name,
      isDone: result.rows[0].is_done
    }
    res.json(formattedTask);
  } catch(error){
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};