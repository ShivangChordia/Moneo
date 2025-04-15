import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://moneo.vercel.app"; // ✅ Backend URL

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Unauthorized. Please login again.");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.email) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          throw new Error("User data not found.");
        }
      })
      .catch((err) => {
        setError(err.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white p-6">
      {/* Hamburger Button (Fixed with High Z-Index) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 left-6 text-white text-3xl z-50 hover:text-yellow-400"
      >
        ☰
      </button>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-6 transform transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="block text-left text-white hover:text-blue-400 mb-3 w-full"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/portfolio")}
          className="block text-left text-white hover:text-blue-400 mb-3 w-full"
        >
          Portfolio
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="block text-left text-white hover:text-blue-400 mb-3 w-full"
        >
          Profile
        </button>
      </div>

      {/* Optional Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Profile Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center z-10">
          <h2 className="text-3xl font-bold mb-6">👤 Profile</h2>

          {loading ? (
            <p className="text-gray-300">Loading profile...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <>
              <div className="mb-4">
                <span className="text-gray-400">Name:</span>{" "}
                <span className="font-semibold">{user.name}</span>
              </div>
              <div className="mb-6">
                <span className="text-gray-400">Email:</span>{" "}
                <span className="font-semibold">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
