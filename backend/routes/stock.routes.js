const express = require("express");
const router = express.Router();
const axios = require("axios");
const verifyToken = require("../middleware/authMiddleware");

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

router.get("/:symbol", verifyToken, async (req, res) => {
  const { symbol } = req.params;
  const formattedSymbol = symbol.toUpperCase();

  const url = `https://finnhub.io/api/v1/quote?symbol=${formattedSymbol}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data || !data.c) {
      return res.status(404).json({ message: `No price data found for ${formattedSymbol}` });
    }

    const result = {
      symbol: formattedSymbol,
      lastPrice: data.c,      // current price
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
    };

    res.json(result);
  } catch (error) {
    console.error("❌ Finnhub API error:", error.message);
    res.status(500).json({ message: `Failed to fetch data for ${formattedSymbol}` });
  }
});

module.exports = router;
