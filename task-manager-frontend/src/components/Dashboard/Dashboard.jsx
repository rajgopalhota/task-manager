import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Statistics from "./Statistics";
import TaskList from "./TaskList";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

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
      const response = await axios.get("http://localhost:5000/api/tasks", {
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
      const response = await axios.get(
        "http://localhost:5000/api/tasks/dashboard-stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      message.error("Error fetching dashboard statistics.");
    }
  };

  useEffect(() => {
    fetchTasks();
  },[token]);

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
      await axios.post("http://localhost:5000/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Task created successfully");
      setTitle("");
      setPriority("");
      setEndTime("");
      setStartTime("");
      setStatus("pending");
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
        `http://localhost:5000/api/tasks/${editTask._id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Task updated successfully");
      setEditTask(null);
      setIsModalVisible(false);
      fetchTasks();
    } catch (error) {
      message.error("Error updating task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
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

  return token ? (
    <>
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
          setEditTask={setEditTask}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleAddTask={handleAddTask}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleOpenEditModal={handleOpenEditModal}
        />
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col items-center justify-center text-gray-800">
        <img
          src="/auth.gif"
          alt="Sign In Required"
          className="w-1/2 max-w-md mb-6 mix-blend-multiply"
        />
        <h1 className="text-2xl font-bold mb-4 gradient-text-blue">
          You need to sign in to view this page
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Please log in to your account to access this content. If you don’t
          have an account, register now!
        </p>
        <div className="flex space-x-4">
          <Link
            to={"/login"}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md"
          >
            Sign In
          </Link>
          <Link
            to={"/register"}
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-6 rounded-lg shadow-md"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
