# Task Management API Documentation

This document provides details on the APIs for the Task Management application. Each endpoint's functionality, request structure, and response format are explained for the frontend team.

---

## Base URL
```
http://localhost:5000
```

---

## User Authentication

### 1. Register User
**Endpoint:**
```
POST /register
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
- Success:
```json
{
  "message": "User registered successfully"
}
```
- Failure (e.g., email already exists):
```json
{
  "message": "Email already exists"
}
```

---

### 2. Login User
**Endpoint:**
```
POST /login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
- Success:
```json
{
  "message": "Login successful",
  "token": "<JWT Token>"
}
```
- Failure (e.g., invalid credentials):
```json
{
  "message": "Invalid credentials"
}
```

---

## Task Management

### 1. Create Task
**Endpoint:**
```
POST /tasks
```
**Headers:**
```json
{
  "Authorization": "Bearer <JWT Token>"
}
```
**Request Body:**
```json
{
  "title": "Complete project",
  "start_time": "2025-01-22T09:00:00Z",
  "end_time": "2025-01-22T12:00:00Z",
  "priority": 3,
  "status": "pending"
}
```
**Response:**
- Success:
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id",
    "title": "Complete project",
    "start_time": "2025-01-22T09:00:00Z",
    "end_time": "2025-01-22T12:00:00Z",
    "priority": 3,
    "status": "pending",
    "user_id": "user_id"
  }
}
```

---

### 2. Fetch Tasks
**Endpoint:**
```
GET /tasks
```
**Headers:**
```json
{
  "Authorization": "Bearer <JWT Token>"
}
```
**Query Parameters:**
- `priority` (optional): Filter by priority (1-5)
- `status` (optional): Filter by status (`pending`, `finished`)
- `page` (optional, default: 1): Pagination page number
- `limit` (optional, default: 10): Number of tasks per page
- `sort` (optional, default: `start_time`): Sorting field (`start_time` or `end_time`)

**Response:**
```json
{
  "tasks": [
    {
      "_id": "task_id",
      "title": "Complete project",
      "start_time": "2025-01-22T09:00:00Z",
      "end_time": "2025-01-22T12:00:00Z",
      "priority": 3,
      "status": "pending",
      "user_id": "user_id"
    }
  ]
}
```

---

### 3. Update Task
**Endpoint:**
```
PUT /tasks/:id
```
**Headers:**
```json
{
  "Authorization": "Bearer <JWT Token>"
}
```
**Request Body:** (Include only the fields to update)
```json
{
  "title": "Updated title",
  "end_time": "2025-01-22T14:00:00Z",
  "priority": 4,
  "status": "finished"
}
```
**Response:**
- Success:
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task_id",
    "title": "Updated title",
    "start_time": "2025-01-22T09:00:00Z",
    "end_time": "2025-01-22T14:00:00Z",
    "priority": 4,
    "status": "finished",
    "user_id": "user_id"
  }
}
```

---

### 4. Delete Task
**Endpoint:**
```
DELETE /tasks/:id
```
**Headers:**
```json
{
  "Authorization": "Bearer <JWT Token>"
}
```
**Response:**
- Success:
```json
{
  "message": "Task deleted successfully"
}
```

---

## Dashboard Statistics

### 1. Fetch Dashboard Data
**Endpoint:**
```
GET /dashboard-stats
```
**Headers:**
```json
{
  "Authorization": "Bearer <JWT Token>"
}
```
**Response:**
- Success:
```json
{
  "totalTasks": 10,
  "completedTasks": 4,
  "pendingTasks": 6,
  "pendingData": [
    {
      "_id": 3,
      "totalLapsedTime": 7200000,
      "balanceEstimatedTime": 3600000
    }
  ],
  "averageCompletionTime": "2.50"
}
```
- `pendingData` fields:
  - `_id`: Priority level (1-5)
  - `totalLapsedTime`: Total lapsed time (in milliseconds)
  - `balanceEstimatedTime`: Balance estimated time (in milliseconds)
- `averageCompletionTime`: Average time (in hours) to complete tasks

---

