import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Statistics from "./Statistics";
import TaskList from "./TaskList";
import dayjs from "dayjs";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(3);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const statusOptions = ["pending", "doing", "finished"];

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks || []);
    } catch (err) {
      console.error(err);
      message.error("Error fetching tasks.");
    } finally {
      setLoading(false);
      fetchStats();
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dashboard-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      message.error("Error fetching dashboard statistics.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleAddTask = async () => {
    if (!title || !startTime || !endTime) {
      message.error("All fields are required!");
      return;
    }

    const newTask = {
      title,
      priority,
      status,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      await axios.post("http://localhost:5000/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Task created successfully");
      setIsModalVisible(false);
      fetchTasks();
    } catch (error) {
      message.error("Error creating task");
    }
  };

  const handleEditTask = async () => {
    if (!title || !startTime || !endTime) {
      message.error("All fields are required!");
      return;
    }

    const updatedTask = {
      title,
      priority,
      status,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      await axios.put(
        `http://localhost:5000/tasks/${editTask._id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Task updated successfully");
      setIsModalVisible(false);
      fetchTasks();
    } catch (error) {
      message.error("Error updating task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      message.error("Error deleting task");
    }
  };

  const handleOpenEditModal = (task) => {
    setEditTask(task);
    setTitle(task.title);
    setPriority(task.priority);
    setStartTime(dayjs(task.start_time));
    setEndTime(dayjs(task.end_time));
    setStatus(task.status);
    setIsModalVisible(true);
  };

  return (
    <div>
      <Statistics stats={stats} />
      <TaskList
        loading={loading}
        tasks={tasks}
        title={title}
        setTitle={setTitle}
        priority={priority}
        setPriority={setPriority}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        status={status}
        setStatus={setStatus}
        statusOptions={statusOptions}
        editTask={editTask}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        handleOpenEditModal={handleOpenEditModal}
      />
    </div>
  );
};

export default Dashboard;
