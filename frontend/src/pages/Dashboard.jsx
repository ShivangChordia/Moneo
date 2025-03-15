import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [news, setNews] = useState([]);
  const [connected, setConnected] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      setConnected(true);
      console.log("✅ Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        setStocks(data);
      } else if (data.type === "news") {
        setNews(data.data || []);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = () => {
      setConnected(false);
      console.log("❌ WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 text-white p-6 min-h-screen">
        <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>
        <p className="mt-4">You are logged in!</p>

        <div className="mt-6 flex gap-6 w-full max-w-4xl">
          {/* 🔥 Live Stock Updates */}
          <div className="p-4 bg-gray-800 rounded-lg flex-1">
            <h3 className="text-2xl font-bold">📈 Live Stock Updates</h3>
            {!connected && <p className="text-red-400">⏳ Connecting...</p>}
            <table className="mt-4 border-collapse w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-2">Symbol</th>
                  <th className="p-2">Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {stocks.length > 0 ? (
                  stocks.map((stock, index) => (
                    <tr key={index} className="border-t border-gray-600">
                      <td className="p-2">{stock.symbol}</td>
                      <td className="p-2">${parseFloat(stock.price).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-2 text-gray-400" colSpan="2">No stock data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 📰 Market News Section */}
          <div className="p-4 bg-gray-800 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold border-b pb-2 mb-2">📰 Latest Market News</h2>
            <ul className="space-y-2">
              {news.length > 0 ? (
                news.map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {article.title}
                    </a>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No market news available.</p>
              )}
            </ul>
          </div>
        </div>

        <button onClick={handleLogout} className="mt-6 bg-red-500 px-6 py-3 rounded-lg">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
