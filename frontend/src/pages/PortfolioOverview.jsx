import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const ALPHA_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

const PortfolioOverview = () => {
  const [symbols, setSymbols] = useState(() => {
    return JSON.parse(localStorage.getItem("userStocks")) || ["AAPL", "TSLA"];
  });
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [assetAllocation, setAssetAllocation] = useState({});
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newStock, setNewStock] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        let totalValue = 0;
        let allocation = {};

        const responses = await Promise.all(
          symbols.map((symbol) =>
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
          )
        );

        const results = await Promise.all(responses.map((res) => res.json()));

        results.forEach((data, index) => {
          if (data.c) {
            totalValue += data.c;
            allocation[symbols[index]] = data.c;
          }
        });

        setPortfolioValue(totalValue);
        setAssetAllocation(allocation);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setLoading(false);
      }
    };

    fetchPortfolioData();
    const interval = setInterval(fetchPortfolioData, 30000);
    return () => clearInterval(interval);
  }, [symbols]);

  // ✅ Fetch historical data for Line Graph
  useEffect(() => {
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

    fetchHistoricalData();
  }, []);

  // ✅ Function to Validate and Add a New Stock
  const addStock = async () => {
    const stockSymbol = newStock.toUpperCase().trim();

    if (!stockSymbol) {
      setError("Stock symbol cannot be empty.");
      return;
    }
    if (symbols.includes(stockSymbol)) {
      setError("Stock already exists in the list.");
      return;
    }

    // Validate stock symbol by checking API response
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`
      );
      const data = await response.json();

      if (!data || !data.c) {
        setError("Invalid stock symbol. Please try again.");
        return;
      }

      const updatedStocks = [...symbols, stockSymbol];
      setSymbols(updatedStocks);
      localStorage.setItem("userStocks", JSON.stringify(updatedStocks));
      setError("");
    } catch (err) {
      console.error("Error validating stock symbol:", err);
      setError("Something went wrong. Try again later.");
    }

    setNewStock("");
  };

  // ✅ Function to Remove a Stock
  const removeStock = (stock) => {
    const updatedStocks = symbols.filter((symbol) => symbol !== stock);
    setSymbols(updatedStocks);
    localStorage.setItem("userStocks", JSON.stringify(updatedStocks));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4">Portfolio Overview</h2>

      {/* ✅ Enhanced Search Bar & Add Button */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g., MSFT)"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          className="w-64 px-4 py-2 rounded-lg border-2 border-gray-500 focus:border-blue-500 focus:outline-none text-black transition duration-200"
        />
        <button
          onClick={addStock}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Stock
        </button>
      </div>

      {/* ✅ Show Error Message if Invalid */}
      {error && <p className="text-red-400 mt-2">{error}</p>}

      {/* ✅ Stock List with Remove Option */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Your Stocks:</h3>
        <ul>
          {symbols.map((stock) => (
            <li key={stock} className="flex justify-between items-center mt-2">
              <span>{stock}</span>
              <button
                onClick={() => removeStock(stock)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Show Loading State */}
      {loading ? (
        <p className="text-lg text-gray-400 mt-4">Fetching latest stock data...</p>
      ) : (
        <p className="text-lg mt-4">
          Total Portfolio Value: ${portfolioValue.toFixed(2)}{" "}
          <span className={`ml-2 text-lg ${percentageChange >= 0 ? "text-green-400" : "text-red-400"}`}>
            {percentageChange >= 0 ? `▲ +${percentageChange}%` : `▼ ${percentageChange}%`}
          </span>
        </p>
      )}

      {/* ✅ Pie Chart */}
      <div className="mt-4 flex justify-center">
        <div style={{ width: "400px", height: "400px" }}>
          <Pie
            data={{
              labels: Object.keys(assetAllocation),
              datasets: [
                {
                  data: Object.values(assetAllocation),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  hoverBackgroundColor: ["#FF4365", "#2582CC", "#FFB400"],
                },
              ],
            }}
            options={{
              plugins: {
                legend: { position: "top", labels: { color: "#FFFFFF" } },
                tooltip: { enabled: true },
              },
            }}
          />
        </div>
      </div>

      {/* ✅ Line Chart for Portfolio Growth */}
      <div className="mt-6">
        <Line
          data={{
            labels: historicalData.map((entry) => entry.date),
            datasets: [
              {
                label: "Portfolio Value Over Time",
                data: historicalData.map((entry) => entry.value),
                borderColor: "#4BC0C0",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default PortfolioOverview;
