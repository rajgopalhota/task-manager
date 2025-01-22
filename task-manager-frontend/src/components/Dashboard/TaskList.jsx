import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Input, DatePicker, message, Select, Popover } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // Import the duration plugin
import { useSelector } from 'react-redux';

dayjs.extend(duration); // Extend dayjs with the duration plugin

const { Option } = Select;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(3);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const statusOptions = ['pending', 'doing', 'finished'];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data.tasks || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  const handleAddTask = async () => {
    if (!title || !startTime || !endTime) {
      message.error('All fields are required!');
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
      await axios.post('http://localhost:5000/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalVisible(false);
      message.success('Task created successfully');
      setLoading(true);
      const response = await axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks || []);
      setLoading(false);
    } catch (error) {
      message.error('Error creating task');
      setLoading(false);
    }
  };

  const handleEditTask = async () => {
    if (!title || !startTime || !endTime) {
      message.error('All fields are required!');
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
      await axios.put(`http://localhost:5000/tasks/${editTask._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalVisible(false);
      message.success('Task updated successfully');
      setLoading(true);
      const response = await axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks || []);
      setLoading(false);
    } catch (error) {
      message.error('Error updating task');
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Task deleted successfully');
      setLoading(true);
      const response = await axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks || []);
      setLoading(false);
    } catch (error) {
      message.error('Error deleting task');
      setLoading(false);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'red';
      case 'doing':
        return 'orange';
      case 'finished':
        return 'green';
      default:
        return 'default';
    }
  };

  const calculateDuration = (start, end) => {
    const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    return `${days} day${days !== 1 ? 's' : ''} ${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority' },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_, task) => calculateDuration(task.start_time, task.end_time),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = getStatusColor(status);
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, task) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleOpenEditModal(task)}
            style={{ marginLeft: 8 }}
          />
          <Popover
            content={
              <Button
                type="danger"
                onClick={() => handleDeleteTask(task._id)}
              >
                Confirm Delete
              </Button>
            }
            title="Are you sure?"
            trigger="click"
          >
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              style={{ marginLeft: 8 }}
            />
          </Popover>
        </>
      ),
    },
  ];

  const rowClassName = (task) => {
    return `task-row ${getStatusColor(task.status)}`;
  };

  return (
    <div className="task-list-container">
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Task
      </Button>
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="_id"
        style={{ marginTop: 16 }}
        loading={loading}
        rowClassName={rowClassName}
      />

      <Modal
        title={editTask ? 'Edit Task' : 'Create Task'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={editTask ? handleEditTask : handleAddTask}
      >
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ marginTop: 10 }}
        />
        <DatePicker
          showTime
          value={startTime}
          onChange={(date) => setStartTime(date)}
          placeholder="Start Time"
          style={{ marginTop: 10 }}
        />
        <DatePicker
          showTime
          value={endTime}
          onChange={(date) => setEndTime(date)}
          placeholder="End Time"
          style={{ marginTop: 10 }}
        />
        {editTask ? (
          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            style={{ marginTop: 10, width: '100%' }}
          >
            {statusOptions.map((statusOption) => (
              <Option key={statusOption} value={statusOption}>
                {statusOption}
              </Option>
            ))}
          </Select>
        ) : (
          <Select value={status} disabled style={{ marginTop: 10, width: '100%' }}>
            <Option value="pending">pending</Option>
          </Select>
        )}
      </Modal>
    </div>
  );
};

export default TaskList;
