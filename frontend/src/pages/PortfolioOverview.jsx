import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#aa6eeb", "#fc6c85"];
const API_URL = "https://moneo.vercel.app"; // ✅ Backend URL

const PortfolioOverview = () => {
  const [purchases, setPurchases] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    if (purchases.length > 0) {
      fetchLivePrices();
      const interval = setInterval(fetchLivePrices, 60000);
      return () => clearInterval(interval);
    }
  }, [purchases]);

  const fetchPurchases = async () => {
    try {
      const res = await fetch(`${API_URL}/api/purchase`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPurchases(data);
      }
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
  };

  const fetchLivePrices = async () => {
    setError("");
    try {
      const priceEntries = await Promise.all(
        purchases.map(async (p) => {
          const res = await fetch(`${API_URL}/api/stock/${p.symbol}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error(`${p.symbol} price fetch failed`);
          const data = await res.json();
          return [p.symbol, data.lastPrice || 0];
        })
      );
      const updatedPrices = Object.fromEntries(priceEntries);
      setLivePrices(updatedPrices);
    } catch (err) {
      console.error("Error fetching live prices:", err);
      setError("❌ Failed to fetch some live prices. Please try again later.");
    }
  };

  const pieData = purchases.map((p) => ({
    name: p.symbol,
    value: (livePrices[p.symbol] || 0) * p.quantity,
  }));

  const barData = purchases.map((p) => {
    const livePrice = livePrices[p.symbol] || 0;
    const profit = (livePrice - p.priceAtPurchase) * p.quantity;
    return {
      symbol: p.symbol,
      profit: parseFloat(profit.toFixed(2)),
    };
  });

  const totalPortfolioValue = purchases.reduce((sum, p) => {
    const price = livePrices[p.symbol] || 0;
    return sum + price * p.quantity;
  }, 0);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">📊 Portfolio Overview</h2>

      {error && (
        <div className="mb-4 bg-red-600 text-white px-4 py-2 rounded text-center">
          {error}
        </div>
      )}

      {purchases.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          You don’t have any stocks yet. Start investing from your dashboard!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-4">💰 Investment Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-4">📈 Profit/Loss per Stock</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symbol" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="profit" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">📋 Current Holdings</h3>
              <button
                onClick={fetchLivePrices}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                🔄 Refresh Live Prices
              </button>
            </div>
            <table className="w-full text-white text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-600">
                  <th>Symbol</th>
                  <th>Qty</th>
                  <th>Buy Price</th>
                  <th>Live Price</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p._id} className="border-b border-gray-700">
                    <td>{p.symbol}</td>
                    <td>{p.quantity}</td>
                    <td>${p.priceAtPurchase.toFixed(2)}</td>
                    <td>
                      {livePrices[p.symbol] !== undefined ? (
                        `$${livePrices[p.symbol].toFixed(2)}`
                      ) : (
                        <span className="text-gray-400 italic">Unavailable</span>
                      )}
                    </td>
                    <td>
                      $
                      {livePrices[p.symbol] !== undefined
                        ? (livePrices[p.symbol] * p.quantity).toFixed(2)
                        : "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4 font-semibold text-lg text-green-400">
              Total Portfolio Value: ${totalPortfolioValue.toFixed(2)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PortfolioOverview;
