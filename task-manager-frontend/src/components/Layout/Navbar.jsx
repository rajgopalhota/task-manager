import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reduxstore/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Access token state

  const handleLogout = () => {
    dispatch(logout()); // Call the logout reducer
  };

  return (
    <nav className="bg-slate-900 shadow-md">
      <div className="px-16 mx-auto py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="flex items-center gap-2 text-slate-200 font-semibold">
          <img src="/logo.png" alt="logo" className="w-12 h-12"/> Taskify
          </Link>
        </div>

        {/* Links and Button */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-200 hover:text-white transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-200 hover:text-white transition duration-300"
          >
            Dashboard
          </Link>

          {/* Conditional Button */}
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
