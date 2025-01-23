const Task = require("../models/taskModel");
const mongoose = require("mongoose");

const createTask = async (req, res) => {
  const { title, start_time, end_time, priority, status } = req.body;

  if (!title || !start_time || !end_time || !priority || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newTask = new Task({
      title,
      start_time,
      end_time,
      priority,
      status,
      user_id: req.user.id,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getTasks = async (req, res) => {
  const { priority, status, page = 1, limit = 10, sort = "start_time" } = req.query;
  const query = { user_id: req.user.id };

  if (priority) query.priority = Number(priority);
  if (status) query.status = status;

  try {
    const tasks = await Task.find(query)
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, start_time, end_time, priority, status } = req.body;

  try {
    const task = await Task.findOne({ _id: id, user_id: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title) task.title = title;
    if (start_time) task.start_time = start_time;
    if (end_time) task.end_time = end_time;
    if (priority) task.priority = priority;
    if (status) {
      task.status = status;
      if (status === "finished") task.end_time = new Date();
    }

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user_id: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const user_id = new mongoose.Types.ObjectId(req.user.id);

    const totalTasks = await Task.countDocuments({ user_id });
    const completedTasks = await Task.countDocuments({
      user_id,
      status: "finished",
    });
    const pendingTasks = await Task.countDocuments({
      user_id,
      status: "pending",
    });

    // Calculate average completion time
    const averageCompletionTimeData = await Task.aggregate([
      { $match: { user_id, status: "finished" } },
      {
        $group: {
          _id: null,
          averageCompletionTime: {
            $avg: { $subtract: ["$end_time", "$start_time"] },
          },
        },
      },
    ]);

    const averageCompletionTime = averageCompletionTimeData.length
      ? averageCompletionTimeData[0].averageCompletionTime / (1000 * 60 * 60)
      : 0;

    // Calculate total and average remaining time for pending tasks
    const pendingTasksData = await Task.aggregate([
      { $match: { user_id, status: "pending" } },
      {
        $project: {
          timeLeft: { $subtract: ["$end_time", new Date()] },
        },
      },
    ]);

    let totalRemainingTime = 0;
    pendingTasksData.forEach((task) => {
      if (task.timeLeft > 0) {
        totalRemainingTime += task.timeLeft;
      }
    });

    const averageRemainingTime = pendingTasksData.length
      ? totalRemainingTime / pendingTasksData.length
      : 0;

    // Convert remaining time from milliseconds to hours
    const remainingTimeInHours = (
      averageRemainingTime /
      (1000 * 60 * 60)
    ).toFixed(2);

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      averageCompletionTime: averageCompletionTime.toFixed(2),
      averageRemainingTime: remainingTimeInHours, // Send average remaining time
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getDashboardStats };
