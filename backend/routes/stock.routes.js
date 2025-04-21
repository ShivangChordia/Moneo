const express = require("express");
const router = express.Router();
const axios = require("axios");
const verifyToken = require("../middleware/authMiddleware");

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

router.get("/:symbol", verifyToken, async (req, res) => {
  const { symbol } = req.params;
  const formattedSymbol = symbol.toUpperCase();

  console.log("📥 Received symbol:", symbol);
  console.log("🔁 Fetching from Finnhub:", `https://finnhub.io/api/v1/quote?symbol=${formattedSymbol}&token=${FINNHUB_API_KEY}`);

  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${formattedSymbol}&token=${FINNHUB_API_KEY}`);
    const data = response.data;

    console.log("✅ Finnhub data:", data);

    if (!data || typeof data.c !== "number") {
      console.warn("⚠️ Invalid data format for:", formattedSymbol);
      return res.status(404).json({ message: `No price data found for ${formattedSymbol}` });
    }

    res.json({
      symbol: formattedSymbol,
      lastPrice: data.c,
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
    });
  } catch (error) {
    console.error("❌ Finnhub API error:", error.message);
    res.status(500).json({ message: `Failed to fetch data for ${formattedSymbol}` });
  }
});


module.exports = router;
