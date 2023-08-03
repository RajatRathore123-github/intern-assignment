import express from "express";
import { body, validationResult } from "express-validator";
import  Task  from "../models/tasks.js";

const router = express.Router();

// getting a task
router.get("/fetchall", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

// Adding a task

router.post(
  "/addtasks",
  [
    body("title", "Please enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 10 characters").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const task = new Task({
        title,
        description,
      });
      const saveTask = await task.save();
      res.json(saveTask);
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  }
);

// Updating Task

router.put("/updatetask/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = {};
    if (title) {
      newTask.title = title;
    }
    if (description) {
      newTask.description = description;
    }
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );
    res.json({ task });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

// Deleting a task

router.delete("/deletetask/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ Success: "Task deleted successfully", task: task });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

export default router;
