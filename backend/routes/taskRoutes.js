const express = require("express");
const { createTask, getTasks, updateTask, deleteTask, getDashboardStats } = require("../controllers/taskController");
const authenticateToken = require("../config/auth");

const router = express.Router();

router.post("/", authenticateToken, createTask);
router.get("/", authenticateToken, getTasks);
router.put("/:id", authenticateToken, updateTask);
router.delete("/:id", authenticateToken, deleteTask);
router.get("/dashboard-stats", authenticateToken, getDashboardStats);

module.exports = router;
