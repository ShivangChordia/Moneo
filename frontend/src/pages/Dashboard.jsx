/*
* FILE : Dashboard.jsx
* PROJECT : Moneo
* PROGRAMMER : Group 6
* FIRST VERSION : 14/03/2025
* DESCRIPTION :
* This Dashboard component displays real-time stock prices, simulates buying/selling, 
* shows investment tips, and manages user portfolio actions for logged-in users.
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://moneo.vercel.app";

const investmentTips = [
  "Invest for the long term, not short-term gains.",
  "Diversify your portfolio to reduce risk.",
  "Don’t let emotions drive your investment decisions.",
  "Reinvest your dividends for compounded returns.",
  "Review your portfolio regularly and adjust as needed.",
  "Avoid trying to time the market — consistency is key.",
  "Use dollar-cost averaging when buying volatile stocks.",
  "Understand what you invest in — research the company!",
  "Keep some emergency cash before investing aggressively.",
  "Don’t follow hype — follow fundamentals.",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [tipOfTheDay, setTipOfTheDay] = useState("");
  const [availableStocks, setAvailableStocks] = useState([
    "AAPL", "TSLA", "AMZN", "MSFT", "INTC", "EURUSD"
  ]);
  const [searchSymbol, setSearchSymbol] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchPurchases();
    const randomTip = investmentTips[Math.floor(Math.random() * investmentTips.length)];
    setTipOfTheDay(randomTip);
  }, [navigate]);

  useEffect(() => {
    fetchLivePrices();
  }, [purchases, availableStocks]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLivePrices();
      setMessage("🔄 Prices auto-refreshed");
    }, 60000);
    return () => clearInterval(interval);
  }, [availableStocks]);

  const fetchPurchases = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/purchase`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Unauthorized or error in fetchPurchases");
      const data = await res.json();
      setPurchases(data);
    } catch (err) {
      console.error("fetchPurchases error:", err);
    }
  };

  const fetchLivePrices = async () => {
    const token = localStorage.getItem("token");
    const newPrices = {};
    for (let stock of availableStocks) {
      try {
        const res = await fetch(`${API_URL}/api/stock/${stock}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) continue;
        const data = await res.json();
        newPrices[stock] = data.lastPrice || 0;
      } catch (err) {
        console.error(`Failed to fetch ${stock}:`, err);
      }
    }
    setLivePrices(newPrices);
  };

  const handleBuy = async (symbol) => {
    const token = localStorage.getItem("token");
    const quantity = quantities[symbol] || 0;
    if (!symbol || quantity <= 0) return;

    try {
      const res = await fetch(`${API_URL}/api/stock/${symbol}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return setMessage("Failed to fetch price");
      const { lastPrice } = await res.json();

      const buyRes = await fetch(`${API_URL}/api/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          symbol,
          quantity: Number(quantity),
          priceAtPurchase: lastPrice,
        }),
      });

      if (buyRes.ok) {
        setMessage(`Bought ${quantity} shares of ${symbol}`);
        fetchPurchases();
      } else {
        setMessage("Purchase failed");
      }
    } catch (err) {
      console.error("Buy error:", err);
      setMessage("Something went wrong during purchase.");
    }
  };

  const handleSell = async (symbolToSell) => {
    const token = localStorage.getItem("token");
    const quantity = quantities[symbolToSell] || 0;
    const userStock = purchases.find((p) => p.symbol === symbolToSell);
    if (!userStock || userStock.quantity < quantity) {
      return setMessage("Not enough stock to sell");
    }

    try {
      const sellRes = await fetch(`${API_URL}/api/purchase/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ symbol: symbolToSell, quantity: Number(quantity) }),
      });

      if (sellRes.ok) {
        setMessage(`Sold ${quantity} shares of ${symbolToSell}`);
        fetchPurchases();
      } else {
        setMessage("Sell failed");
      }
    } catch (err) {
      console.error("Sell error:", err);
    }
  };

  const updateQuantity = (symbol, value) => {
    setQuantities((prev) => ({ ...prev, [symbol]: value }));
  };

  const handleSearch = async () => {
    const symbol = searchSymbol.trim().toUpperCase();
    if (!symbol) return setMessage("Please enter a symbol.");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/stock/${symbol}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setMessage(`Stock symbol ${symbol} not found.`);
        return;
      }

      const data = await res.json();
      setLivePrices((prev) => ({ ...prev, [symbol]: data.lastPrice || 0 }));

      setAvailableStocks((prev) => {
        if (!prev.includes(symbol)) return [...prev, symbol];
        return prev;
      });

      setMessage(`✅ Added ${symbol} to dashboard`);
      setSearchSymbol("");
    } catch (err) {
      console.error("Search error:", err);
      setMessage("Something went wrong during search.");
    }
  };

  const handleRemoveStock = (symbol) => {
    setAvailableStocks((prev) => prev.filter((s) => s !== symbol));
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[symbol];
      return updated;
    });
    setLivePrices((prev) => {
      const updated = { ...prev };
      delete updated[symbol];
      return updated;
    });
    setMessage(`${symbol} removed from dashboard.`);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-2">Welcome to Your Dashboard</h1>
      <p className="text-center mb-6">You are logged in!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-2xl font-bold">📊 Stock Overview</h3>
          <p className="text-gray-300 mt-4">
            Real-time stock updates are refreshed every 60 seconds or manually using the button below.
          </p>
          <button
            onClick={fetchLivePrices}
            className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
          >
            🔁 Refresh Prices Now
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">💡 Investing Tip of the Day</h3>
          <p className="text-gray-300">{tipOfTheDay}</p>
          <button
            onClick={() => {
              const newTip = investmentTips[Math.floor(Math.random() * investmentTips.length)];
              setTipOfTheDay(newTip);
            }}
            className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Show Another Tip
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">🔎 Search Stock</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
            placeholder="Enter Stock Symbol (e.g., NFLX)"
            className="bg-black text-white px-3 py-2 rounded w-1/2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4">📥 Simulate Buy/Sell Stock</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {availableStocks.map((sym) => (
            <div
              key={sym}
              className="relative bg-gray-700 p-3 rounded flex flex-col items-center text-center"
            >
              <button
                onClick={() => handleRemoveStock(sym)}
                className="absolute top-1 right-2 text-red-400 hover:text-red-600 text-lg"
                title="Remove Stock"
              >
                ❌
              </button>
              <span className="text-orange-400 font-bold text-lg">{sym}</span>
              <span className="text-sm text-white mb-2">
                ${livePrices[sym]?.toFixed(2) || "--"}
              </span>
              <input
                type="number"
                value={quantities[sym] || ""}
                onChange={(e) => updateQuantity(sym, e.target.value)}
                className="text-white bg-black p-1 rounded w-20 mb-2"
                placeholder="Qty"
                min={1}
              />
              <button
                onClick={() => handleBuy(sym)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm mb-1 hover:bg-green-700"
              >
                Buy
              </button>
              <button
                onClick={() => handleSell(sym)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Sell
              </button>
            </div>
          ))}
        </div>
      </div>

      {message && <p className="text-yellow-400 mb-4 text-center">{message}</p>}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="mt-6 bg-red-500 px-6 py-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
