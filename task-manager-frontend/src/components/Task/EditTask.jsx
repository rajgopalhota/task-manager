import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data.task);
      } catch (error) {
        message.error('Error fetching task');
      }
    };
    fetchTask();
  }, [id, token]);

  const handleEditTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${id}`,
        task,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Task updated successfully');
      navigate('/dashboard');
    } catch (error) {
      message.error('Error updating task');
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <Input
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <Input
        placeholder="Start Time"
        value={task.start_time}
        onChange={(e) => setTask({ ...task, start_time: e.target.value })}
      />
      <Input
        placeholder="End Time"
        value={task.end_time}
        onChange={(e) => setTask({ ...task, end_time: e.target.value })}
      />
      <Input
        placeholder="Priority"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      />
      <Input
        placeholder="Status"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      />
      <Button onClick={handleEditTask}>Save</Button>
    </div>
  );
};

export default EditTask;
