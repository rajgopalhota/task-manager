import React from "react";
import {Link} from "react-router-dom";
import {
  FaUserShield,
  FaTasks,
  FaChartBar,
  FaCode,
  FaFilter,
  FaLock,
} from "react-icons/fa";

const Home = () => {
  const cards = [
    {
      title: "User Authentication",
      description:
        "Securely register and log in users with JWT-based authentication to ensure data privacy and a smooth user experience.",
      icon: <FaUserShield size={36} className="text-blue-600" />,
    },
    {
      title: "Task Management",
      description:
        "Easily create, fetch, update, and delete tasks with our robust API. Filter tasks by priority, status, or date for better organization.",
      icon: <FaTasks size={36} className="text-green-600" />,
    },
    {
      title: "Dashboard Insights",
      description:
        "Stay updated with real-time task statistics like total tasks, completed tasks, pending tasks, and average completion times.",
      icon: <FaChartBar size={36} className="text-purple-600" />,
    },
    {
      title: "REST API Ready",
      description:
        "Build scalable integrations with our RESTful API endpoints, designed to support custom frontend requirements.",
      icon: <FaCode size={36} className="text-red-600" />,
    },
    {
      title: "Advanced Filtering",
      description:
        "Apply advanced filters to your task list by priority, status, or timeline to find exactly what you need.",
      icon: <FaFilter size={36} className="text-yellow-600" />,
    },
    {
      title: "Secure and Reliable",
      description:
        "Taskify ensures the security of your data with encrypted connections and robust backend architecture.",
      icon: <FaLock size={36} className="text-gray-600" />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-12 px-6 rounded-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 gradient-text-lb p-1">
              Welcome to Taskify
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Simplify your task management with Taskify – your go-to app for
              organizing tasks, tracking progress, and achieving goals
              efficiently. Join us today and take control of your productivity!
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link to={"/login"} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md">
                Sign In
              </Link>
              <Link to={"/register"} className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-6 rounded-lg shadow-md">
                Register
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-end">
            <img
              src="/home.gif"
              alt="Taskify Illustration"
              className="w-3/4 md:w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* API Documentation and Features */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-lg cursor-pointer rounded-lg p-6 group hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h2 className="text-2xl font-semibold mb-4">{card.title}</h2>
              <p className="text-gray-600 group-hover:text-gray-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
