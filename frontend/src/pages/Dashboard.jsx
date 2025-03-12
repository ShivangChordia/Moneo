import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>
      <p className="mt-4">You are logged in!</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 px-6 py-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
