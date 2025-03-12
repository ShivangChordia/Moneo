import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect if user is logged in
    }
  }, [navigate]);
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6 lg:px-20 py-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Track Your Investments with Moneo
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            A simple way to monitor your stocks, crypto, and funds in one place.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link to="/signup">
              <button className="bg-black px-6 py-3 rounded-lg text-white hover:bg-gray-800 transition">
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="border border-gray-400 px-6 py-3 rounded-lg text-white hover:bg-gray-800 transition">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side - Landing Page Image */}
        <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">
          <img
            src="/landingpage.jpg"
            alt="Landing Page Illustration"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white text-black py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <FeatureCard
              icon="📈"
              title="Track Investments"
              description="Monitor stocks, mutual funds, and crypto assets in one dashboard."
            />
            <FeatureCard
              icon="📊"
              title="Real-time Updates"
              description="Get the latest prices and performance metrics for your investments."
            />
            <FeatureCard
              icon="💰"
              title="Cash Management"
              description="Track your liquid cash alongside investments for a complete financial picture."
            />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-100 text-black py-16 text-center">
        <h2 className="text-2xl font-bold">
          Ready to take control of your investments?
        </h2>
        <p className="text-gray-600 mt-2">
          Join Moneo today and start tracking your financial portfolio with
          ease.
        </p>
        <Link to="/signup">
          <button className="bg-black text-white px-6 py-3 rounded-lg mt-6">
            Get Started →
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-6 text-center">
        <p className="text-xl font-bold">$ Moneo</p>
        <p className="mt-2">
          © 2025 Moneo Investment Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg text-center shadow-sm">
      <div className="text-4xl bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
