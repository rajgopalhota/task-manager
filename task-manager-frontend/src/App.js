import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateTask from "./components/Task/CreateTask";
import EditTask from "./components/Task/EditTask";
import { Provider } from "react-redux";
import store from "./reduxstore/store";
import Layout from "./components/Layout";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
