import React from "react";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`p-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"} flex justify-between items-center`}>
      {/* Left: Logo */}
      <div className="text-xl font-bold text-blue-500">Moneo</div>

      {/* Middle: Navigation Links */}
      <div className="space-x-6">
        <a href="/dashboard" className={`hover:underline ${darkMode ? "text-white" : "text-gray-900"}`}>Dashboard</a>
        <a href="/portfolio" className={`hover:underline ${darkMode ? "text-white" : "text-gray-900"}`}>Portfolio</a>
        <a href="/transactions" className={`hover:underline ${darkMode ? "text-white" : "text-gray-900"}`}>Transactions</a>
        <a href="/reports" className={`hover:underline ${darkMode ? "text-white" : "text-gray-900"}`}>Reports</a>
        <a href="/settings" className={`hover:underline ${darkMode ? "text-white" : "text-gray-900"}`}>Settings</a>
      </div>

      {/* Right: Profile & Theme Toggle */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded bg-gray-700 text-white">
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img src="/path-to-user-profile.jpg" alt="User" className="w-8 h-8 rounded-full" />
          <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
