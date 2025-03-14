import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const PortfolioOverview = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [gainsLosses, setGainsLosses] = useState(0);
  const [assetAllocation, setAssetAllocation] = useState({});
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("https://api.example.com/portfolio"); // Replace with actual API
        const data = await response.json();
        setPortfolioValue(data.totalValue);
        setGainsLosses(data.gainsLosses);
        setAssetAllocation(data.assetAllocation);
        setHistoricalData(data.historicalData);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold">Portfolio Overview</h2>
      <p className="text-lg">Total Portfolio Value: ${portfolioValue.toFixed(2)}</p>
      <p className={`text-lg ${gainsLosses >= 0 ? "text-green-400" : "text-red-400"}`}>
        Gains/Losses: ${gainsLosses.toFixed(2)}
      </p>
      
      {/* Pie Chart for Asset Allocation */}
      <div className="mt-4 w-1/2 mx-auto">
        <Pie data={{
          labels: Object.keys(assetAllocation),
          datasets: [{
            data: Object.values(assetAllocation),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          }]
        }} />
      </div>
      
      {/* Line Chart for Portfolio Growth */}
      <div className="mt-6">
        <Line data={{
          labels: historicalData.map(entry => entry.date),
          datasets: [{
            label: "Portfolio Value Over Time",
            data: historicalData.map(entry => entry.value),
            borderColor: "#4BC0C0",
            fill: false
          }]
        }} />
      </div>
    </div>
  );
};

export default PortfolioOverview;