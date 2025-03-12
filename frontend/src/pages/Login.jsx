import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://moneo.vercel.app";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect if user is logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center">
            Login to your account
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Enter your credentials to continue.
          </p>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <form onSubmit={handleLogin} className="mt-6">
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

            <button className="w-full bg-black text-white py-2 rounded-lg mt-6 hover:bg-gray-800 transition">
              Login
            </button>
          </form>

          <p className="text-gray-500 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 bg-gray-200 flex items-center justify-center">
          <img
            src="/login.jpg"
            alt="Login Illustration"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
