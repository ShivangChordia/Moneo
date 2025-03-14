import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

// API Keys (Stored in .env)
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const ALPHA_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

// Example portfolio assets
const symbols = ["AAPL", "TSLA", "BTC-USD"];

const PortfolioOverview = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [assetAllocation, setAssetAllocation] = useState({});
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        let totalValue = 0;
        let allocation = {};

        // Fetch real-time prices from Finnhub
        for (const symbol of symbols) {
          const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
          const data = await response.json();
          if (data.c) {
            totalValue += data.c;
            allocation[symbol] = data.c;
          }
        }

        setPortfolioValue(totalValue);
        setAssetAllocation(allocation);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${ALPHA_API_KEY}`
        );
        const data = await response.json();

        if (data["Time Series (Daily)"]) {
          const historical = Object.entries(data["Time Series (Daily)"]).map(([date, price]) => ({
            date,
            value: parseFloat(price["4. close"]),
          }));
          setHistoricalData(historical.reverse()); // Reverse to get oldest first
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    // Fetch all data
    fetchPortfolioData();
    fetchHistoricalData();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold">Portfolio Overview</h2>
      <p className="text-lg">Total Portfolio Value: ${portfolioValue.toFixed(2)}</p>

      {/* Pie Chart for Asset Allocation */}
      <div className="mt-4 w-1/2 mx-auto">
        <Pie
          data={{
            labels: Object.keys(assetAllocation),
            datasets: [
              {
                data: Object.values(assetAllocation),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
              },
            ],
          }}
        />
      </div>

      {/* Line Chart for Portfolio Growth */}
      <div className="mt-6">
        <Line
          data={{
            labels: historicalData.map((entry) => entry.date),
            datasets: [
              {
                label: "Portfolio Value Over Time",
                data: historicalData.map((entry) => entry.value),
                borderColor: "#4BC0C0",
                fill: false,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default PortfolioOverview;
