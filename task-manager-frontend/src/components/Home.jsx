import React from 'react';
import { FaUserShield, FaTasks, FaChartBar, FaCode, FaFilter, FaLock } from 'react-icons/fa';

const Home = () => {
  const cards = [
    {
      title: 'User Authentication',
      description:
        'Securely register and log in users with JWT-based authentication to ensure data privacy and a smooth user experience.',
      icon: <FaUserShield size={36} className="text-blue-600" />,
    },
    {
      title: 'Task Management',
      description:
        'Easily create, fetch, update, and delete tasks with our robust API. Filter tasks by priority, status, or date for better organization.',
      icon: <FaTasks size={36} className="text-green-600" />,
    },
    {
      title: 'Dashboard Insights',
      description:
        'Stay updated with real-time task statistics like total tasks, completed tasks, pending tasks, and average completion times.',
      icon: <FaChartBar size={36} className="text-purple-600" />,
    },
    {
      title: 'REST API Ready',
      description:
        'Build scalable integrations with our RESTful API endpoints, designed to support custom frontend requirements.',
      icon: <FaCode size={36} className="text-red-600" />,
    },
    {
      title: 'Advanced Filtering',
      description:
        'Apply advanced filters to your task list by priority, status, or timeline to find exactly what you need.',
      icon: <FaFilter size={36} className="text-yellow-600" />,
    },
    {
      title: 'Secure and Reliable',
      description:
        'Taskify ensures the security of your data with encrypted connections and robust backend architecture.',
      icon: <FaLock size={36} className="text-gray-600" />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-12 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Taskify</h1>
          <img
            src="/home.gif"
            alt="Taskify Illustration"
            className="w-1/2 mx-auto mb-6 rounded-lg shadow-lg"
          />
          <p className="text-lg text-gray-300">
            Simplify your task management with Taskify – your go-to app for organizing tasks, tracking progress, and achieving goals efficiently.
          </p>
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
              <p className="text-gray-600 group-hover:text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
