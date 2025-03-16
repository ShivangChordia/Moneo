import React, { useState } from "react";
import Navbar from "./Navbar";
import PortfolioOverview from "./PortfolioOverview";
import InvestmentList from "./InvestmentList";
import RecentTransactions from "./RecentTransactions";
import QuickActions from "./QuickActions";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-white text-gray-900"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto p-6">
        {/* Portfolio Overview Section */}
        <PortfolioOverview />

        {/* Investment List Section */}
        <InvestmentList />

        {/* Recent Transactions Section */}
        <RecentTransactions />

        {/* Quick Actions Section */}
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;