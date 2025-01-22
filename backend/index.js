// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  priority: { type: Number, required: true, min: 1, max: 5 },
  status: { type: String, required: true, enum: ["pending", "finished"] },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Routes

// User Registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(403).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Create Task
app.post("/tasks", authenticateToken, async (req, res) => {
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
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch Tasks
app.get("/tasks", authenticateToken, async (req, res) => {
  const {
    priority,
    status,
    page = 1,
    limit = 10,
    sort = "start_time",
  } = req.query;
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
});

// Update Task
app.put("/tasks/:id", authenticateToken, async (req, res) => {
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
});

// Delete Task
app.delete("/tasks/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user_id: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch Dashboard Data
app.get('/dashboard-stats', authenticateToken, async (req, res) => {
    try {
      const user_id = new mongoose.Types.ObjectId(req.user.id); // Fixed this line
  
      const totalTasks = await Task.countDocuments({ user_id });
      const completedTasks = await Task.countDocuments({ user_id, status: 'finished' });
      const pendingTasks = await Task.countDocuments({ user_id, status: 'pending' });
  
      const pendingData = await Task.aggregate([
        { $match: { user_id, status: 'pending' } },
        {
          $group: {
            _id: '$priority',
            totalLapsedTime: {
              $sum: {
                $cond: [
                  { $gt: [new Date(), '$start_time'] },
                  { $subtract: [new Date(), '$start_time'] },
                  0,
                ],
              },
            },
            balanceEstimatedTime: {
              $sum: {
                $cond: [
                  { $gt: ['$end_time', new Date()] },
                  { $subtract: ['$end_time', new Date()] },
                  0,
                ],
              },
            },
          },
        },
      ]);
  
      const averageCompletionTimeData = await Task.aggregate([
        { $match: { user_id, status: 'finished' } },
        {
          $group: {
            _id: null,
            averageCompletionTime: {
              $avg: { $subtract: ['$end_time', '$start_time'] },
            },
          },
        },
      ]);
  
      const averageCompletionTime = averageCompletionTimeData.length
        ? averageCompletionTimeData[0].averageCompletionTime / (1000 * 60 * 60)
        : 0;
  
      res.status(200).json({
        totalTasks,
        completedTasks,
        pendingTasks,
        pendingData,
        averageCompletionTime: averageCompletionTime.toFixed(2),
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
