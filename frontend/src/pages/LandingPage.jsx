import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
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

        {/* Right - Portfolio Overview Card */}
        <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">
          <div className="bg-gray-800 p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-300">
              Portfolio Overview
            </h3>
            <p className="text-3xl font-bold mt-2">$24,560</p>
            <p className="text-green-400 text-lg mt-1">Today's Change: +$420</p>
            <div className="mt-6 flex justify-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                📊 {/* Placeholder for Pie Chart Icon */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 lg:px-20 py-16">
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
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
};

export default LandingPage;
