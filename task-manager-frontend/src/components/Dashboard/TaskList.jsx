import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Popover,
  Select,
  Table,
  Space,
} from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { useState } from "react";

dayjs.extend(duration);

const { Option } = Select;

const TaskList = ({
  loading,
  tasks,
  title,
  setTitle,
  priority,
  setPriority,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  status,
  setStatus,
  statusOptions,
  editTask,
  isModalVisible,
  setIsModalVisible,
  handleAddTask,
  handleDeleteTask,
  handleEditTask,
  handleOpenEditModal,
}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "red";
      case "doing":
        return "orange";
      case "finished":
        return "green";
      default:
        return "default";
    }
  };

  const calculateDuration = (start, end) => {
    const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    return `${days} day${days !== 1 ? "s" : ""} ${hours} hr${
      hours !== 1 ? "s" : ""
    } ${minutes} min${minutes !== 1 ? "s" : ""}`;
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleFilterChange = (key, value) => {
    const filtered = tasks.filter((task) => task[key] === value);
    setFilteredTasks(filtered);
  };

  const handleResetFilters = () => {
    setFilteredTasks(tasks);
    setSearchText("");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filterDropdown: () => (
        <Input
          placeholder="Search Title"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200, marginBottom: 8, display: "block" }}
        />
      ),
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) =>
        record.title.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
      ],
      onFilter: (value, record) => record.priority === value,
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
      sorter: (a, b) => dayjs(a.start_time).diff(dayjs(b.start_time)),
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
      sorter: (a, b) => dayjs(a.end_time).diff(dayjs(b.end_time)),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: statusOptions.map((status) => ({
        text: status,
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = getStatusColor(status);
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, task) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleOpenEditModal(task)}
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
            <Button icon={<DeleteOutlined />} danger />
          </Popover>
        </Space>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      render: (_, task) => calculateDuration(task.start_time, task.end_time),
      sorter: (a, b) =>
        dayjs(b.end_time).diff(b.start_time) -
        dayjs(a.end_time).diff(a.start_time),
    },
  ];
  const rowClassName = (task) => {
    return `task-row ${getStatusColor(task.status)}`;
  };  

  return (
    <div className="task-list-container">
      <Space className="my-3">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Task
        </Button>
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </Space>
      <Table
        dataSource={filteredTasks.length ? filteredTasks : tasks}
        columns={columns}
        rowKey="_id"
        style={{ marginTop: 16 }}
        loading={loading}
        rowClassName={rowClassName}
      />
      <Modal
        title={editTask ? "Edit Task" : "Create Task"}
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
            style={{ marginTop: 10, width: "100%" }}
          >
            {statusOptions.map((statusOption) => (
              <Option key={statusOption} value={statusOption}>
                {statusOption}
              </Option>
            ))}
          </Select>
        ) : (
          <Select
            value={status}
            disabled
            style={{ marginTop: 10, width: "100%" }}
          >
            <Option value="pending">pending</Option>
          </Select>
        )}
      </Modal>
    </div>
  );
};

export default TaskList;
