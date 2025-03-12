import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect if user is logged in
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side - Signup Card */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center">Create an account</h2>
          <p className="text-gray-500 text-center mt-2">
            Enter your details below to sign up.
          </p>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <form onSubmit={handleSignup} className="mt-6">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
            />

            <label className="block text-gray-600 mt-4">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
            />

            <label className="block text-gray-600 mt-4">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
            />

            <button className="w-full bg-black text-white py-2 rounded-lg mt-6 hover:bg-gray-800 transition">
              Sign Up
            </button>
          </form>

          <p className="text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 bg-gray-200 flex items-center justify-center">
          <img
            src="/signup.jpg"
            alt="Signup Illustration"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
