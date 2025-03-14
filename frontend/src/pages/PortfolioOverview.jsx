import React, { useState } from "react";

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

const PortfolioOverview = () => {
  const [symbols, setSymbols] = useState(["AAPL", "TSLA"]); // Default stocks
  const [newStock, setNewStock] = useState("");
  const [error, setError] = useState("");

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
      setError("");
    } catch (err) {
      console.error("Error validating stock symbol:", err);
      setError("Something went wrong. Try again later.");
    }

    setNewStock("");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4">Portfolio Overview</h2>

      {/* ✅ Stock Search Input */}
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

      {/* ✅ Stock List Display */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Your Stocks:</h3>
        <ul>
          {symbols.map((stock) => (
            <li key={stock} className="mt-1">{stock}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PortfolioOverview;
