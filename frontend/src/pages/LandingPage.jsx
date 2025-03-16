import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/footer.css"; // (Optional) Custom CSS overrides, if any

/**
 * Main Landing Page
 */
const LandingPage = () => {
  const navigate = useNavigate();

  // If a token exists in localStorage, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (

    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CallToActionSection />

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

/**
 * Hero Section
 */
const HeroSection = () => (
  <div className="container mx-auto px-6 lg:px-20 py-16 flex flex-col lg:flex-row items-center justify-between">
    {/* Left Content */}
    <div className="lg:w-1/2 text-center lg:text-left">
      <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
        Moneo - Investment &amp; Portfolio Tracker
      </h1>
      <p className="mt-4 text-lg text-gray-300">
        Track your investments, manage your portfolio, and monitor real-time
        stock market trends.
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
);

/**
 * Features Section
 */
const FeaturesSection = () => (
  <div className="bg-white text-black py-16">
    <div className="container mx-auto px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-center">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <FeatureCard
          icon="📈"
          title="Track Investments"
          description="Monitor stocks, mutual funds, crypto, bonds, and real estate in one dashboard."
        />
        <FeatureCard
          icon="💰"
          title="Manage Cash Flow"
          description="Track your liquid cash and recurring income sources for a complete financial view."
        />
        <FeatureCard
          icon="📊"
          title="Real-time Updates"
          description="Get the latest prices and performance metrics for your investments."
        />
      </div>
    </div>
  </div>
);

/**
 * Call to Action Section
 */
const CallToActionSection = () => (
  <div className="bg-gray-100 text-black py-16 text-center">
    <h2 className="text-2xl font-bold">
      Ready to Take Control of Your Investments?
    </h2>
    <p className="text-gray-600 mt-2 max-w-xl mx-auto">
      Join Moneo today and start tracking your financial portfolio with ease,
      from stocks and crypto to real estate and bonds.
    </p>
    <Link to="/signup">
      <button className="bg-black text-white px-6 py-3 rounded-lg mt-6">
        Get Started →
      </button>
    </Link>
  </div>
);

/**
 * Feature Card Component
 */
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white border border-gray-300 p-6 rounded-lg text-center shadow-sm">
    <div className="text-4xl bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

/**
 * Footer Component
 * Multi-column layout (like in your screenshot).
 */
const Footer = () => (
  <footer className="bg-white text-black pt-12 pb-6">
    <div className="container mx-auto px-6 lg:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {/* About Us */}
      <div>
        <h3 className="font-semibold mb-3">About Us</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="hover:underline">
              Our company
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Newsroom
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Careers
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Foundation
            </a>
          </li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h3 className="font-semibold mb-3">Legal</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="hover:underline">
              Accessibility
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
          </li>
        </ul>
      </div>

      {/* Accounts */}
      <div>
        <h3 className="font-semibold mb-3">Accounts</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="hover:underline">
              Stocks &amp; ETFs
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Mutual Funds
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Crypto
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Margin
            </a>
          </li>
        </ul>
      </div>

      {/* Products */}
      <div>
        <h3 className="font-semibold mb-3">Products</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="hover:underline">
              Managed Investing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Self-Directed Trading
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Retirement Planning
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Real Estate
            </a>
          </li>
        </ul>
      </div>

      {/* Social */}
      <div>
        <h3 className="font-semibold mb-3">Social</h3>
        {/* 
    Use flex to display icons horizontally.
    space-x-4 adds spacing between items.
  */}
        <ul className="flex space-x-4 list-none p-0 m-0">
          <li>
            <a
              href="https://github.com/"
              className="hover:opacity-75 transition"
            >
              <img src="/images/github.png" alt="GitHub" className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/"
              className="hover:opacity-75 transition"
            >
              <img
                src="/images/linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
          </li>
          <li>
            <a href="https://x.com/" className="hover:opacity-75 transition">
              <img src="/images/twitter.png" alt="X" className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              className="hover:opacity-75 transition"
            >
              <img
                src="/images/youtube.png"
                alt="YouTube"
                className="w-6 h-6"
              />
            </a>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="font-semibold mb-3">Support</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="hover:underline">
              Transfer an Account
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Help Center
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Footer Bar */}
    <div className="container mx-auto px-6 lg:px-20 mt-8 border-t pt-4">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Moneo - Investment &amp; Portfolio Tracker.
        All rights reserved.
      </p>
    </div>
  </footer>
);

export default LandingPage;
