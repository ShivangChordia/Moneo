/*
 * FILE : App.jsx
 * PROJECT : Moneo
 * PROGRAMMER : Group 6
 * FIRST VERSION : 14/03/2025
 * DESCRIPTION :
 * This code sets up the app’s navigation, showing different pages based on the URL and protecting some routes for logged-in users only
 */

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PortfolioOverview from "./pages/PortfolioOverview.jsx";
import PrivateRoute from "./components/PrivateRoute";
import AuthenticatedLayout from "./pages/AuthenticatedLayout";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/portfolio"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <PortfolioOverview />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />

        <Route path="/profile" element={<Profile />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
