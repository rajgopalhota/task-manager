import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [priority, setPriority] = useState(3);
  const [status, setStatus] = useState('pending');
  const token = useSelector((state) => state.auth.token);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/tasks',
        { title, start_time: startTime, end_time: endTime, priority, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(response.data.message);
    } catch (error) {
      message.error('Error creating task');
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <Input placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <Input placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <Input placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
      <Input placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
      <Button onClick={handleCreateTask}>Create</Button>
    </div>
  );
};

export default CreateTask;
